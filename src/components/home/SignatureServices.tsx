import React, { useState } from "react";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { salonServices, ServiceItem } from "@/data/services";
import { formatCurrency } from "@/lib/utils";
import { useAppStore } from "@/store/useBookingStore";

interface SignatureServicesProps {
  onNavigate: (route: string) => void;
}

export function SignatureServices({ onNavigate }: SignatureServicesProps) {
  const { selectSingleServiceAndProceed } = useAppStore();
  const signatureList = salonServices.filter((s) => s.signature).slice(0, 6);
  const [activeHoverId, setActiveHoverId] = useState<string>(signatureList[0].id);

  const activeService = signatureList.find((s) => s.id === activeHoverId) || signatureList[0];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#B8935A]/20 pb-6 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Atelier
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1B1512] dark:text-[#F6F1EA] tracking-tight mt-1">
            Signature Services
          </h2>
        </div>
        <button
          onClick={() => onNavigate("/services")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#B8935A] hover:text-[#9E7B45] transition-colors group"
        >
          <span>View All 18 Salon Treatments</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive List */}
        <div className="lg:col-span-7 space-y-3">
          {signatureList.map((service, index) => {
            const isSelected = activeHoverId === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveHoverId(service.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white dark:bg-[#1A1412] border-[#B8935A] shadow-md -translate-y-0.5"
                    : "bg-white/40 dark:bg-white/5 border-stone-200 dark:border-stone-800 hover:border-[#B8935A]/50"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-stone-400 text-sm font-light">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1B1512] dark:text-[#F6F1EA]">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {service.duration} mins
                        </span>
                        <span>·</span>
                        <span>{service.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-serif text-base sm:text-lg font-bold text-[#B8935A]">
                      {formatCurrency(service.price)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectSingleServiceAndProceed(service.id);
                        onNavigate("/book");
                      }}
                      className="px-3.5 py-1.5 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                    >
                      Book
                    </button>
                  </div>
                </div>

                {/* Mobile visible description */}
                {isSelected && (
                  <p className="mt-3 text-xs text-stone-600 dark:text-stone-300 leading-relaxed border-t border-[#B8935A]/10 pt-2 lg:hidden">
                    {service.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Active Service Dynamic Showcase (Desktop) */}
        <div className="hidden lg:block lg:col-span-5">
          <div className="sticky top-28 bg-white dark:bg-[#1A1412] p-6 rounded-3xl border border-[#B8935A]/30 shadow-xl space-y-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner">
              <img
                src={activeService.image || salonServices[0].image}
                alt={activeService.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-[11px] rounded-full uppercase tracking-wider">
                {activeService.category}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-serif text-2xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                  {activeService.name}
                </h3>
                <span className="font-serif text-xl font-bold text-[#B8935A]">
                  {formatCurrency(activeService.price)}
                </span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {activeService.description}
              </p>

              {activeService.idealFor && (
                <div className="p-3 rounded-xl bg-[#B8935A]/10 text-xs text-[#1B1512] dark:text-[#F6F1EA]">
                  <strong className="text-[#B8935A]">Ideal For:</strong> {activeService.idealFor}
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => {
                    selectSingleServiceAndProceed(activeService.id);
                    onNavigate("/book");
                  }}
                  className="w-full py-3 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Select & Continue Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
