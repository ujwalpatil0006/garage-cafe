import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "@/lib/assets";
import { useMerchCart, MerchItem } from "@/context/MerchCartContext";

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const products: MerchItem[] = [
  { id: "tee", name: "Garage Classic Tee", price: 599, image: IMAGES.merchTshirt, category: "Apparel" },
  { id: "cap", name: "Vintage Biker Cap", price: 449, image: IMAGES.merchCap, category: "Apparel" },
  { id: "hoodie", name: "Garage Zip Hoodie", price: 1299, image: IMAGES.merchHoodie, category: "Apparel" },
  { id: "mug", name: "Garage Ceramic Mug", price: 349, image: IMAGES.merchMug, category: "Drinkware" },
  { id: "tote", name: "Garage Canvas Tote", price: 399, image: IMAGES.merchTote, category: "Accessories" },
  { id: "pins", name: "Enamel Pin Set", price: 249, image: IMAGES.merchPins, category: "Accessories" },
];

function ProductCard({ product }: { product: MerchItem }) {
  const { addItem, updateQty, items } = useMerchCart();
  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.qty ?? 0;

  return (
    <div className="group bg-white/5 border border-white/8 hover:border-[#8B6A0B]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8B6A0B]/10">
      <div className="aspect-square overflow-hidden bg-black/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <span className="text-[#8B6A0B] text-[10px] font-['Montserrat'] font-semibold tracking-[0.2em] uppercase">{product.category}</span>
        <h4 className="font-['Playfair_Display'] text-white font-bold text-base leading-snug mt-1">{product.name}</h4>
        <div className="flex items-center justify-between mt-3">
          <span className="font-['Bebas_Neue'] text-2xl text-[#B8860B] tracking-wide">₹{product.price}</span>
          {qty === 0 ? (
            <button
              onClick={() => addItem(product)}
              className="flex items-center gap-1.5 bg-[#8B6A0B]/15 hover:bg-[#8B6A0B]/30 border border-[#8B6A0B]/40 hover:border-[#8B6A0B] text-[#8B6A0B] font-['Montserrat'] font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-[#8B6A0B]/15 border border-[#8B6A0B]/40 rounded-full px-2 py-1.5">
              <button onClick={() => updateQty(product.id, -1)} className="w-5 h-5 rounded-full flex items-center justify-center text-[#8B6A0B] hover:bg-[#8B6A0B]/20 transition-colors font-bold text-sm">−</button>
              <span className="text-white font-['Montserrat'] font-semibold text-xs w-4 text-center">{qty}</span>
              <button onClick={() => updateQty(product.id, 1)} className="w-5 h-5 rounded-full flex items-center justify-center bg-[#8B6A0B] hover:bg-[#a05e29] text-white transition-colors font-bold text-sm">+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const { openCart, totalCount } = useMerchCart();

  return (
    <div className="min-h-screen bg-[#111111] font-['Poppins'] pt-20">
      {/* Header */}
      <div className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.merchHoodie} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-[#111111]/70 to-[#111111]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <FadeUp>
            <span className="text-[#8B6A0B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Garage Merch</span>
            <h1 className="font-['Bebas_Neue'] text-6xl sm:text-8xl text-white mt-3 tracking-wider">
              THE GARAGE <span className="text-[#8B6A0B]">SHOP</span>
            </h1>
            <div className="w-20 h-0.5 bg-[#8B6A0B] mx-auto mt-4" />
            <p className="text-white/50 mt-4 font-['Playfair_Display'] italic text-lg">
              Wear the ride. Take the garage with you.
            </p>
            {totalCount > 0 && (
              <button
                onClick={openCart}
                className="mt-6 inline-flex items-center gap-2 border-2 border-[#8B6A0B] text-[#8B6A0B] hover:bg-[#8B6A0B] hover:text-white font-['Montserrat'] font-semibold tracking-wider uppercase px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 text-sm"
              >
                View Bag ({totalCount})
              </button>
            )}
          </FadeUp>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Note */}
      <div className="bg-[#0d0d0d] border-t border-white/5 py-10 px-4 text-center">
        <p className="text-white/40 text-sm font-['Poppins'] italic max-w-lg mx-auto">
          Add items to your bag and check out via WhatsApp — we'll confirm payment, size, and pickup or delivery with you directly.
        </p>
      </div>
    </div>
  );
}
