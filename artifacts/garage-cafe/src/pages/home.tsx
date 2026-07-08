import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "@/lib/assets";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: "easeOut" } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const features = [
  { icon: "☕", title: "Freshly Brewed Coffee", desc: "Every cup crafted with precision, from bean to brew." },
  { icon: "🍽️", title: "Handcrafted Meals", desc: "Chef-driven recipes prepared fresh for every order." },
  { icon: "🏍️", title: "Garage Inspired Ambience", desc: "A one-of-a-kind space where bikes meet café culture." },
  { icon: "🤝", title: "Perfect Hangout Spot", desc: "Warm, welcoming, and built for great conversations." },
];

const featured = [
  { name: "Signature Mojitos", desc: "Vibrant & refreshing — crafted against our iconic motorcycle mural", img: IMAGES.motoMojitos, tag: "Best Seller" },
  { name: "Ice Cream Sundae", desc: "Premium sundae with chocolate drizzle and exotic garnish", img: IMAGES.iceCreamSundae, tag: "Showstopper" },
  { name: "Skull Glass Cooler", desc: "Our iconic skull glass — bold flavours, bolder presentation", img: IMAGES.skullGlass2, tag: "Signature" },
  { name: "Layered Mocktail", desc: "Stunning layers of colour in every refreshing sip", img: IMAGES.layeredMocktail, tag: "Must Try" },
  { name: "Choco Crepe", desc: "Rich chocolate crepe with fresh strawberry — pure indulgence", img: IMAGES.chocoCrepe, tag: "Fan Favourite" },
  { name: "Death By Strawberry", desc: "Chocolate-dipped strawberries — our legendary dessert", img: IMAGES.deathByStrawberry, tag: "Instagram-worthy" },
];

const gallery = [
  IMAGES.exteriorNight,
  IMAGES.motoMojitos,
  IMAGES.interiorBike,
  IMAGES.iceCreamSundae,
  IMAGES.mocktails,
  IMAGES.hotCoffee,
  IMAGES.sandwichesMojitos,
  IMAGES.deathByStrawberry,
  IMAGES.chocoCrepe,
  IMAGES.skullGlass2,
  IMAGES.chocoCake,
  IMAGES.cinnamonSkull,
  IMAGES.berryMocktail,
  IMAGES.layeredMocktail,
  IMAGES.chocolateSandwich,
  IMAGES.chocoStrawberries,
];

const reviews = [
  { text: "The ambience is absolutely incredible! Feels like a premium biker lounge with amazing food. Every detail is thought out perfectly.", name: "Rahul M.", stars: 5 },
  { text: "Their cold coffee and sandwiches are unmatched. The staff is super friendly too! We spent 3 hours here and didn't want to leave.", name: "Priya S.", stars: 5 },
  { text: "Came for the coffee, stayed for the vibe. The Death By Strawberry is a must-try! The presentation is absolutely gorgeous.", name: "Arjun K.", stars: 5 },
  { text: "Best café experience in the area. The motorcycle décor is so unique and cool. This place has a soul that you rarely find.", name: "Sneha R.", stars: 5 },
];

export default function Home() {
  const [currentReview, setCurrentReview] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => setCurrentReview((p) => (p + 1) % reviews.length), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="font-['Poppins']">
      {/* ======= HERO ======= */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px) scale(1.08)` }}
          transition={{ type: "tween", duration: 0.1 }}
        >
          <img
            src={IMAGES.exteriorNight}
            alt="The Garage Cafe"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Steam Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="steam-particle absolute bottom-0 rounded-full bg-white/5 blur-xl"
              style={{
                left: `${10 + i * 12}%`,
                width: `${40 + i * 20}px`,
                height: `${60 + i * 30}px`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block border border-white/50 text-white text-xs tracking-[0.4em] uppercase font-['Montserrat'] font-semibold px-5 py-2 rounded-full mb-6 bg-white/10 backdrop-blur-sm"
          >
            REV • READ • RIDE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-['Bebas_Neue'] text-6xl sm:text-8xl lg:text-[9rem] leading-none tracking-wider text-white mb-4"
          >
            FUEL YOUR RIDE.
            <br />
            <span className="text-[#B8860B]">FEED YOUR SOUL.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-['Playfair_Display'] italic text-white/80 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto mb-10"
          >
            From sunrise brews to late-night rides, we serve comfort, flavour, and a warm garage vibe every day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/menu">
              <button className="bg-[#B8860B] hover:bg-[#8B6A0B] text-white font-['Montserrat'] font-semibold tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-[#B8860B]/40 hover:scale-105 text-sm">
                Explore Menu
              </button>
            </Link>
            <Link href="/visit">
              <button className="border-2 border-white/60 hover:border-[#B8860B] text-white hover:text-[#B8860B] font-['Montserrat'] font-semibold tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-sm backdrop-blur-sm">
                Visit Us
              </button>
            </Link>
            <a
              href="reservation.html"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#B8860B]/50 bg-[#B8860B]/10 px-8 py-4 text-sm font-['Montserrat'] font-semibold uppercase tracking-[0.24em] text-[#F2D39A] transition-all duration-300 hover:bg-[#B8860B] hover:text-white hover:scale-105 backdrop-blur-sm"
            >
              Reserve Table
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-[0.3em] font-['Montserrat']">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#B8860B] to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ======= STATS BAR ======= */}
      <section className="bg-[#B8860B] py-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {[
            { num: 50, suffix: "+", label: "Menu Items" },
            { num: 4.8, suffix: "/5", label: "Google Rating" },
            { num: 1000, suffix: "+", label: "Happy Guests" },
            { num: 2, suffix: " Years", label: "Of Excellence" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-['Bebas_Neue'] text-4xl text-white tracking-wider">
                <Counter target={stat.num} suffix={stat.suffix} />
              </div>
              <div className="text-white/80 text-xs font-['Montserrat'] font-semibold tracking-widest uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======= WHY CHOOSE US ======= */}
      <section className="py-24 px-4 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <FadeUp className="text-center mb-16">
              <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Why Us</span>
              <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white mt-3 tracking-wider">
                THE GARAGE <span className="text-[#B8860B]">DIFFERENCE</span>
              </h2>
              <div className="w-20 h-0.5 bg-[#B8860B] mx-auto mt-4" />
            </FadeUp>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <FadeUp key={f.title} delay={i * 0.1}>
                  <div className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#B8860B]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#B8860B]/10 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-4xl mb-4">{f.icon}</div>
                    <h3 className="font-['Playfair_Display'] text-white font-bold text-lg mb-3">{f.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ======= FEATURED MENU ======= */}
      <section className="py-24 px-4 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <Section>
            <FadeUp className="text-center mb-16">
              <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Our Specials</span>
              <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white mt-3 tracking-wider">
                CRAFTED WITH <span className="text-[#B8860B]">PASSION</span>
              </h2>
              <div className="w-20 h-0.5 bg-[#B8860B] mx-auto mt-4" />
              <p className="text-white/50 mt-4 font-['Poppins'] text-sm max-w-md mx-auto">
                Every dish tells a story. Every sip starts a conversation.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((item, i) => (
                <FadeUp key={item.name} delay={i * 0.08}>
                  <div className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-[#B8860B]/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#B8860B]/20 cursor-pointer">
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={item.img}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <span className="absolute top-3 right-3 bg-[#B8860B] text-white text-[10px] font-['Montserrat'] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-lg">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp className="text-center mt-12">
              <Link href="/menu">
                <button className="border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white font-['Montserrat'] font-semibold tracking-widest uppercase px-10 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B8860B]/30 hover:scale-105 text-sm">
                  View Full Menu
                </button>
              </Link>
            </FadeUp>
          </Section>
        </div>
      </section>

      {/* ======= HIGHLIGHTS ======= */}
      <section className="py-20 px-4 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          {[
            { title: "Sunrise Brews", text: "Fresh coffee, mellow mornings, and the perfect start to your ride." },
            { title: "Weekend Brunch", text: "Comfort food plates, indulgent desserts, and laid-back energy." },
            { title: "Ride-In Nights", text: "A welcoming space for bikes, music, and memorable evenings." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wider">{item.title}</h3>
              <p className="mt-3 text-sm text-white/60 font-['Poppins'] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======= OUR STORY ======= */}
      <section className="py-24 px-4 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <Section className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#B8860B]/10 rounded-3xl blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={IMAGES.interiorBike}
                    alt="The Garage Cafe Interior"
                    className="w-full h-[500px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4">
                      <div className="font-['Bebas_Neue'] text-2xl text-[#B8860B] tracking-wider">Where Riders Belong</div>
                      <div className="text-white/70 text-xs font-['Poppins'] mt-1">Motorcycles. Coffee. Community.</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#B8860B]/30 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#B8860B]/10 rounded-full" />
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Our Story</span>
              <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white mt-3 tracking-wider leading-none">
                MORE THAN JUST
                <br />
                <span className="text-[#B8860B]">A CAFE</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#B8860B] mt-5 mb-6" />

              <div className="space-y-5 text-white/70 font-['Poppins'] text-sm leading-relaxed">
                <p>
                  The Garage Cafe was born from a passion for two things: exceptional food and the freedom of the open road.
                  We created a space where the raw energy of motorcycle culture meets the warmth of a great café.
                </p>
                <p>
                  Our chef-driven recipes celebrate bold flavors and fresh ingredients, prepared with care for every order.
                  From our signature cold coffees to handcrafted sandwiches — every item on our menu is a labour of love.
                </p>
                <p>
                  The industrial garage concept isn't just aesthetic — it's a philosophy. Honest, unpretentious, built to last.
                  With motorcycles on our walls and warmth in our hearts, we're the perfect spot for friends, families, and riders alike.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[["Chef-Driven", "Recipes"], ["Fresh", "Ingredients"], ["Warm", "Hospitality"], ["Unique", "Ambience"]].map(([a, b]) => (
                  <div key={a} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-[#B8860B] flex-shrink-0" />
                    <span className="text-white/80 text-sm font-['Poppins']">
                      <span className="text-white font-semibold">{a}</span> {b}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/about">
                <button className="mt-8 text-[#B8860B] hover:text-[#8B6A0B] font-['Montserrat'] font-semibold text-sm tracking-wider uppercase flex items-center gap-3 transition-colors group">
                  Read Our Full Story
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
            </FadeUp>
          </Section>
        </div>
      </section>

      {/* ======= INSTAGRAM GALLERY ======= */}
      <section className="py-24 px-4 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <FadeUp className="text-center mb-14">
              <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Gallery</span>
              <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white mt-3 tracking-wider">
                OUR GARAGE <span className="text-[#B8860B]">MOMENTS</span>
              </h2>
              <div className="w-20 h-0.5 bg-[#B8860B] mx-auto mt-4" />
            </FadeUp>

            <FadeUp>
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                {gallery.map((img, i) => (
                  <div key={i} className="group relative rounded-xl overflow-hidden break-inside-avoid cursor-pointer">
                    <img
                      src={img}
                      alt={`Gallery ${i}`}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp className="text-center mt-10">
              <a href="https://www.instagram.com/the_garagecafe?igsh=c3JvYnA0dnE3M2xv" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-3 border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white font-['Montserrat'] font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Follow Us on Instagram
                </button>
              </a>
            </FadeUp>
          </Section>
        </div>
      </section>

      {/* ======= REVIEWS ======= */}
      <section className="py-24 px-4 bg-[#111111] overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <Section>
            <FadeUp className="text-center mb-6">
              <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Guest Reviews</span>
              <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white mt-3 tracking-wider">
                WHAT THEY <span className="text-[#B8860B]">SAY</span>
              </h2>
              <div className="flex items-center justify-center gap-2 mt-4">
                {[1,2,3,4,5].map(s => <span key={s} className="text-[#B8860B] text-xl">★</span>)}
                <span className="text-white font-['Bebas_Neue'] text-2xl ml-2 tracking-wider">4.8 / 5</span>
                <span className="text-white/50 text-sm ml-1 font-['Poppins']">Google Rating</span>
              </div>
            </FadeUp>

            <FadeUp>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#B8860B]/20 via-[#8B6A0B]/10 to-[#B8860B]/20 rounded-3xl blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 text-center min-h-[220px] flex flex-col items-center justify-center">
                  <svg className="w-10 h-10 text-[#B8860B]/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <motion.p
                    key={currentReview}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="font-['Playfair_Display'] italic text-white/80 text-lg sm:text-xl leading-relaxed max-w-2xl"
                  >
                    "{reviews[currentReview].text}"
                  </motion.p>
                  <motion.div
                    key={`name-${currentReview}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6"
                  >
                    <div className="w-12 h-0.5 bg-[#B8860B] mx-auto mb-3" />
                    <div className="font-['Montserrat'] font-semibold text-[#B8860B] tracking-wider">
                      — {reviews[currentReview].name}
                    </div>
                    <div className="flex justify-center gap-1 mt-2">
                      {[...Array(reviews[currentReview].stars)].map((_, i) => (
                        <span key={i} className="text-[#B8860B]">★</span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentReview(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentReview ? "w-6 bg-[#B8860B]" : "bg-white/20"}`}
                  />
                ))}
              </div>
            </FadeUp>
          </Section>
        </div>
      </section>

      {/* ======= CTA ======= */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.exteriorAlt} alt="bg" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1a1a1a]/95 to-[#111111]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.12)_0%,transparent_70%)]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <Section>
            <FadeUp>
              <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Come Visit</span>
              <h2 className="font-['Bebas_Neue'] text-5xl sm:text-7xl text-white mt-3 tracking-wider leading-none">
                READY FOR YOUR NEXT
                <br />
                <span className="text-[#B8860B]">COFFEE BREAK?</span>
              </h2>
              <p className="text-white/60 mt-5 font-['Playfair_Display'] italic text-lg">
                Park your bike, grab a seat, and let us take care of the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Link href="/visit">
                  <button className="bg-[#B8860B] hover:bg-[#8B6A0B] text-white font-['Montserrat'] font-semibold tracking-widest uppercase px-8 py-4 rounded-full transition-all hover:shadow-2xl hover:shadow-[#B8860B]/40 hover:scale-105 text-sm">
                    Visit Cafe
                  </button>
                </Link>
                <Link href="/menu">
                  <button className="border-2 border-white/30 hover:border-[#B8860B] text-white hover:text-[#B8860B] font-['Montserrat'] font-semibold tracking-widest uppercase px-8 py-4 rounded-full transition-all hover:scale-105 text-sm">
                    Explore Menu
                  </button>
                </Link>
              </div>
            </FadeUp>
          </Section>
        </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="font-['Bebas_Neue'] text-3xl text-white tracking-[0.2em] mb-1">THE GARAGE CAFE</div>
              <div className="text-[#B8860B] text-xs font-['Montserrat'] font-semibold tracking-[0.4em] mb-4">FUEL YOUR RIDE. FEED YOUR SOUL.</div>
              <p className="text-white/50 text-sm font-['Poppins'] leading-relaxed max-w-xs">
                A premium motorcycle-inspired café where great food meets the spirit of the open road.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="https://www.instagram.com/the_garagecafe?igsh=c3JvYnA0dnE3M2xv" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#B8860B] hover:text-[#B8860B] text-white/60 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="tel:+919967850378"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#B8860B] hover:text-[#B8860B] text-white/60 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </a>
                <a href="https://maps.google.com/?q=Garage+Cafe" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#B8860B] hover:text-[#B8860B] text-white/60 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <div className="font-['Montserrat'] font-semibold text-white text-sm tracking-widest uppercase mb-5">Quick Links</div>
              <div className="space-y-3">
                {[["Home", "/"], ["Menu", "/menu"], ["About", "/about"], ["Visit Us", "/visit"]].map(([label, href]) => (
                  <Link key={href} href={href}>
                    <div className="text-white/50 hover:text-[#B8860B] text-sm font-['Poppins'] cursor-pointer transition-colors flex items-center gap-2 group">
                      <div className="w-0 group-hover:w-3 h-px bg-[#B8860B] transition-all duration-300" />
                      {label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="font-['Montserrat'] font-semibold text-white text-sm tracking-widest uppercase mb-5">Opening Hours</div>
              <div className="space-y-2 text-sm font-['Poppins']">
                <div className="flex justify-between text-white/60">
                  <span>All Days</span>
                  <span className="text-[#B8860B]">Open</span>
                </div>
                <div className="text-white font-semibold">10:00 AM – 11:00 PM</div>
                <div className="mt-4 pt-4 border-t border-white/5 text-white/50">
                  <div>Dine In • Delivery</div>
                  <div>Drive Through Available</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-center">
            <p className="text-white/30 text-xs font-['Poppins'] tracking-wider">
              © 2024 The Garage Cafe. Powered by S & S Foods. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes steamRise {
          0% { transform: translateY(0) scaleX(1); opacity: 0.15; }
          50% { transform: translateY(-40vh) scaleX(1.5); opacity: 0.08; }
          100% { transform: translateY(-80vh) scaleX(2); opacity: 0; }
        }
        .steam-particle { animation: steamRise linear infinite; }
      `}</style>
    </div>
  );
}
