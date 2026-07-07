import { useRef, useState } from "react";
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

const WHATSAPP_NUMBER = "919967850378";

const rideTypes = [
  {
    name: "Sunday Morning Ride",
    desc: "A relaxed early-morning group ride through scenic routes, ending back at the Garage for breakfast.",
    duration: "3–4 hours",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: "Night Ride",
    desc: "Cruise under the stars with the crew — a chill night ride followed by hot coffee at the cafe.",
    duration: "2–3 hours",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    name: "Long Distance Tour",
    desc: "Multi-hour highway rides to nearby getaways for riders who want to go the distance.",
    duration: "Full day",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    name: "Custom Group Ride",
    desc: "Planning a ride with your own club or friends? We'll help you plan the route and meetup at the Garage.",
    duration: "Flexible",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 10-4-4" />
      </svg>
    ),
  },
];

const rideHighlights = [
  "Curated routes planned by fellow riders",
  "Meetup and pit-stop at The Garage Cafe",
  "All experience levels welcome",
  "Group WhatsApp updates before every ride",
];

export default function RidesPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    rideType: rideTypes[0].name,
    date: "",
    riders: "1",
  });

  const buildWhatsAppLink = () => {
    const message = `Hi! I'd like to book a ride with The Garage Cafe.\n\nName: ${form.name}\nPhone: ${form.phone}\nRide Type: ${form.rideType}\nPreferred Date: ${form.date}\nNumber of Riders: ${form.riders}\n\nPlease confirm availability.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#111111] font-['Poppins'] pt-20">
      {/* Header */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.interiorBike} alt="" className="w-full h-full object-cover opacity-25" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/70 to-[#111111]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <FadeUp>
            <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Ride With Us</span>
            <h1 className="font-['Bebas_Neue'] text-6xl sm:text-8xl text-white mt-3 tracking-wider">
              BOOK YOUR <span className="text-[#B8860B]">RIDE</span>
            </h1>
            <div className="w-20 h-0.5 bg-[#B8860B] mx-auto mt-4" />
            <p className="text-white/50 mt-4 font-['Playfair_Display'] italic text-lg max-w-xl mx-auto">
              Every great ride starts and ends at The Garage. Join a curated group ride with fellow riders.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Ride Types */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">Choose Your Ride</span>
            <h2 className="font-['Bebas_Neue'] text-5xl text-white mt-3 tracking-wider">
              RIDE <span className="text-[#B8860B]">TYPES</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#B8860B] mx-auto mt-4" />
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {rideTypes.map((ride, i) => (
              <FadeUp key={ride.name} delay={i * 0.1}>
                <div className="group h-full p-6 bg-white/5 border border-white/8 hover:border-[#B8860B]/40 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B] mb-4 group-hover:bg-[#B8860B]/20 transition-colors">
                    {ride.icon}
                  </div>
                  <h4 className="font-['Playfair_Display'] text-white font-bold text-lg mb-1">{ride.name}</h4>
                  <p className="text-[#B8860B]/70 text-xs font-['Montserrat'] font-semibold tracking-wider uppercase mb-3">{ride.duration}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{ride.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: photo + highlights */}
          <FadeUp>
            <div className="rounded-2xl overflow-hidden aspect-[4/5] mb-6">
              <img src={IMAGES.exteriorNight} alt="Garage Cafe at night" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-3">
              {rideHighlights.map((h) => (
                <div key={h} className="flex items-start gap-3 text-white/70 text-sm font-['Poppins']">
                  <span className="w-2 h-2 rounded-full bg-[#B8860B] flex-shrink-0 mt-1.5" />
                  {h}
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Right: form */}
          <FadeUp delay={0.1}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-widest mb-1">RESERVE YOUR SPOT</h3>
              <p className="text-white/40 text-sm mb-6">Fill in your details and we'll confirm on WhatsApp</p>

              <div className="space-y-4">
                <div>
                  <label className="text-white/50 text-xs font-['Montserrat'] font-semibold tracking-wider uppercase mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-black/30 border border-white/10 focus:border-[#B8860B] rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs font-['Montserrat'] font-semibold tracking-wider uppercase mb-1.5 block">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-black/30 border border-white/10 focus:border-[#B8860B] rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs font-['Montserrat'] font-semibold tracking-wider uppercase mb-1.5 block">Ride Type</label>
                  <select
                    value={form.rideType}
                    onChange={(e) => handleChange("rideType", e.target.value)}
                    className="w-full bg-black/30 border border-white/10 focus:border-[#B8860B] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  >
                    {rideTypes.map((r) => (
                      <option key={r.name} value={r.name} className="bg-[#161616]">{r.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs font-['Montserrat'] font-semibold tracking-wider uppercase mb-1.5 block">Preferred Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      className="w-full bg-black/30 border border-white/10 focus:border-[#B8860B] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-['Montserrat'] font-semibold tracking-wider uppercase mb-1.5 block">Riders</label>
                    <input
                      type="number"
                      min="1"
                      value={form.riders}
                      onChange={(e) => handleChange("riders", e.target.value)}
                      className="w-full bg-black/30 border border-white/10 focus:border-[#B8860B] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#B8860B] hover:bg-[#8B6A0B] text-white font-['Montserrat'] font-semibold tracking-widest uppercase py-4 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#B8860B]/30 text-sm mt-2"
                >
                  <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Confirm on WhatsApp
                </a>
                <p className="text-white/20 text-[10px] font-['Poppins'] text-center leading-relaxed">
                  We'll reach out on WhatsApp to confirm your ride booking
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
