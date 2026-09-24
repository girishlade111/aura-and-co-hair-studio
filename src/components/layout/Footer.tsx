import React, { useState } from "react";
import { 
  MapPin, Phone, Mail, Clock, Instagram, Facebook, 
  ArrowRight, Check, Sparkles, MessageSquare
} from "lucide-react";
import { siteConfig } from "@/config/site";

interface FooterProps {
  onNavigate: (route: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes("@")) {
      setIsSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-[#1B1512] text-[#F6F1EA] pt-16 sm:pt-24 pb-12 border-t border-[#B8935A]/20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B8935A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Bespoke Hair Artistry
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
              Aura & Co. Hair Studio
            </h2>
            <p className="text-stone-400 text-sm sm:text-base max-w-lg leading-relaxed">
              {siteConfig.subTagline} Designed for discerning clientele seeking precision architectural cutting, French balayage, and restorative scalp therapy in Pune.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="font-serif text-xl text-white mb-2">The Aura Gazette</h3>
              <p className="text-xs text-stone-300 mb-4">
                Receive private invitations to guest stylist residencies, seasonal color trend forecasts, and exclusive salon privileges.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 p-3 rounded-xl text-xs font-medium">
                  <Check className="w-4 h-4" />
                  <span>Welcome to the circle. Please check your inbox shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="flex-1 bg-black/40 border border-white/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#B8935A]"
                  />
                  <button
                    id="newsletter-subscribe-btn"
                    type="submit"
                    className="px-5 py-2.5 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-white/10 text-sm">
          {/* Studio Hours */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B8935A]" />
              Studio Hours
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              {siteConfig.hours.map((h) => (
                <li key={h.day} className="flex justify-between border-b border-white/5 pb-1">
                  <span className={h.dayIndex === 1 ? "text-stone-500 italic" : "text-stone-300"}>
                    {h.day}
                  </span>
                  <span className={h.isOpen ? "text-[#B8935A] font-medium" : "text-stone-500 italic"}>
                    {h.isOpen ? `${h.open} - ${h.close}` : "Studio Academy & Closed"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Directions */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B8935A]" />
              Atelier Location
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed mb-3">
              {siteConfig.address.full}
              <br />
              <span className="text-stone-400">Landmark: {siteConfig.address.landmark}</span>
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <a
                href={siteConfig.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#B8935A] hover:underline"
              >
                <span>Get Google Maps Directions</span>
                <ArrowRight className="w-3 h-3" />
              </a>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="inline-flex items-center gap-2 text-xs text-stone-300 hover:text-white"
              >
                <Phone className="w-3.5 h-3.5 text-[#B8935A]" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 text-xs text-stone-300 hover:text-white"
              >
                <Mail className="w-3.5 h-3.5 text-[#B8935A]" />
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Explore Aura</h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => onNavigate("/services")} className="hover:text-[#B8935A]">
                  Services & Treatments Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/stylists")} className="hover:text-[#B8935A]">
                  Meet Master Stylists
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/gallery")} className="hover:text-[#B8935A]">
                  Hair Transformation Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/style-quiz")} className="hover:text-[#B8935A]">
                  Hair Diagnostic Style Quiz
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/offers")} className="hover:text-[#B8935A]">
                  Bridal Suites & Glow Memberships
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/shop")} className="hover:text-[#B8935A]">
                  Curated Haircare Boutique
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/journal")} className="hover:text-[#B8935A]">
                  The Hair Journal & Pune Water Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Social */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Concierge Desk</h4>
            <p className="text-xs text-stone-300 mb-4 leading-relaxed">
              Prefer direct messaging? Our salon manager is available on WhatsApp for bridal consultations and bespoke queries.
            </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 mb-6 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <div className="flex gap-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#B8935A] flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#B8935A] flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Aura & Co. Hair Studio Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate("/privacy")} className="hover:text-stone-300">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate("/terms")} className="hover:text-stone-300">
              Terms of Service
            </button>
            <button onClick={() => onNavigate("/admin")} className="text-amber-400 hover:underline">
              Client Pitch Admin Demo
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
