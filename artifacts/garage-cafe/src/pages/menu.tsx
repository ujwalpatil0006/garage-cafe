import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "@/lib/assets";
import { useCart } from "@/context/CartContext";

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

interface MenuItem { name: string; desc?: string; veg?: boolean; }
interface Category { name: string; items: MenuItem[]; }

const vegSections: Category[] = [
  {
    name: "Sandwiches", items: [
      { name: "Bambaiya Sandwich", desc: "Mumbai-style street sandwich with a gourmet twist", veg: true },
      { name: "Veg Club Sandwich", desc: "Layered club sandwich with fresh veggies & cheese", veg: true },
      { name: "Aloo Tikki Sandwich", desc: "Crispy aloo tikki with tangy chutneys", veg: true },
      { name: "Cheese Burst Sandwich", desc: "Loaded with molten cheese in every bite", veg: true },
      { name: "Classic Grilled Sandwich", desc: "Perfectly grilled with herbs and seasoning", veg: true },
      { name: "Bread Butter Toast", desc: "Golden toasted bread with creamy butter", veg: true },
      { name: "Toasted Bread & Jam", desc: "Classic toast with premium fruit jam", veg: true },
    ]
  },
  {
    name: "Pasta", items: [
      { name: "Alfredo Pasta", desc: "Creamy white sauce pasta with parmesan", veg: true },
      { name: "Arrabbiata Pasta", desc: "Spicy tomato sauce with fresh herbs", veg: true },
      { name: "Pesto Pasta", desc: "Fresh basil pesto tossed with al dente pasta", veg: true },
      { name: "Rosa Pasta", desc: "Perfect blend of red and white sauce", veg: true },
      { name: "Mac & Cheese", desc: "Comfort classic with stretchy molten cheese", veg: true },
    ]
  },
  {
    name: "Fries", items: [
      { name: "Regular Salted Fries", desc: "Crispy golden fries with sea salt", veg: true },
      { name: "Peri Peri Fries", desc: "Tossed with fiery peri peri spice blend", veg: true },
      { name: "Flaming Hot Fries", desc: "Extra spicy, for the brave ones", veg: true },
      { name: "Cheese Deep Fries", desc: "Loaded with gooey melted cheese", veg: true },
      { name: "Peri Peri Cheese Fries", desc: "Peri peri spice meets molten cheese", veg: true },
      { name: "Pulled Cheese Fries", desc: "Slow-pulled cheese drizzled over crispy fries", veg: true },
      { name: "Chipotle Fries", desc: "Smoky chipotle seasoning on crispy fries", veg: true },
    ]
  },
  {
    name: "Maggie", items: [
      { name: "Plain Masala Maggie", desc: "Classic Maggie with our secret masala blend", veg: true },
      { name: "Cheese Masala Maggie", desc: "Maggie topped with a generous cheese layer", veg: true },
      { name: "Vegetable Masala Maggie", desc: "Loaded with fresh seasonal vegetables", veg: true },
      { name: "3x Spicy Maggie", desc: "For those who dare — triple the heat", veg: true },
    ]
  },
  {
    name: "Garlic Bread", items: [
      { name: "Cheese Garlic Bread", desc: "Crispy garlic bread smothered in cheese", veg: true },
      { name: "Corn Cheese Garlic Bread", desc: "Sweet corn meets melted cheese on garlic bread", veg: true },
      { name: "Cheese Chilly Garlic Bread", desc: "Spicy chilli flakes with cheese on garlic bread", veg: true },
      { name: "Paneer Cheese Garlic Bread", desc: "Soft paneer and cheese on crispy garlic bread", veg: true },
    ]
  },
  {
    name: "Garage Gamble", items: [
      { name: "Veggie Paneer Wrap", desc: "Soft wrap stuffed with spiced paneer and veggies", veg: true },
      { name: "Veggie Paneer Taco", desc: "Crispy taco shell with herbed paneer filling", veg: true },
    ]
  },
  {
    name: "Sweet Tooth", items: [
      { name: "Hot Chocolate", desc: "Rich, velvety hot chocolate with whipped cream", veg: true },
      { name: "Sugar Rusk", desc: "Twice-baked rusks dusted with sugar", veg: true },
      { name: "Chocolate Sandwich", desc: "Indulgent chocolate layered between soft bread", veg: true },
      { name: "Death By Strawberry", desc: "Chocolate-dipped strawberries — our showstopper dessert", veg: true },
    ]
  },
  {
    name: "Ice Cream", items: [
      { name: "Choco Chip Ice Cream", desc: "Classic choco chip in a premium scoop", veg: true },
      { name: "Honey Glaze Ice Cream", desc: "Creamy ice cream drizzled with wildflower honey", veg: true },
      { name: "Minty Lemon Ice Cream", desc: "Refreshing mint and zesty lemon sorbet", veg: true },
      { name: "Citric Blast Ice Cream", desc: "Bold citrus flavours in every scoop", veg: true },
      { name: "Ice Cream Sundae", desc: "Layered sundae with sauces and toppings", veg: true },
      { name: "Ice Cream Sandwich", desc: "Creamy ice cream between two crispy cookies", veg: true },
    ]
  },
];

const nonVegSections: Category[] = [
  {
    name: "Sandwiches", items: [
      { name: "Chicken Bambaiya Sandwich", desc: "Mumbai-style chicken sandwich with premium fillings", veg: false },
      { name: "Chicken Club Sandwich", desc: "Grilled chicken, fresh veggies, and house sauce", veg: false },
      { name: "Four Egg Sandwich", desc: "Loaded with four perfectly cooked eggs", veg: false },
    ]
  },
  {
    name: "Fries", items: [
      { name: "Chicken Flaming Hot Fries", desc: "Crispy fries tossed with flaming hot chicken bits", veg: false },
      { name: "Chicken Pulled Cheese Fries", desc: "Pulled chicken and cheese over golden fries", veg: false },
      { name: "Chicken Chipotle Fries", desc: "Smoky chipotle chicken over crispy fries", veg: false },
    ]
  },
  {
    name: "Maggie & Eggs", items: [
      { name: "Egg Masala Maggie", desc: "Classic Maggie with perfectly cooked egg", veg: false },
      { name: "Plain Egg Omelette", desc: "Fluffy two-egg omelette, simply done right", veg: false },
      { name: "Corn Cheese Omelette", desc: "Sweet corn and cheese-filled egg omelette", veg: false },
      { name: "Veggie Masala Omelette", desc: "Loaded with garden-fresh vegetables", veg: false },
      { name: "Mushroom Cheese Omelette", desc: "Earthy mushrooms with melted cheese", veg: false },
      { name: "Egg Bhurji", desc: "Spiced scrambled eggs Indian street style", veg: false },
    ]
  },
  {
    name: "Garlic Bread", items: [
      { name: "Chicken Cheese Garlic Bread", desc: "Shredded chicken and cheese on crispy garlic bread", veg: false },
    ]
  },
  {
    name: "Garage Gamble", items: [
      { name: "Chicken Wrap", desc: "Grilled chicken with fresh veggies in a soft wrap", veg: false },
      { name: "Chicken Taco", desc: "Crispy taco shell with spiced chicken filling", veg: false },
      { name: "Egg Wrap", desc: "Egg and veggie wrap with zesty sauce", veg: false },
      { name: "Egg Taco", desc: "Crispy taco with spiced egg filling", veg: false },
    ]
  },
];

const beverageSections: { name: string; items: string[] }[] = [
  {
    name: "Hot Coffee",
    items: ["Cappuccino", "Espresso", "Americano", "Regular Coffee", "Chocolate Coffee", "Cinnamon Coffee", "Vanilla Coffee", "Black Coffee", "Affogato Coffee"]
  },
  {
    name: "Hot Tea",
    items: ["Tapri Chai", "Ginger Masala Tea", "Green Tea", "Lemon Tea", "Black Tea", "Lemon Mint Tea", "Honey Ginger Tea", "Cinnamon Tea"]
  },
  {
    name: "Cold Coffee",
    items: [
      "Regular Cold Coffee", "Chocolate Cold Coffee", "Butterscotch Cold Coffee", "Caramel Cold Coffee",
      "Regular Cold Coffee with Ice Cream", "Chocolate Cold Coffee with Ice Cream", "Butterscotch Cold Coffee with Ice Cream", "Caramel Cold Coffee with Ice Cream"
    ]
  },
  {
    name: "Iced Coffee",
    items: ["Iced Americano", "Iced Vanilla Coffee", "Iced Honey & Cinnamon Coffee", "Iced Butterscotch Coffee", "Iced Chocolate Coffee", "Iced Cranberry Espresso", "Iced Mocha"]
  },
  {
    name: "Milkshakes",
    items: ["Coconut Milk Shake", "Vanilla Milk Shake", "Strawberry Milk Shake", "Chocolate Milk Shake", "Pineapple Milk Shake", "Cookies & Cream Milk Shake"]
  },
  {
    name: "Mocktails Premium",
    items: ["Sex On The Beach", "Screwdriver", "Mint & Mist", "Blue Skull Berry", "Lemon Litchi Cooler", "Watermelon Cooler", "Lady In Blue Pool", "Bombay Cola"]
  },
  {
    name: "Mocktails Classic",
    items: ["Red Rubby Cooler", "Peach Paradise", "Mojito", "Tropical Mojito", "Apple Blast", "Guava Cooler", "Chilly Guava Cooler", "Kiwi Cooler", "Berry Blast"]
  },
];

/* Photos shown as a quality/hygiene showcase — not tied to any specific item */
const qualityPhotos = [
  { img: IMAGES.motoMojitos, label: "Freshly Prepared" },
  { img: IMAGES.hotCoffee, label: "Handcrafted Coffee" },
  { img: IMAGES.iceCreamSundae, label: "Premium Desserts" },
  { img: IMAGES.chocoCrepe, label: "Choco Crepe" },
  { img: IMAGES.chocolateSandwich, label: "Artisan Bakes" },
  { img: IMAGES.layeredMocktail, label: "Signature Mocktails" },
  { img: IMAGES.skullGlass2, label: "Unique Serves" },
  { img: IMAGES.deathByStrawberry, label: "Showstoppers" },
  { img: IMAGES.spicyNoodles, label: "Bold Flavours" },
];

function VegIcon({ veg }: { veg?: boolean }) {
  return (
    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${veg ? "border-green-500" : "border-red-500"}`}>
      <div className={`w-2 h-2 rounded-full ${veg ? "bg-green-500" : "bg-red-500"}`} />
    </div>
  );
}

function AddButton({ onAdd, onInc, onDec, qty }: { onAdd: () => void; onInc: () => void; onDec: () => void; qty: number }) {
  if (qty === 0) {
    return (
      <button
        onClick={onAdd}
        className="flex-shrink-0 flex items-center gap-1 bg-[#B8860B]/15 hover:bg-[#B8860B]/30 border border-[#B8860B]/40 hover:border-[#B8860B] text-[#B8860B] font-['Montserrat'] font-semibold text-[10px] tracking-wider uppercase px-2.5 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        Add
      </button>
    );
  }
  return (
    <div className="flex-shrink-0 flex items-center gap-1.5 bg-[#B8860B]/15 border border-[#B8860B]/40 rounded-lg px-1.5 py-1">
      <button onClick={onDec} className="w-5 h-5 rounded flex items-center justify-center text-[#B8860B] hover:bg-[#B8860B]/20 transition-colors font-bold text-sm">−</button>
      <span className="text-white font-['Montserrat'] font-semibold text-xs w-4 text-center">{qty}</span>
      <button onClick={onInc} className="w-5 h-5 rounded flex items-center justify-center bg-[#B8860B] hover:bg-[#8B6A0B] text-white transition-colors font-bold text-sm">+</button>
    </div>
  );
}

function MenuCard({ item, category }: { item: MenuItem; category: string }) {
  const { addItem, updateQty, items } = useCart();
  const cartItem = items.find((i) => i.name === item.name);
  const qty = cartItem?.qty ?? 0;
  return (
    <div className="group flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/8 hover:border-[#B8860B]/40 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B8860B]/8">
      <VegIcon veg={item.veg} />
      <div className="min-w-0 flex-1">
        <h4 className="font-['Playfair_Display'] text-white font-bold text-sm leading-snug">{item.name}</h4>
        {item.desc && <p className="text-white/45 text-xs leading-relaxed mt-1">{item.desc}</p>}
      </div>
      <AddButton
        qty={qty}
        onAdd={() => addItem({ name: item.name, desc: item.desc, veg: item.veg, category })}
        onInc={() => updateQty(item.name, 1)}
        onDec={() => updateQty(item.name, -1)}
      />
    </div>
  );
}

function SimpleItemCard({ name, category }: { name: string; category: string }) {
  const { addItem, updateQty, items } = useCart();
  const cartItem = items.find((i) => i.name === name);
  const qty = cartItem?.qty ?? 0;
  return (
    <div className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/8 hover:border-[#B8860B]/40 rounded-xl transition-all duration-300 hover:-translate-y-0.5 group">
      <div className="w-1.5 h-1.5 rounded-full bg-[#B8860B] flex-shrink-0 group-hover:scale-125 transition-transform" />
      <p className="text-white/80 text-sm font-['Poppins'] font-medium leading-snug flex-1">{name}</p>
      <AddButton
        qty={qty}
        onAdd={() => addItem({ name, category })}
        onInc={() => updateQty(name, 1)}
        onDec={() => updateQty(name, -1)}
      />
    </div>
  );
}

export default function MenuPage() {
  const [mainTab, setMainTab] = useState<"food" | "beverages">("food");
  const [foodTab, setFoodTab] = useState<"veg" | "nonveg">("veg");
  const [bevTab, setBevTab] = useState("Hot Coffee");

  const currentBev = beverageSections.find(b => b.name === bevTab)!;

  return (
    <div className="min-h-screen bg-[#111111] font-['Poppins'] pt-20">
      {/* Header */}
      <div className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.pizzaMenu} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-[#111111]/70 to-[#111111]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <FadeUp>
            <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Our Offerings</span>
            <h1 className="font-['Bebas_Neue'] text-6xl sm:text-8xl text-white mt-3 tracking-wider">
              THE GARAGE <span className="text-[#B8860B]">MENU</span>
            </h1>
            <div className="w-20 h-0.5 bg-[#B8860B] mx-auto mt-4" />
            <p className="text-white/50 mt-4 font-['Playfair_Display'] italic text-lg">Handcrafted with passion. Served with love.</p>
            <div className="mt-7">
              <a
                href="https://zomato.onelink.me/xqzv/votaxb7g"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#B8860B] hover:bg-[#c42f3b] text-white font-['Montserrat'] font-semibold tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#B8860B]/30 text-sm"
              >
                <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-7.938 7.938H7.5v-2.125l7.938-7.938h2.124v2.125zm-1.062-1.063h-1.063l-7.937 7.938v1.062h1.063l7.937-7.937V7.185z"/>
                </svg>
                Order on Zomato
              </a>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Quality & Hygiene Photo Strip */}
      <div className="px-4 pb-10">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="mb-4 flex items-center gap-3">
              <div className="w-1 h-5 bg-[#B8860B] rounded-full" />
              <span className="text-white/40 text-xs font-['Montserrat'] font-semibold tracking-[0.3em] uppercase">From Our Kitchen</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {qualityPhotos.map((p, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden aspect-square">
                  <img
                    src={p.img}
                    alt={p.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white text-[10px] font-['Montserrat'] font-semibold tracking-wider block text-center leading-tight">
                      {p.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/25 text-xs text-center mt-3 font-['Poppins'] italic">
              All food prepared fresh daily in our hygienic kitchen
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Main Tabs: FOOD | BEVERAGES */}
      <div className="sticky top-16 lg:top-20 z-30 bg-[#111111]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between py-3">
          <div className="flex gap-1">
            {(["food", "beverages"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMainTab(tab)}
                className={`font-['Montserrat'] font-semibold text-sm tracking-widest uppercase px-6 py-2.5 rounded-full transition-all duration-300 ${
                  mainTab === tab
                    ? "bg-[#B8860B] text-white shadow-lg shadow-[#B8860B]/30"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <a
            href="https://zomato.onelink.me/xqzv/votaxb7g"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#B8860B] hover:bg-[#c42f3b] text-white font-['Montserrat'] font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#B8860B]/30 text-xs"
          >
            <svg className="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 6.5l-6.5 6.5H8v-2l6.5-6.5H16.5v2z"/>
            </svg>
            Order on Zomato
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 pb-20">
        {/* FOOD */}
        {mainTab === "food" && (
          <div>
            {/* VEG / NON VEG */}
            <div className="flex gap-3 mb-10">
              {(["veg", "nonveg"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFoodTab(t)}
                  className={`flex items-center gap-2 font-['Montserrat'] font-semibold text-sm tracking-wider uppercase px-5 py-2.5 rounded-full border-2 transition-all duration-300 ${
                    foodTab === t
                      ? t === "veg" ? "border-green-500 bg-green-500/15 text-green-400" : "border-red-500 bg-red-500/15 text-red-400"
                      : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${t === "veg" ? "bg-green-500" : "bg-red-500"}`} />
                  {t === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                </button>
              ))}
            </div>

            {(foodTab === "veg" ? vegSections : nonVegSections).map((section) => (
              <FadeUp key={section.name} className="mb-10">
                <div className="flex items-center gap-4 mb-5">
                  <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-widest">{section.name}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#B8860B]/40 to-transparent" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {section.items.map((item) => (
                    <MenuCard key={item.name} item={item} category={section.name} />
                  ))}
                </div>
              </FadeUp>
            ))}
          </div>
        )}

        {/* BEVERAGES */}
        {mainTab === "beverages" && (
          <div>
            {/* Sub tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {beverageSections.map((b) => (
                <button
                  key={b.name}
                  onClick={() => setBevTab(b.name)}
                  className={`font-['Montserrat'] font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                    bevTab === b.name
                      ? "border-[#B8860B] bg-[#B8860B]/15 text-[#B8860B]"
                      : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>

            <FadeUp>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-['Bebas_Neue'] text-4xl text-white tracking-widest">{currentBev.name}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-[#B8860B]/40 to-transparent" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {currentBev.items.map((item) => (
                  <SimpleItemCard key={item} name={item} category={currentBev.name} />
                ))}
              </div>
            </FadeUp>
          </div>
        )}
      </div>

      {/* Zomato Order CTA */}
      <div className="bg-[#0d0d0d] border-t border-white/5 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/30 text-xs font-['Montserrat'] font-semibold tracking-[0.4em] uppercase mb-3">Online Ordering</p>
          <h3 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wider mb-2">
            HUNGRY? ORDER <span className="text-[#B8860B]">NOW</span>
          </h3>
          <p className="text-white/40 text-sm font-['Playfair_Display'] italic mb-7">
            Get The Garage Cafe delivered straight to your door via Zomato
          </p>
          <a
            href="https://zomato.onelink.me/xqzv/votaxb7g"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#B8860B] hover:bg-[#c42f3b] text-white font-['Montserrat'] font-semibold tracking-widest uppercase px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#B8860B]/40 text-sm"
          >
            <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 6.5l-6.5 6.5H8v-2l6.5-6.5H16.5v2z"/>
            </svg>
            Order on Zomato
          </a>
          <p className="text-white/20 text-xs font-['Poppins'] mt-5 italic">
            All items prepared fresh to order. Please inform us of any allergies.
          </p>
        </div>
      </div>
    </div>
  );
}
