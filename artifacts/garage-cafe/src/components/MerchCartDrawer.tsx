import { useMerchCart } from "@/context/MerchCartContext";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "919967850378";

export default function MerchCartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, clearCart, totalCount, totalPrice } = useMerchCart();

  const buildWhatsAppMessage = () => {
    const lines = items.map((i) => `• ${i.name} x${i.qty} — ₹${i.price * i.qty}`);
    const message = `Hi! I'd like to order the following merchandise from The Garage Cafe:\n\n${lines.join("\n")}\n\nTotal: ₹${totalPrice}\n\nPlease let me know how to complete payment and pickup/delivery.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="merch-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />

          <motion.div
            key="merch-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#161616] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8B6A0B]/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#8B6A0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-wider leading-none">YOUR BAG</h2>
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

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-white/30 font-['Playfair_Display'] italic text-lg">Your bag is empty</p>
                  <p className="text-white/20 text-sm font-['Poppins'] mt-1">Add merchandise to get started</p>
                  <button
                    onClick={closeCart}
                    className="mt-5 text-[#8B6A0B] text-sm font-['Montserrat'] font-semibold tracking-wider underline underline-offset-4"
                  >
                    Browse Shop
                  </button>
                </div>
              ) : (
                <>
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white/5 border border-white/8 rounded-xl p-3 flex gap-3"
                      >
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-white font-['Playfair_Display'] font-bold text-sm leading-snug">{item.name}</p>
                              <p className="text-[#8B6A0B] text-xs font-['Montserrat'] font-semibold mt-0.5">₹{item.price}</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <div className="flex items-center gap-2 bg-black/30 rounded-full px-1 py-1 mt-2 w-fit">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#8B6A0B]/30 text-white flex items-center justify-center transition-colors text-sm font-bold"
                            >
                              −
                            </button>
                            <span className="text-white font-['Montserrat'] font-semibold text-sm w-5 text-center">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="w-6 h-6 rounded-full bg-[#8B6A0B] hover:bg-[#a05e29] text-white flex items-center justify-center transition-colors text-sm font-bold"
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

            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5 space-y-3">
                <div className="flex items-center justify-between text-white font-['Montserrat'] font-semibold text-sm">
                  <span className="text-white/50">Total</span>
                  <span className="text-lg">₹{totalPrice}</span>
                </div>

                <a
                  href={buildWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-['Montserrat'] font-semibold tracking-widest uppercase py-4 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/30 text-sm"
                >
                  <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Order via WhatsApp
                </a>

                <p className="text-white/20 text-[10px] font-['Poppins'] text-center leading-relaxed">
                  Your order summary will be sent to us on WhatsApp to confirm payment and pickup/delivery
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
