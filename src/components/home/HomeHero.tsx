import React from "react";
import { ArrowRight, Sparkles, Star, Calendar, Scissors, Award } from "lucide-react";
import { siteConfig } from "@/config/site";
import { salonImages } from "@/data/images";

interface HomeHeroProps {
  onNavigate: (route: string) => void;
}

export function HomeHero({ onNavigate }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E9D5CB]/30 dark:bg-[#B8935A]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8935A]/10 border border-[#B8935A]/25 text-[#B8935A] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pune’s Haute Hair Atelier · Koregaon Park</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[#1B1512] dark:text-[#F6F1EA]">
              Where hair <br className="hidden sm:inline" />
              becomes <span className="italic font-light text-[#B8935A]">art.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              Bespoke color ateliers, architectural cutting, French balayage, and Japanese head spa wellness designed for the discerning Indian aesthetic.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-book-appointment-btn"
                onClick={() => onNavigate("/book")}
                className="w-full sm:w-auto px-8 py-4 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-2xl font-semibold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Appointment</span>
              </button>

              <button
                id="hero-explore-services-btn"
                onClick={() => onNavigate("/services")}
                className="w-full sm:w-auto px-8 py-4 border border-[#B8935A]/40 hover:border-[#B8935A] text-[#1B1512] dark:text-[#F6F1EA] hover:bg-[#B8935A]/10 rounded-2xl font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
              >
                <Scissors className="w-4 h-4 text-[#B8935A]" />
                <span>Explore Services</span>
              </button>
            </div>

            {/* Trust badge row */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-stone-800 dark:text-stone-200">4.9/5 Rating</span>
                <span>(840+ Google Reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#B8935A]" />
                <span>Vidal Sassoon & L'Oréal Certified Masters</span>
              </div>
            </div>
          </div>

          {/* Right Column: Parallax Editorial Arch Mask with Accents */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Main Arch Frame */}
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4] overflow-hidden arch-mask shadow-2xl border-4 border-[#B8935A]/20 group">
              <img
                src={salonImages.hero.main}
                alt="Aura & Co. Editorial Styling"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1512]/60 via-transparent to-transparent opacity-80" />

              {/* Floating Pill on image */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#F6F1EA]/90 dark:bg-[#1A1412]/90 backdrop-blur-md p-4 rounded-2xl border border-[#B8935A]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#B8935A] tracking-wider block">
                      Featured Atelier
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1B1512] dark:text-[#F6F1EA] leading-tight">
                      French Hazelnut Balayage
                    </h3>
                  </div>
                  <span className="font-serif text-sm font-semibold text-[#B8935A]">
                    from ₹8,500
                  </span>
                </div>
              </div>
            </div>

            {/* Overlapping secondary decorative frame */}
            <div className="hidden sm:block absolute -bottom-6 -left-8 w-36 h-48 arch-mask overflow-hidden border-2 border-[#B8935A]/40 shadow-xl z-10 bg-black">
              <img
                src={salonImages.hero.secondary}
                alt="Texture focus"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Small circular floating seal */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#1B1512] text-[#B8935A] border border-[#B8935A]/40 shadow-xl flex flex-col items-center justify-center p-2 text-center rotate-12">
              <span className="text-[9px] uppercase tracking-widest font-sans">Artisanal</span>
              <span className="font-serif text-sm font-bold">100%</span>
              <span className="text-[8px] uppercase tracking-wider font-sans">Bespoke</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
