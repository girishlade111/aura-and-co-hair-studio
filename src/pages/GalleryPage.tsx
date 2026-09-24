import React, { useState, useEffect } from "react";
import { Sparkles, X, ChevronLeft, ChevronRight, Clock, Scissors, User } from "lucide-react";
import { galleryItems, galleryCategories, beforeAfterPairs, GalleryItem } from "@/data/gallery";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

interface GalleryPageProps {
  onNavigate: (route: string) => void;
}

export function GalleryPage({ onNavigate }: GalleryPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!activeLightboxItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveLightboxItem(null);
      } else if (e.key === "ArrowRight") {
        navigateLightbox(1);
      } else if (e.key === "ArrowLeft") {
        navigateLightbox(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxItem, filteredItems]);

  const navigateLightbox = (step: number) => {
    if (!activeLightboxItem) return;
    const currentIndex = filteredItems.findIndex((it) => it.id === activeLightboxItem.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + step + filteredItems.length) % filteredItems.length;
    setActiveLightboxItem(filteredItems[nextIndex]);
  };

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8935A]/10 border border-[#B8935A]/30 text-[#B8935A] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Studio Portfolio
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1B1512] dark:text-[#F6F1EA] tracking-tight">
            The Gallery of Transformations
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            A visual chronicle of dimensional balayage, sculptural cuts, royal bridal hair architecture, and restorative curl hydration created in our salon.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === cat
                    ? "bg-[#B8935A] text-white shadow"
                    : "bg-white/60 dark:bg-white/5 border border-[#B8935A]/20 hover:border-[#B8935A] text-stone-700 dark:text-stone-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-[#B8935A]/20 bg-black aspect-[3/4]"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-stone-200 text-[10px] uppercase font-semibold rounded-full border border-white/15">
                  {item.category}
                </span>
              </div>

              {/* Overlay Details */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h3 className="font-serif text-lg font-bold leading-snug">{item.title}</h3>
                <p className="text-xs text-[#B8935A] flex items-center gap-1.5">
                  <User className="w-3 h-3" /> {item.stylist}
                </p>
                {item.duration && (
                  <p className="text-[11px] text-stone-300 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.duration}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Before / After Case Studies Section in Gallery */}
        <div className="pt-12 border-t border-[#B8935A]/20 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
              Split Screen Inspection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
              Featured Before & After Analysis
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Drag each slider to reveal the structural transformation and gloss recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beforeAfterPairs.map((pair) => (
              <div
                key={pair.id}
                className="bg-white dark:bg-[#1A1412] p-5 rounded-3xl border border-[#B8935A]/20 shadow-md space-y-4"
              >
                <BeforeAfterSlider
                  beforeImage={pair.before}
                  afterImage={pair.after}
                  className="aspect-[4/3] w-full"
                />
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                    {pair.title}
                  </h4>
                  <p className="text-xs text-[#B8935A] font-semibold mt-0.5">
                    Lead Colorist: {pair.stylist}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                    {pair.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1B1512] rounded-3xl overflow-hidden border border-[#B8935A]/40 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image */}
            <div className="md:w-3/5 bg-black flex items-center justify-center relative overflow-hidden">
              <img
                src={activeLightboxItem.url}
                alt={activeLightboxItem.title}
                className="w-full h-full object-cover max-h-[60vh] md:max-h-[80vh]"
              />

              {/* Prev / Next controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(-1);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#B8935A] transition-colors"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#B8935A] transition-colors"
                title="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Info */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-white space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-widest text-[#B8935A] font-semibold">
                  {activeLightboxItem.category} Atelier
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                  {activeLightboxItem.title}
                </h3>
                <div className="space-y-2 text-xs text-stone-300">
                  <p>
                    <strong className="text-[#B8935A]">Master Stylist:</strong> {activeLightboxItem.stylist}
                  </p>
                  {activeLightboxItem.duration && (
                    <p>
                      <strong className="text-[#B8935A]">Service Duration:</strong> {activeLightboxItem.duration}
                    </p>
                  )}
                  {activeLightboxItem.formula && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-stone-300 mt-2">
                      <strong className="text-[#B8935A] block mb-1">Color / Cutting Blueprint:</strong>
                      {activeLightboxItem.formula}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setActiveLightboxItem(null);
                    onNavigate("/book");
                  }}
                  className="w-full py-3 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold tracking-wide shadow transition-colors"
                >
                  Book a Similar Transformation
                </button>
                <p className="text-[10px] text-stone-400 text-center">
                  Use left/right keyboard arrows to browse
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
