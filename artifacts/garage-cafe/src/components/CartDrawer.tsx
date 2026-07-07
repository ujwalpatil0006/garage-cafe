import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const ZOMATO_URL = "https://zomato.onelink.me/xqzv/votaxb7g";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, clearCart, totalCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#161616] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B8860B]/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#B8860B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-wider leading-none">YOUR ORDER</h2>
                  <p className="text-white/40 text-xs font-['Poppins'] mt-0.5">{totalCount} item{totalCount !== 1 ? "s" : ""} selected</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-white/30 font-['Playfair_Display'] italic text-lg">Your cart is empty</p>
                  <p className="text-white/20 text-sm font-['Poppins'] mt-1">Add items from the menu to get started</p>
                  <button
                    onClick={closeCart}
                    className="mt-5 text-[#B8860B] text-sm font-['Montserrat'] font-semibold tracking-wider underline underline-offset-4"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white/5 border border-white/8 rounded-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          {item.veg !== undefined && (
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${item.veg ? "border-green-500" : "border-red-500"}`}>
                              <div className={`w-2 h-2 rounded-full ${item.veg ? "bg-green-500" : "bg-red-500"}`} />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-['Playfair_Display'] font-bold text-sm leading-snug">{item.name}</p>
                            <p className="text-white/35 text-xs font-['Poppins'] mt-0.5">{item.category}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.name)}
                            className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        {/* Qty controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-2 bg-black/30 rounded-full px-1 py-1">
                            <button
                              onClick={() => updateQty(item.name, -1)}
                              className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#B8860B]/30 text-white flex items-center justify-center transition-colors text-sm font-bold"
                            >
                              −
                            </button>
                            <span className="text-white font-['Montserrat'] font-semibold text-sm w-5 text-center">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.name, 1)}
                              className="w-6 h-6 rounded-full bg-[#B8860B] hover:bg-[#8B6A0B] text-white flex items-center justify-center transition-colors text-sm font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <button
                    onClick={clearCart}
                    className="text-white/25 hover:text-red-400 text-xs font-['Poppins'] transition-colors mt-2 flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear all
                  </button>
                </>
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5 space-y-3">
                <div className="flex items-center justify-between text-white/40 text-xs font-['Poppins']">
                  <span>{totalCount} item{totalCount !== 1 ? "s" : ""} in your order</span>
                </div>

                <a
                  href={ZOMATO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#B8860B] hover:bg-[#c42f3b] text-white font-['Montserrat'] font-semibold tracking-widest uppercase py-4 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#B8860B]/30 text-sm"
                >
                  <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 6.5l-6.5 6.5H8v-2l6.5-6.5H16.5v2z"/>
                  </svg>
                  Order on Zomato
                </a>

                <p className="text-white/20 text-[10px] font-['Poppins'] text-center leading-relaxed">
                  You'll be taken to Zomato to place and pay for your order
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
