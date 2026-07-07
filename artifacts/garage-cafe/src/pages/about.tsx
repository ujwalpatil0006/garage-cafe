import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "@/lib/assets";

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const timeline = [
  {
    year: "01",
    title: "Chef's Passion",
    desc: "It all started with a simple belief — that great food should feel like a warm hug. Our founder's passion for bold flavours and fresh ingredients laid the foundation for everything The Garage Cafe stands for.",
    img: IMAGES.chef,
    imgPosition: "object-top",
    imgHeight: "h-96",
  },
  {
    year: "02",
    title: "The Garage Concept",
    desc: "Inspired by the freedom of motorcycles and the camaraderie of the open road, we created a space unlike any other. Industrial steel, warm wood, and actual motorcycles on the walls — this is the garage where every rider belongs.",
    img: IMAGES.interiorBike,
    imgHeight: "h-64",
  },
  {
    year: "03",
    title: "Quality Ingredients",
    desc: "We believe in honesty on the plate. Every ingredient is handpicked, every recipe tested until it's perfect. From our cold-brewed coffees to our freshly baked bread — quality is never negotiable.",
    img: IMAGES.hotCoffee,
    imgHeight: "h-64",
  },
  {
    year: "04",
    title: "Fresh Preparation",
    desc: "Nothing here is made in advance. Every dish is prepared fresh to order, because we know the difference between something that was made and something that was crafted.",
    img: IMAGES.chocoCake,
    imgHeight: "h-64",
  },
  {
    year: "05",
    title: "Warm Hospitality",
    desc: "At The Garage Cafe, every guest is family. Our team brings warmth, smiles, and passion to every interaction. We don't just serve food — we create memories that keep you coming back.",
    img: IMAGES.exteriorNight,
    imgHeight: "h-64",
  },
];

const showcasePhotos = [
  { img: IMAGES.interiorBike, label: "Premium Ambience" },
  { img: IMAGES.exteriorNight, label: "Iconic Exterior" },
  { img: IMAGES.exteriorDay, label: "Our Garage" },
  { img: IMAGES.motoMojitos, label: "Signature Drinks" },
  { img: IMAGES.deathByStrawberry, label: "Showstopper Desserts" },
  { img: IMAGES.iceCreamSundae, label: "Artisan Desserts" },
  { img: IMAGES.chocoCrepe, label: "Choco Crepe" },
  { img: IMAGES.chocolateSandwich, label: "Handcrafted Food" },
  { img: IMAGES.layeredMocktail, label: "Premium Mocktails" },
  { img: IMAGES.skullGlass2, label: "Unique Presentations" },
  { img: IMAGES.birthday1, label: "Special Occasions" },
  { img: IMAGES.birthday2, label: "Celebrations" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#111111] font-['Poppins'] pt-20">
      {/* Hero — using exterior day photo so the entrance is clearly visible */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.exteriorDay}
            alt=""
            className="w-full h-full object-cover object-center opacity-30"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/50 via-[#111111]/40 to-[#111111]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <FadeUp>
            <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Our Story</span>
            <h1 className="font-['Bebas_Neue'] text-6xl sm:text-8xl text-white mt-3 tracking-wider leading-none">
              MORE THAN A <span className="text-[#B8860B]">CAFE</span>
            </h1>
            <div className="w-20 h-0.5 bg-[#B8860B] mx-auto mt-4" />
            <p className="text-white/70 mt-5 font-['Playfair_Display'] italic text-xl max-w-2xl mx-auto leading-relaxed">
              Born from passion, built for community — where every guest is family and every meal is a memory.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* By The Chef */}
      <div className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">A Note From Our Kitchen</span>
            <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white mt-3 tracking-wider">
              BY THE <span className="text-[#B8860B]">CHEF</span>
            </h2>
            <div className="w-20 h-0.5 bg-[#B8860B] mx-auto mt-4" />
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Chef photo — large, prominent */}
            <FadeUp>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden">
                  <img
                    src={IMAGES.chef}
                    alt="Chef Suyog Muley"
                    className="w-full h-[520px] object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent" />
                </div>
                {/* Name badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-[#111111]/80 backdrop-blur-sm border border-[#B8860B]/30 rounded-2xl p-4">
                    <p className="font-['Bebas_Neue'] text-2xl text-white tracking-widest">Chef Suyog Muley</p>
                    <p className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-wider mt-1">Md, S&S Foods · The Garage Cafe</p>
                  </div>
                </div>
                {/* Decorative corner */}
                <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-[#B8860B]/40 rounded-tl-2xl" />
                <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-[#B8860B]/40 rounded-br-2xl" />
              </div>
            </FadeUp>

            {/* Chef's message */}
            <FadeUp delay={0.15}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 font-['Bebas_Neue'] text-[120px] text-[#B8860B]/8 leading-none select-none">"</div>
                <div className="relative z-10">
                  <p className="font-['Playfair_Display'] italic text-white/75 text-lg leading-relaxed mb-6">
                    The Garage Cafe menu offers a diverse range of delicious, handcrafted meals and beverages that cater to all tastes. Start with a selection of gourmet sandwiches, Pizzas and hearty burgers, or indulge in comforting breakfast classics.
                  </p>
                  <p className="font-['Playfair_Display'] italic text-white/75 text-lg leading-relaxed mb-6">
                    Satisfy your sweet tooth with decadent desserts, made daily. For beverages, enjoy expertly brewed coffee, refreshing Coolers, and specialty teas. The atmosphere is cozy and inviting, making it the perfect spot for both a quick bite or a leisurely meal.
                  </p>
                  <p className="font-['Playfair_Display'] italic text-white/75 text-lg leading-relaxed mb-8">
                    Whether you're craving a savory snack or a sweet treat, The Garage Cafe has something for every palate.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-[#B8860B]" />
                    <div>
                      <p className="text-[#B8860B] font-['Montserrat'] font-semibold tracking-wider text-sm">Chef Suyog Muley</p>
                      <p className="text-white/40 font-['Poppins'] text-xs mt-0.5">Md, S&S Foods, The Garage Cafe</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="relative bg-gradient-to-br from-[#B8860B]/10 to-[#8B6A0B]/5 border border-[#B8860B]/20 rounded-3xl p-10 text-center overflow-hidden">
              <div className="absolute top-4 left-6 font-['Bebas_Neue'] text-[200px] text-white/3 leading-none select-none">"</div>
              <p className="font-['Playfair_Display'] italic text-white/80 text-xl sm:text-2xl leading-relaxed relative z-10 max-w-2xl mx-auto">
                We didn't open a café. We built a community around two passions that define the spirit of freedom — great coffee and the open road.
              </p>
              <div className="w-12 h-0.5 bg-[#B8860B] mx-auto mt-6" />
              <p className="text-[#B8860B] font-['Montserrat'] font-semibold tracking-wider mt-3 text-sm">— The Founders, The Garage Cafe</p>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">How We Got Here</span>
            <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white mt-3 tracking-wider">
              OUR <span className="text-[#B8860B]">JOURNEY</span>
            </h2>
            <div className="w-20 h-0.5 bg-[#B8860B] mx-auto mt-4" />
          </FadeUp>

          <div className="relative">
            {/* Central Line - desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#B8860B]/50 via-[#B8860B]/30 to-transparent -translate-x-1/2" />

            <div className="space-y-16">
              {timeline.map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.08}>
                  <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                    {/* Text side */}
                    <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-['Bebas_Neue'] text-6xl text-[#B8860B]/20 leading-none">{item.year}</span>
                        <div className="flex-1 h-px bg-[#B8860B]/20" />
                        <div className="hidden lg:block w-3 h-3 rounded-full bg-[#B8860B] border-4 border-[#111111] ring-1 ring-[#B8860B]" />
                      </div>
                      <h3 className="font-['Playfair_Display'] text-2xl text-white font-bold mb-3">{item.title}</h3>
                      <p className="text-white/60 leading-relaxed text-sm">{item.desc}</p>
                    </div>

                    {/* Image side */}
                    <div className={`relative ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div className="rounded-2xl overflow-hidden group">
                        <img
                          src={item.img}
                          alt={item.title}
                          className={`w-full ${item.imgHeight ?? "h-64"} object-cover ${item.imgPosition ?? ""} group-hover:scale-105 transition-transform duration-500`}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-20 h-20 border border-[#B8860B]/20 rounded-2xl -z-10" />
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">What We Stand For</span>
            <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white mt-3 tracking-wider">
              OUR <span className="text-[#B8860B]">VALUES</span>
            </h2>
            <div className="w-20 h-0.5 bg-[#B8860B] mx-auto mt-4" />
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "⚡", title: "Passion First", desc: "Everything we do comes from a deep love for food and community." },
              { icon: "🌿", title: "Always Fresh", desc: "From sourcing to serving, freshness is never compromised." },
              { icon: "🤝", title: "Community", desc: "We believe a great café is the heartbeat of its neighbourhood." },
              { icon: "🏆", title: "Quality Always", desc: "Premium ingredients, expert preparation, zero shortcuts." },
              { icon: "🏍️", title: "The Rider Spirit", desc: "Born from biker culture — bold, free, and always moving forward." },
              { icon: "💛", title: "Warm Welcome", desc: "Every guest deserves to feel like they're coming home." },
            ].map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.07}>
                <div className="p-6 bg-white/5 border border-white/5 hover:border-[#B8860B]/30 rounded-2xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h4 className="font-['Playfair_Display'] text-white font-bold text-lg mb-2">{v.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* Showcase Gallery */}
      <div className="py-20 px-4 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Inside The Garage</span>
            <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white mt-3 tracking-wider">
              EXPERIENCE THE <span className="text-[#B8860B]">AMBIENCE</span>
            </h2>
            <div className="w-20 h-0.5 bg-[#B8860B] mx-auto mt-4" />
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {showcasePhotos.map((photo, i) => (
              <FadeUp key={photo.label} delay={i * 0.05}>
                <div className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer">
                  <img
                    src={photo.img}
                    alt={photo.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-['Montserrat'] font-semibold text-xs tracking-wider uppercase">
                      {photo.label}
                    </span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-20 px-4 bg-[#0d0d0d] text-center">
        <FadeUp>
          <h2 className="font-['Bebas_Neue'] text-5xl text-white tracking-wider">
            COME <span className="text-[#B8860B]">MEET US</span>
          </h2>
          <p className="text-white/50 mt-3 font-['Playfair_Display'] italic">We can't wait to welcome you to our garage family.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="/visit">
              <button className="bg-[#B8860B] hover:bg-[#8B6A0B] text-white font-['Montserrat'] font-semibold tracking-widest uppercase px-8 py-4 rounded-full transition-all hover:shadow-lg hover:shadow-[#B8860B]/30 hover:scale-105 text-sm">
                Visit Us
              </button>
            </a>
            <a href="/menu">
              <button className="border-2 border-white/20 hover:border-[#B8860B] text-white hover:text-[#B8860B] font-['Montserrat'] font-semibold tracking-widest uppercase px-8 py-4 rounded-full transition-all hover:scale-105 text-sm">
                Explore Menu
              </button>
            </a>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
