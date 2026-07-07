import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface MerchItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface MerchCartItem extends MerchItem {
  qty: number;
}

interface MerchCartContextType {
  items: MerchCartItem[];
  addItem: (item: MerchItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const MerchCartContext = createContext<MerchCartContextType | null>(null);

export function MerchCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MerchCartItem[]>(() => {
    try {
      const saved = localStorage.getItem("garage-merch-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("garage-merch-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: MerchItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <MerchCartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalCount, totalPrice, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false) }}>
      {children}
    </MerchCartContext.Provider>
  );
}

export function useMerchCart() {
  const ctx = useContext(MerchCartContext);
  if (!ctx) throw new Error("useMerchCart must be used within MerchCartProvider");
  return ctx;
}
