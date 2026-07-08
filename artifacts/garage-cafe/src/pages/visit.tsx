import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "@/lib/assets";
import ImageCarousel from "@/components/ImageCarousel";

import bdayImg1 from "@assets/visitus_sec_birthday_img/image_1782829019113.png";
import bdayImg2 from "@assets/visitus_sec_birthday_img/image_1782829457426.png";
import bdayImg3 from "@assets/visitus_sec_birthday_img/image_1782829475477.png";
import bdayImg4 from "@assets/visitus_sec_birthday_img/WhatsApp Image 2026-07-05 at 16.27.11.jpeg";

const birthdayImages = [bdayImg1, bdayImg2, bdayImg3, bdayImg4];

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

const gallery = [
  IMAGES.exteriorNight,
  IMAGES.exteriorDay,
  IMAGES.motoMojitos,
  IMAGES.interiorBike,
  IMAGES.iceCreamSundae,
  IMAGES.mocktails,
  IMAGES.hotCoffee,
  IMAGES.sandwichesMojitos,
  IMAGES.deathByStrawberry,
  IMAGES.chocoCrepe,
  IMAGES.chocoCake,
  IMAGES.cinnamonSkull,
  IMAGES.skullGlass2,
  IMAGES.layeredMocktail,
  IMAGES.berryMocktail,
  IMAGES.chocolateSandwich,
  IMAGES.birthday1,
  IMAGES.birthday2,
];

const infoCards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: "The Garage Cafe",
    sub: "Powered by S & S Foods",
    note: "Update with your exact address",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 XXXXX XXXXX",
    sub: "Call or WhatsApp",
    note: "Update with real number",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Opening Hours",
    value: "10:00 AM – 11:00 PM",
    sub: "Open All Days",
    note: "",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    label: "Average Cost",
    value: "₹200 – ₹400",
    sub: "For two people",
    note: "",
  },
];

const services = [
  { icon: "🍽️", name: "Dine In", desc: "Relax and enjoy the full garage ambience" },
  { icon: "🚗", name: "Drive Through", desc: "Quick service without leaving your vehicle" },
  { icon: "🛵", name: "Delivery", desc: "Get The Garage Cafe delivered to your door" },
  { icon: "🅿️", name: "Parking", desc: "Ample parking available outside" },
];

const birthdayIncludes = [
  "1 Hour Celebration Venue",
  "250 Gm Cake (Chocolate, Black Forest, Fruit Cake)",
  "Sound & Music",
  "Lights & Decoration",
  "Balloons of Choice",
  "10% Discount on Ordered Food",
];

const birthdayExtras = [
  "Flowers",
  "Customized Cake",
  "Flower Decoration",
  "Canopy",
  "Photo Grid",
  "Photobooth",
  "Selfie Corner",
];

const cafeRules = [
  "Minimum Sitting Charges ₹100/- per hour",
  "Self Service & Order at the Desk",
  "Without Order ₹100/- per hour",
  "For Studies or Work ₹150/- per hour",
  "Be Careful with Books and Games",
  "Do not Change the Layout of the Cafe",
  "Maintain Decorum of the Cafe",
  "Do not Disturb Other Guests",
];

export default function Visit() {
  return (
    <div className="min-h-screen bg-[#111111] font-['Poppins'] pt-20">
      {/* Header */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.exteriorNight} alt="" className="w-full h-full object-cover opacity-20" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/70 to-[#111111]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <FadeUp>
            <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Find Us</span>
            <h1 className="font-['Bebas_Neue'] text-6xl sm:text-8xl text-white mt-3 tracking-wider">
              VISIT <span className="text-[#B8860B]">THE GARAGE</span>
            </h1>
            <div className="w-20 h-0.5 bg-[#B8860B] mx-auto mt-4" />
            <p className="text-white/50 mt-4 font-['Playfair_Display'] italic text-lg">
              Park your ride. Pull up a stool. We've been expecting you.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Map + Info */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          {/* Google Maps Embed */}
          <FadeUp>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d78.9629!3d20.5937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDM1JzM3LjMiTiA3OMKwNTcnNDYuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="420"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Garage Cafe Location"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.google.com/maps/place/The+Garage+Cafe/@20.021645,64.078583,6z/data=!4m10!1m2!2m1!1sgaraj+cafe+!3m6!1s0x3bddef237bc419e5:0xe02926c097811caa!8m2!3d20.021645!4d73.8344424!15sCgpnYXJhaiBjYWZlWgwiCmdhcmFqIGNhZmWSAQRjYWZl4AEA!16s%2Fg%2F11wqfvxfq0?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#B8860B] hover:bg-[#8B6A0B] text-white font-['Montserrat'] font-semibold tracking-wider uppercase text-sm py-3 rounded-full text-center transition-all hover:shadow-lg hover:shadow-[#B8860B]/30 hover:scale-105"
              >
                Get Directions
              </a>
              <a
                href="tel:+919967850378"
                className="flex-1 border-2 border-white/20 hover:border-[#B8860B] text-white hover:text-[#B8860B] font-['Montserrat'] font-semibold tracking-wider uppercase text-sm py-3 rounded-full text-center transition-all hover:scale-105"
              >
                Call Now
              </a>
            </div>
          </FadeUp>

          {/* Info Cards */}
          <div className="space-y-4">
            {infoCards.map((card, i) => (
              <FadeUp key={card.label} delay={i * 0.1}>
                <div className="group flex items-start gap-4 p-5 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#B8860B]/40 rounded-xl transition-all duration-300 hover:-translate-y-0.5">
                  <div className="w-11 h-11 rounded-xl bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B] flex-shrink-0 group-hover:bg-[#B8860B]/20 transition-colors">
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-['Montserrat'] font-semibold tracking-wider uppercase mb-1">{card.label}</div>
                    <div className="text-white font-['Playfair_Display'] font-bold text-lg leading-tight">{card.value}</div>
                    <div className="text-white/50 text-sm font-['Poppins'] mt-0.5">{card.sub}</div>
                    {card.note && (
                      <div className="text-[#B8860B]/60 text-xs mt-1 italic">{card.note}</div>
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="py-16 px-4 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">How We Serve</span>
            <h2 className="font-['Bebas_Neue'] text-5xl text-white mt-3 tracking-wider">
              OUR <span className="text-[#B8860B]">SERVICES</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#B8860B] mx-auto mt-4" />
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <FadeUp key={s.name} delay={i * 0.1}>
                <div className="group p-6 bg-white/5 border border-white/5 hover:border-[#B8860B]/30 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h4 className="font-['Playfair_Display'] text-white font-bold text-lg mb-2">{s.name}</h4>
                  <p className="text-white/50 text-sm">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* Birthday Celebration Package */}
      <div className="py-20 px-4 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Celebrate With Us</span>
            <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white mt-3 tracking-wider">
              BIRTHDAY <span className="text-[#B8860B]">PLANS</span>
            </h2>
            <div className="w-20 h-0.5 bg-[#B8860B] mx-auto mt-4" />
            <p className="text-white/50 mt-4 font-['Playfair_Display'] italic text-lg max-w-xl mx-auto">
              Make your special day unforgettable at The Garage Cafe
            </p>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Birthday carousel */}
              <FadeUp>
                <ImageCarousel
                  images={birthdayImages}
                  alts={[
                    "Birthday celebration at The Garage Cafe",
                    "Birthday decorations and setup",
                    "Cake and celebration",
                    "Birthday party joy",
                  ]}
                  aspectRatio="aspect-[3/4]"
                  autoPlayInterval={4000}
                />
              </FadeUp>

            {/* Package details */}
            <div className="space-y-6">
              {/* Price tag */}
              <FadeUp>
                <div className="inline-flex items-center gap-3 bg-[#B8860B] rounded-full px-6 py-3">
                  <span className="font-['Bebas_Neue'] text-white text-2xl tracking-wider">Birthday Celebration Package</span>
                </div>
                <div className="mt-3">
                  <span className="font-['Bebas_Neue'] text-5xl text-[#B8860B]">₹1500</span>
                  <span className="text-white/60 font-['Poppins'] text-lg ml-2">/ per hour</span>
                </div>
              </FadeUp>

              {/* What We Provide */}
              <FadeUp delay={0.1}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h4 className="font-['Bebas_Neue'] text-xl text-[#B8860B] tracking-widest uppercase mb-4">What We Provide</h4>
                  <ul className="space-y-3">
                    {birthdayIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white/80 text-sm font-['Poppins']">
                        <span className="w-2 h-2 rounded-full bg-[#B8860B] flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              {/* Payable Extras */}
              <FadeUp delay={0.2}>
                <div className="bg-[#B8860B]/5 border border-[#B8860B]/20 rounded-2xl p-6">
                  <h4 className="font-['Bebas_Neue'] text-xl text-[#8B6A0B] tracking-widest uppercase mb-4">Payable Extras</h4>
                  <div className="flex flex-wrap gap-2">
                    {birthdayExtras.map((item) => (
                      <span key={item} className="px-3 py-1.5 bg-[#B8860B]/10 border border-[#B8860B]/20 rounded-full text-white/70 text-xs font-['Montserrat'] font-semibold tracking-wide">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* CTA */}
              <FadeUp delay={0.3}>
                <a href="reservation.html?request=Birthday" rel="noopener noreferrer">
                  <button className="w-full bg-[#B8860B] hover:bg-[#8B6A0B] text-white font-['Montserrat'] font-semibold tracking-widest uppercase py-4 rounded-full transition-all hover:shadow-lg hover:shadow-[#B8860B]/30 hover:scale-105 text-sm">
                    Reserve Birthday Table
                  </button>
                </a>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>

      {/* Cafe Rules */}
      <div className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-12">
            <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">House Guidelines</span>
            <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white mt-3 tracking-wider">
              PLEASE <span className="text-[#B8860B]">READ ME</span>
            </h2>
            <div className="w-20 h-0.5 bg-[#B8860B] mx-auto mt-4" />
            <p className="text-white/50 mt-4 font-['Playfair_Display'] italic">
              To ensure everyone has a great experience at The Garage Cafe
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden">
              {/* Decorative background text */}
              <div className="absolute top-0 right-4 font-['Bebas_Neue'] text-[160px] text-white/[0.02] leading-none select-none pointer-events-none">RULES</div>

              <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                {cafeRules.map((rule, i) => (
                  <div key={rule} className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:border-[#B8860B]/20 transition-colors">
                    <span className="font-['Bebas_Neue'] text-2xl text-[#B8860B]/40 leading-none w-7 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-white/70 text-sm font-['Poppins'] leading-relaxed pt-0.5">{rule}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
                <p className="font-['Playfair_Display'] italic text-white/40 text-sm">Thank you for being a part of our community</p>
                <p className="text-[#B8860B] font-['Montserrat'] font-semibold tracking-wider text-sm mt-2">— Chef Suyog Muley</p>
                <p className="text-white/30 font-['Poppins'] text-xs mt-1">Md, S&S Foods, The Garage Cafe</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Instagram Gallery */}
      <div className="py-20 px-4 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Instagram</span>
            <h2 className="font-['Bebas_Neue'] text-5xl text-white mt-3 tracking-wider">
              GARAGE <span className="text-[#B8860B]">MOMENTS</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#B8860B] mx-auto mt-4" />
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
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
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
                Follow Us on Instagram
              </button>
            </a>
          </FadeUp>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16 px-4 bg-[#0d0d0d] border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <FadeUp>
            <h2 className="font-['Bebas_Neue'] text-5xl text-white tracking-wider">
              HAVE <span className="text-[#B8860B]">QUESTIONS?</span>
            </h2>
            <p className="text-white/50 mt-3 mb-8 font-['Poppins'] text-sm">
              Reach out on WhatsApp or give us a call — we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/919967850378" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-['Montserrat'] font-semibold tracking-wider uppercase px-7 py-3.5 rounded-full transition-all hover:scale-105 text-sm">
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </button>
              </a>
              <a href="tel:+919967850378">
                <button className="border-2 border-white/20 hover:border-[#B8860B] text-white hover:text-[#B8860B] font-['Montserrat'] font-semibold tracking-wider uppercase px-7 py-3.5 rounded-full transition-all hover:scale-105 text-sm">
                  Call Now
                </button>
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
