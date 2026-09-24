import React from "react";
import { Sparkles, Scissors, Droplet, Crown, Shield, Heart } from "lucide-react";
import { siteConfig } from "@/config/site";

export function MarqueeAndStats() {
  const marqueeItems = [
    "French Freehand Balayage",
    "Japanese Scalp Detox Waterfall",
    "Architectural Couture Cuts",
    "Royal Bridal Coiffure",
    "Brazilian Liquid Gold Keratin",
    "Olaplex Molecular Reconstruction",
    "Artisanal Beard Sculpting",
    "Custom Cellophane Gloss",
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Services Marquee Ticker */}
      <div className="relative w-full overflow-hidden bg-[#1B1512] text-[#F6F1EA] py-4 border-y border-[#B8935A]/30">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 font-serif text-lg tracking-widest uppercase">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 shrink-0">
              <span className="hover:text-[#B8935A] transition-colors">{item}</span>
              <span className="w-2 h-2 rounded-full bg-[#B8935A]" />
            </div>
          ))}
        </div>
      </div>

      {/* Intro & Animated Stat Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Philosophy Statement */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Philosophy of Aura
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1B1512] dark:text-[#F6F1EA] leading-tight">
              We do not impose styles. We reveal your inherent silhouette.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              Founded in Koregaon Park, Aura & Co. was conceived as an antidote to loud, hurried salon conveyor belts. Here, every visit begins with a 15-minute diagnostic dialogue over bespoke pour-over coffee, calibrating color, texture, and care specifically to your lifestyle and the Pune climate.
            </p>
          </div>

          {/* 4 Large Minimalist Stat Counters */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {siteConfig.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/60 dark:bg-white/5 p-6 rounded-2xl border border-[#B8935A]/20 text-center hover:border-[#B8935A] transition-all group"
              >
                <div className="font-serif text-4xl sm:text-5xl font-bold text-[#1B1512] dark:text-[#F6F1EA] group-hover:text-[#B8935A] transition-colors">
                  {stat.value}
                  <span className="text-[#B8935A]">{stat.suffix}</span>
                </div>
                <div className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
