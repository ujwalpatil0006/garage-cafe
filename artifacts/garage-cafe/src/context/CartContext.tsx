import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  name: string;
  desc?: string;
  veg?: boolean;
  category: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (name: string) => void;
  updateQty: (name: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("garage-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("garage-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  };

  const updateQty = (name: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => i.name === name ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalCount, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false) }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
