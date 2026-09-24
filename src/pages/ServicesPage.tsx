import React, { useState, useMemo } from "react";
import { Search, Clock, Sparkles, Filter, Check, ArrowRight } from "lucide-react";
import { serviceCategories, salonServices, ServiceCategory } from "@/data/services";
import { formatCurrency } from "@/lib/utils";
import { useAppStore } from "@/store/useBookingStore";

interface ServicesPageProps {
  onNavigate: (route: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { selectSingleServiceAndProceed, customServices } = useAppStore();

  const allCombinedServices = useMemo(() => {
    return [...salonServices, ...customServices];
  }, [customServices]);

  const filteredServices = useMemo(() => {
    return allCombinedServices.filter((s) => {
      const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [allCombinedServices, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8935A]/10 border border-[#B8935A]/30 text-[#B8935A] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Bespoke Treatment Catalog
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1B1512] dark:text-[#F6F1EA] tracking-tight">
            Services & Rituals
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            Every service begins with a personal diagnostic consultation, tailored formulation, and high-end botanical ingredients. All prices inclusive of consultation and luxury styling finish.
          </p>
        </div>

        {/* Sticky Filters & Search Bar */}
        <div className="sticky top-18 sm:top-20 z-30 bg-[#F6F1EA]/95 dark:bg-[#120E0C]/95 backdrop-blur-md py-4 mb-8 border-y border-[#B8935A]/20">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Horizontal Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {serviceCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-[#B8935A] text-white shadow-sm"
                      : "bg-white/60 dark:bg-white/5 text-[#1B1512] dark:text-[#F6F1EA] hover:bg-[#B8935A]/15 border border-[#B8935A]/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search services or concerns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-white/5 border border-[#B8935A]/30 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#B8935A]"
              />
            </div>
          </div>
        </div>

        {/* Services List / Cards */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-white/40 dark:bg-white/5 rounded-3xl border border-dashed border-[#B8935A]/30 p-8">
            <Filter className="w-10 h-10 text-[#B8935A] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-medium">No services found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Try adjusting your category filter or search keywords to find your desired treatment.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-[#B8935A] text-white text-xs rounded-xl font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-[#1A1412] rounded-2xl border border-[#B8935A]/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {service.image && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#1B1512]/75 backdrop-blur-sm text-stone-200 text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {service.category}
                    </div>
                    {service.signature && (
                      <div className="absolute top-3 right-3 bg-[#B8935A] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow">
                        Signature
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif text-xl font-bold text-[#1B1512] dark:text-[#F6F1EA] leading-snug">
                        {service.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#B8935A] font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {service.duration} mins
                      </span>
                      <span>·</span>
                      <span className="font-serif text-sm font-semibold">
                        from {formatCurrency(service.price)}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {service.description}
                    </p>

                    {service.idealFor && (
                      <p className="text-[11px] text-stone-500 italic pt-1">
                        <span className="font-semibold text-[#B8935A] not-italic">Best for:</span> {service.idealFor}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#B8935A]/15 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase text-stone-400 block font-sans">Investment</span>
                      <span className="font-serif text-lg font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                        {formatCurrency(service.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        selectSingleServiceAndProceed(service.id);
                        onNavigate("/book");
                      }}
                      className="px-5 py-2 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold tracking-wide shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
