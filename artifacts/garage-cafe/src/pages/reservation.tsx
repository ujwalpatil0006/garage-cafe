import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ReservationForm } from "./reservation-form";

export default function Reservation() {
  const [location] = useLocation();
  const [specialRequest, setSpecialRequest] = useState("");

  useEffect(() => {
    // Check for URL parameters to pre-fill form
    const params = new URLSearchParams(window.location.search);
    const request = params.get("request");
    if (request) {
      setSpecialRequest(request);
    }
  }, [location]);

  // Set min date to today
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[#111111] font-['Poppins']">
      {/* Ambient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B8860B]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B8860B]/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#B8860B]/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#B8860B] hover:text-white transition-colors font-['Montserrat'] font-semibold text-sm tracking-wider uppercase mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
          <span className="text-[#B8860B] font-['Montserrat'] font-semibold text-xs tracking-[0.4em] uppercase">
            Garage Cafe Reservation
          </span>
          <h1 className="font-['Bebas_Neue'] text-6xl sm:text-8xl text-white mt-3 tracking-wider">
            BOOK YOUR <span className="text-[#B8860B]">GARAGE TABLE</span>
          </h1>
          <h2 className="font-['Playfair_Display'] text-2xl text-white/70 mt-2 italic">
            Reserve Your Spot
          </h2>
          <p className="text-white/50 mt-4 font-['Poppins'] text-lg">
            Book your table and enjoy the Garage Cafe experience.
          </p>
        </div>
      </header>

      {/* Form Card */}
      <main className="relative z-10 px-4 pb-20">
        <div className="max-w-lg mx-auto">
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/50">
            {/* Card glow effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/5 to-transparent" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#B8860B]/10 rounded-full blur-3xl" />
            </div>

            {/* Card rim */}
            <div className="absolute inset-0 rounded-3xl border border-white/5" />

            <ReservationForm initialRequest={specialRequest} />
          </div>
        </div>
      </main>
    </div>
  );
}