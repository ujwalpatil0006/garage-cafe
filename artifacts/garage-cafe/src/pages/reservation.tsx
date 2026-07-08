import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";

export default function Reservation() {
  const [location] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    preference: "No Preference",
    request: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimeout = useRef<number>(undefined);

  useEffect(() => {
    // Check for URL parameters to pre-fill form
    const params = new URLSearchParams(window.location.search);
    const specialRequest = params.get("request");
    if (specialRequest) {
      setFormData((prev) => ({ ...prev, request: specialRequest }));
    }
  }, [location]);

  const showToast = (message: string) => {
    setToast({ show: true, message });
    window.clearTimeout(toastTimeout.current);
    toastTimeout.current = window.setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 2200);
  };

  const clearErrors = () => {
    setErrors({});
  };

  const setError = (fieldName: string, message: string) => {
    setErrors((prev) => ({ ...prev, [fieldName]: message }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setError(name, "");
    }
  };

  const validateForm = () => {
    let hasError = false;
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
      hasError = true;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      hasError = true;
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone must contain only numbers.";
      hasError = true;
    }

    if (!formData.date) {
      newErrors.date = "Please select a date.";
      hasError = true;
    } else {
      const selectedDate = new Date(`${formData.date}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Please choose a future date.";
        hasError = true;
      }
    }

    if (!formData.time) {
      newErrors.time = "Please select a time.";
      hasError = true;
    }

    if (!formData.guests) {
      newErrors.guests = "Please select guest count.";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (!validateForm()) {
      const firstError = Object.values(errors).find((err) => err);
      if (firstError) {
        showToast(firstError);
      }
      return;
    }

    const phoneNumber = "919967850378";
    const message = `Hi Garage Cafe,
I'd love to book a table.

Name: ${formData.name}

Phone: ${formData.phone}

Date: ${formData.date}

Time: ${formData.time}

Guests: ${formData.guests}

Table Preference: ${formData.preference}

Special Request:
${formData.request || "None"}

Please confirm my reservation.
Thank you!`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    showToast("Reservation request submitted! Opening WhatsApp...");

    window.setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 1000);
  };

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

            <form onSubmit={handleSubmit} noValidate className="relative space-y-6">
              {/* Name */}
              <div className={`field ${errors.name ? "error" : ""}`}>
                <label htmlFor="name" className="flex items-center gap-3 text-white/70 font-['Montserrat'] font-semibold text-sm tracking-wider uppercase mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  Your Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className={`w-full bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/30 font-['Poppins'] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] transition-all`}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1 font-['Poppins']">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div className={`field ${errors.phone ? "error" : ""}`}>
                <label htmlFor="phone" className="flex items-center gap-3 text-white/70 font-['Montserrat'] font-semibold text-sm tracking-wider uppercase mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9967850378"
                  required
                  className={`w-full bg-white/5 border ${errors.phone ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/30 font-['Poppins'] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] transition-all`}
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1 font-['Poppins']">{errors.phone}</p>}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`field ${errors.date ? "error" : ""}`}>
                  <label htmlFor="date" className="flex items-center gap-3 text-white/70 font-['Montserrat'] font-semibold text-sm tracking-wider uppercase mb-2">
                    <span className="w-8 h-8 rounded-lg bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    Date *
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    required
                    className={`w-full bg-white/5 border ${errors.date ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/30 font-['Poppins'] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] transition-all`}
                  />
                  {errors.date && <p className="text-red-400 text-sm mt-1 font-['Poppins']">{errors.date}</p>}
                </div>

                <div className={`field ${errors.time ? "error" : ""}`}>
                  <label htmlFor="time" className="flex items-center gap-3 text-white/70 font-['Montserrat'] font-semibold text-sm tracking-wider uppercase mb-2">
                    <span className="w-8 h-8 rounded-lg bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Time *
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className={`w-full bg-white/5 border ${errors.time ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/30 font-['Poppins'] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] transition-all`}
                  />
                  {errors.time && <p className="text-red-400 text-sm mt-1 font-['Poppins']">{errors.time}</p>}
                </div>
              </div>

              {/* Guests */}
              <div className={`field ${errors.guests ? "error" : ""}`}>
                <label htmlFor="guests" className="flex items-center gap-3 text-white/70 font-['Montserrat'] font-semibold text-sm tracking-wider uppercase mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                  Number of Guests *
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className={`w-full bg-white/5 border ${errors.guests ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white font-['Poppins'] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] transition-all appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-[#111111]">Select guests</option>
                  <option value="1 Guest" className="bg-[#111111]">1 Guest</option>
                  <option value="2 Guests" className="bg-[#111111]">2 Guests</option>
                  <option value="3 Guests" className="bg-[#111111]">3 Guests</option>
                  <option value="4 Guests" className="bg-[#111111]">4 Guests</option>
                  <option value="5 Guests" className="bg-[#111111]">5 Guests</option>
                  <option value="6 Guests" className="bg-[#111111]">6 Guests</option>
                  <option value="7–10 Guests" className="bg-[#111111]">7–10 Guests</option>
                  <option value="More than 10" className="bg-[#111111]">More than 10</option>
                </select>
                {errors.guests && <p className="text-red-400 text-sm mt-1 font-['Poppins']">{errors.guests}</p>}
              </div>

              {/* Table Preference */}
              <div className="field">
                <label htmlFor="preference" className="flex items-center gap-3 text-white/70 font-['Montserrat'] font-semibold text-sm tracking-wider uppercase mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </span>
                  Table Preference
                </label>
                <select
                  id="preference"
                  name="preference"
                  value={formData.preference}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-['Poppins'] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] transition-all appearance-none cursor-pointer"
                >
                  <option value="No Preference" className="bg-[#111111]">No Preference</option>
                  <option value="Indoor Seating" className="bg-[#111111]">Indoor Seating</option>
                  <option value="Outdoor / Garden" className="bg-[#111111]">Outdoor / Garden</option>
                  <option value="Corner / Private" className="bg-[#111111]">Corner / Private</option>
                </select>
              </div>

              {/* Special Request */}
              <div className="field">
                <label htmlFor="request" className="flex items-center gap-3 text-white/70 font-['Montserrat'] font-semibold text-sm tracking-wider uppercase mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </span>
                  Special Request (optional)
                </label>
                <textarea
                  id="request"
                  name="request"
                  rows={4}
                  value={formData.request}
                  onChange={handleChange}
                  placeholder="Birthday celebration, dietary needs, or anything else..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 font-['Poppins'] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#B8860B] hover:bg-[#8B6A0B] text-white font-['Montserrat'] font-semibold tracking-widest uppercase py-4 rounded-full transition-all hover:shadow-lg hover:shadow-[#B8860B]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Toast */}
      {toast.show && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#B8860B] text-white px-6 py-3 rounded-full shadow-2xl font-['Montserrat'] font-semibold text-sm tracking-wider animate-in fade-in slide-in-from-bottom-4"
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}