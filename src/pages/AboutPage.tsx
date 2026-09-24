import React from "react";
import { Sparkles, Award, ShieldCheck, Heart, Coffee, Leaf, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { salonImages } from "@/data/images";

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const milestones = [
    { year: "2012", title: "The Inception in Koregaon Park", desc: "Aura & Co. was founded with 4 chairs, dedicated strictly to precision scissor work and ammonia-free botanicals." },
    { year: "2016", title: "French Balayage Certification", desc: "Our creative leads completed master certification in Paris, pioneering freehand light play for South Asian hair tones." },
    { year: "2019", title: "The Scalp Sanctuary Expansion", desc: "Introduced Pune's first private Japanese Head Spa suite with cascading water rings and herbal scalp diagnostics." },
    { year: "2024", title: "Haute Hair Studio of the Year", desc: "Honored with the Western India Luxury Lifestyle Award with over 15,000 delighted patrons." },
  ];

  const brands = [
    { name: "Kérastase Paris", desc: "Advanced scalp diagnosis & custom Fusio-Dose boosters" },
    { name: "Olaplex", desc: "Patented bis-aminopropyl diglycol dimaleate bond repair" },
    { name: "Davines Italy", desc: "Sustainable B-Corp certified biodynamic botanical care" },
    { name: "Moroccanoil", desc: "Pure argan oil infusions for luminous elasticity" },
    { name: "Dyson Professional", desc: "Intelligent thermal regulation protecting hair keratin integrity" },
  ];

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Editorial Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> The Heritage
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#1B1512] dark:text-[#F6F1EA] tracking-tight leading-tight">
              An atelier born from a refusal to rush.
            </h1>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              In an era of assembly-line salons churning out cookie-cutter blowouts in 20 minutes, Aura & Co. was founded in Koregaon Park, Pune, to restore the meditative sanctity of hair dressing.
            </p>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              We believe great hair is never an accident of luck—it is a bespoke architectural dialogue between the shape of your cheekbones, your daily lifestyle, Pune’s weather seasons, and the natural grain of your follicles.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate("/book")}
                className="px-8 py-3.5 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide shadow"
              >
                Experience the Atelier
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-[380px] aspect-[4/5] rounded-3xl arch-mask overflow-hidden shadow-2xl border-4 border-[#B8935A]/30">
              <img
                src={salonImages.interior.salonWide}
                alt="Aura & Co. Studio Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Pillars of Aura Craft */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
              The Four Tenets
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
              How We Differ From Conventional Salons
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#B8935A]/15 text-[#B8935A] flex items-center justify-center">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold">15-Min Diagnostic</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Before scissors touch hair, we analyze scalp moisture, curl elasticity, and face symmetry over pour-over coffee.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#B8935A]/15 text-[#B8935A] flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold">Low-Chemical Integrity</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                We prioritize ammonia-free formulas, biodynamic Davines infusions, and genuine Olaplex molecular bond protectors.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#B8935A]/15 text-[#B8935A] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold">Never Overbooked</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Each stylist takes only one client per block. No chaotic double-booking or leaving you waiting under cold water.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#B8935A]/15 text-[#B8935A] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold">Home Maintenance Care</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                We write down the exact washing schedule, Pune water filter tips, and drying ritual so your hair remains luminous for months.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-10 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
              The Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
              Milestones in Pune Coiffure
            </h2>
          </div>

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start p-6 bg-white dark:bg-[#1A1412] rounded-2xl border border-[#B8935A]/20 shadow-sm"
              >
                <div className="font-serif text-3xl font-bold text-[#B8935A] shrink-0 sm:w-24">
                  {m.year}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Brands Suite */}
        <div className="space-y-8 bg-white/40 dark:bg-white/5 p-8 sm:p-12 rounded-3xl border border-[#B8935A]/20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
              Authentic Formulations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
              Products We Formulate With
            </h2>
            <p className="text-xs text-stone-500">
              Only authentic, direct-import luxury salon formulations touch your hair.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {brands.map((b) => (
              <div
                key={b.name}
                className="p-4 rounded-xl bg-white dark:bg-[#1A1412] border border-[#B8935A]/20 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#B8935A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-serif text-base font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                    {b.name}
                  </div>
                  <div className="text-xs text-stone-500 leading-relaxed">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
