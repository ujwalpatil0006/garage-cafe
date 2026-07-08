import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/rides", label: "Rides" },
    { href: "/about", label: "About" },
    { href: "/visit", label: "Visit Us" },
  ];

  const isHome = location === "/";

  return (
    <div className="min-h-screen bg-[#111111] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-[#111111]/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-[#ffffff10]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center overflow-hidden bg-white">
                  <img 
                    src="/logo.png" 
                    alt="Garage Cafe Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-['Bebas_Neue'] text-xl tracking-widest text-white leading-none group-hover:text-[#B8860B] transition-colors">
                    THE GARAGE
                  </div>
                  <div className="text-[#8B6A0B] text-[10px] tracking-[0.3em] uppercase font-['Montserrat'] font-semibold leading-none">
                    CAFE
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`font-['Montserrat'] font-semibold text-sm tracking-widest uppercase cursor-pointer transition-colors hover:text-[#B8860B] ${
                      location === link.href ? "text-[#B8860B]" : "text-white/80"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="/reservation.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center justify-center rounded-full border border-[#B8860B]/50 bg-[#B8860B]/10 px-4 py-2 text-sm font-['Montserrat'] font-semibold uppercase tracking-[0.24em] text-[#F2D39A] transition-all duration-300 hover:bg-[#B8860B] hover:text-white"
              >
                Reserve Table
              </a>

              {/* Order Now (desktop) */}
              <a
                href="https://zomato.onelink.me/xqzv/votaxb7g"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 bg-[#B8860B] hover:bg-[#c42f3b] text-white font-['Montserrat'] font-semibold text-sm tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B8860B]/30 hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 6.5l-6.5 6.5H8v-2l6.5-6.5H16.5v2z"/>
                </svg>
                Order Now
              </a>

              {/* Hamburger (mobile) */}
              <button
                className="md:hidden text-white p-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <div className={`w-6 h-0.5 bg-white my-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
                <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#111111]/98 backdrop-blur-md border-t border-[#ffffff10] px-4 py-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className="py-3 font-['Montserrat'] font-semibold tracking-widest uppercase text-white/80 hover:text-[#B8860B] transition-colors border-b border-[#ffffff08] cursor-pointer">
                  {link.label}
                </div>
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <a
                href="/reservation.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-[#B8860B]/50 text-[#B8860B] font-['Montserrat'] font-semibold tracking-wider py-3 rounded-full"
              >
                Reserve Table
              </a>
            </div>
            <div className="flex gap-3 mt-3">
              <a
                href="https://zomato.onelink.me/xqzv/votaxb7g"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#B8860B] text-white font-['Montserrat'] font-semibold tracking-wider py-3 rounded-full"
              >
                <svg className="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 6.5l-6.5 6.5H8v-2l6.5-6.5H16.5v2z"/>
                </svg>
                Order Now
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Back to Top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-5 z-40 w-11 h-11 bg-[#B8860B] hover:bg-[#8B6A0B] rounded-full flex items-center justify-center shadow-lg shadow-[#B8860B]/40 transition-all hover:scale-110"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919967850378"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-40 w-13 h-13 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 transition-all hover:scale-110"
        title="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
