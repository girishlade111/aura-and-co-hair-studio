import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { beforeAfterPairs } from "@/data/gallery";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

interface HomeBeforeAfterProps {
  onNavigate: (route: string) => void;
}

export function HomeBeforeAfter({ onNavigate }: HomeBeforeAfterProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentPair = beforeAfterPairs[selectedIdx];

  return (
    <section className="py-20 bg-[#1B1512] text-[#F6F1EA] border-y border-[#B8935A]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Real Results
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-white">
            The Aura Metamorphosis
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed">
            Drag the interactive slider below to inspect precision color corrections and weightless architectural layering performed in our Koregaon Park chairs.
          </p>

          {/* Toggle buttons for pairs */}
          <div className="inline-flex p-1 rounded-xl bg-white/10 border border-white/10 mt-4">
            {beforeAfterPairs.map((pair, idx) => (
              <button
                key={pair.id}
                onClick={() => setSelectedIdx(idx)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedIdx === idx
                    ? "bg-[#B8935A] text-white shadow"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                Transformation {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Slider */}
          <div className="lg:col-span-8 shadow-2xl">
            <BeforeAfterSlider
              beforeImage={currentPair.before}
              afterImage={currentPair.after}
              beforeLabel="Arrival State"
              afterLabel="Aura Atelier Finish"
              className="w-full aspect-[16/10] sm:aspect-[16/9] border border-[#B8935A]/30 shadow-2xl"
            />
          </div>

          {/* Details & Proof stats */}
          <div className="lg:col-span-4 space-y-6 bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10">
            <div>
              <span className="text-xs uppercase font-medium text-[#B8935A] block mb-1">
                Stylist: {currentPair.stylist}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white leading-snug">
                {currentPair.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {currentPair.description}
            </p>

            {/* Impact Metric Chips */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {Object.entries(currentPair.stats).map(([k, v]) => (
                <div key={k} className="p-3 bg-black/40 rounded-xl border border-white/10 text-center">
                  <div className="font-serif text-2xl font-bold text-[#B8935A]">{v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 capitalize">
                    {k.replace(/([A-Z])/g, " $1")}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate("/gallery")}
                className="w-full py-3 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2"
              >
                <span>View Full Gallery ({beforeAfterPairs.length}+ Case Studies)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
