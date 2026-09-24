import React, { useState } from "react";
import { Sparkles, MapPin, Phone, Mail, MessageSquare, Clock, Navigation, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getSalonOpenStatus } from "@/lib/utils";

interface ContactPageProps {
  onNavigate: (route: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceInterest: "Bespoke Consultation",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; message?: string }>({});

  const status = getSalonOpenStatus();

  const validate = () => {
    const errs: { name?: string; phone?: string; message?: string } = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = "Valid 10-digit phone required";
    if (!formData.message.trim()) errs.message = "Please write a short inquiry";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8935A]/10 border border-[#B8935A]/30 text-[#B8935A] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Koregaon Park · Lane 7
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1B1512] dark:text-[#F6F1EA] tracking-tight">
            Connect with Aura & Co.
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            Whether inquiring about a bridal ensemble, requesting specialized texture advice, or reserving an appointment, our concierge is at your service.
          </p>
        </div>

        {/* Contact Methods Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Call Card */}
          <a
            href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
            className="p-6 bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/20 hover:border-[#B8935A] transition-all shadow-sm group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#B8935A]/15 text-[#B8935A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">Concierge Desk</h3>
            <p className="text-xs text-stone-500 mt-1">Direct salon receptionist line</p>
            <div className="text-sm font-semibold text-[#B8935A] mt-3">{siteConfig.contact.phone}</div>
          </a>

          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/20 hover:border-[#25D366] transition-all shadow-sm group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">WhatsApp Concierge</h3>
            <p className="text-xs text-stone-500 mt-1">Instant chat, consultations & directions</p>
            <div className="text-sm font-semibold text-[#25D366] mt-3">Chat on WhatsApp →</div>
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="p-6 bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/20 hover:border-[#B8935A] transition-all shadow-sm group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#B8935A]/15 text-[#B8935A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">Bridal & Editorial Inquiries</h3>
            <p className="text-xs text-stone-500 mt-1">Press, careers & wedding bookings</p>
            <div className="text-sm font-semibold text-[#B8935A] mt-3">{siteConfig.contact.email}</div>
          </a>
        </div>

        {/* Main Form & Interactive Map / Hours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-6 bg-white dark:bg-[#1A1412] p-8 rounded-3xl border border-[#B8935A]/20 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#1B1512] dark:text-[#F6F1EA] mb-2">
              Send a Concierge Note
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              We respond to all written inquiries within 2 hours during studio working days.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-emerald-900 dark:text-emerald-100">
                  Message Dispatched
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-200">
                  Thank you, {formData.name}. Our front-desk coordinator will reach out to you via WhatsApp shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#B8935A] underline font-semibold mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Radhika Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs focus:outline-none focus:border-[#B8935A]"
                  />
                  {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98220 12345"
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs focus:outline-none focus:border-[#B8935A]"
                    />
                    {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="radhika@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs focus:outline-none focus:border-[#B8935A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Nature of Inquiry
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs focus:outline-none focus:border-[#B8935A]"
                  >
                    <option>Bespoke Haircut & Balayage</option>
                    <option>Bridal Suite Booking</option>
                    <option>Japanese Head Spa Session</option>
                    <option>Keratin or Smoothening Assessment</option>
                    <option>Glow Membership Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you are looking for..."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs focus:outline-none focus:border-[#B8935A]"
                  />
                  {errors.message && <p className="text-red-500 text-[11px] mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold tracking-wide shadow"
                >
                  Dispatch Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Right: Studio Hours & Realistic Pune Map Embed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Hours Table */}
            <div className="bg-white dark:bg-[#1A1412] p-6 rounded-3xl border border-[#B8935A]/20 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#B8935A]/15 pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B8935A]" />
                  <h4 className="font-serif text-lg font-bold">Studio Hours</h4>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-stone-400"}`} />
                  <span className={status.isOpen ? "text-emerald-700 dark:text-emerald-400 font-semibold" : "text-stone-500"}>
                    {status.statusText} · {status.detail}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {siteConfig.hours.map((h) => (
                  <div key={h.day} className="flex justify-between py-1 border-b border-stone-100 dark:border-white/5">
                    <span className="font-medium text-stone-700 dark:text-stone-300">{h.day}</span>
                    <span className={h.isOpen ? "text-stone-900 dark:text-stone-100 font-mono" : "text-rose-500 font-medium"}>
                      {h.isOpen ? `${h.open} – ${h.close}` : "Closed (Academy Training)"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Koregaon Park Map */}
            <div className="bg-white dark:bg-[#1A1412] p-6 rounded-3xl border border-[#B8935A]/20 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold">Atelier Location</h4>
                  <p className="text-xs text-stone-500">{siteConfig.address.full}</p>
                </div>
                <a
                  href={siteConfig.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#B8935A]/15 text-[#B8935A] hover:bg-[#B8935A] hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>

              {/* Styled map frame */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#B8935A]/20 bg-stone-100 dark:bg-stone-900 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
                  alt="Koregaon Park Map"
                  className="w-full h-full object-cover opacity-60 dark:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#B8935A] text-white flex items-center justify-center shadow-2xl animate-bounce">
                    <MapPin className="w-5 h-5 fill-current" />
                  </div>
                  <span className="mt-2 bg-[#1B1512] text-white text-xs font-semibold px-3 py-1 rounded-full shadow border border-[#B8935A]/40">
                    Aura & Co. Studio
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
