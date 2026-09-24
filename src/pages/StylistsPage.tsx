import React from "react";
import { Star, Sparkles, Calendar, ArrowRight, Instagram } from "lucide-react";
import { stylists, Stylist } from "@/data/stylists";
import { useAppStore } from "@/store/useBookingStore";

interface StylistsPageProps {
  onNavigate: (route: string) => void;
}

export function StylistsPage({ onNavigate }: StylistsPageProps) {
  const { setSelectedStylist, setWizardStep } = useAppStore();

  const handleBookStylist = (stylistId: string) => {
    setSelectedStylist(stylistId);
    setWizardStep(1);
    onNavigate("/book");
  };

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8935A]/10 border border-[#B8935A]/30 text-[#B8935A] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Vidal Sassoon & L'Oréal Certified
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1B1512] dark:text-[#F6F1EA] tracking-tight">
            Our Master Stylists & Colorists
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            Each stylist at Aura & Co. possesses at least 6 years of specialized editorial or salon mastery. Select a stylist below to view their portfolio or reserve their chair directly.
          </p>
        </div>

        {/* Grid of Stylists */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stylists.map((stylist) => (
            <div
              key={stylist.id}
              className="bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Rating & Exp */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <span className="px-3 py-1 bg-[#1B1512]/80 backdrop-blur-sm text-[#B8935A] text-xs font-semibold rounded-full border border-[#B8935A]/30 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current text-amber-400" />
                    {stylist.rating} ({stylist.reviewsCount})
                  </span>
                  <span className="px-3 py-1 bg-[#1B1512]/80 backdrop-blur-sm text-stone-200 text-xs rounded-full border border-white/10">
                    {stylist.experience}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif text-2xl font-bold">{stylist.name}</h3>
                  <p className="text-xs text-[#B8935A] font-medium tracking-wide">{stylist.role}</p>
                </div>
              </div>

              {/* Bio & Specialties */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {stylist.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#B8935A]/10 text-[#1B1512] dark:text-[#F6F1EA] border border-[#B8935A]/20 font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                    {stylist.bio}
                  </p>

                  <p className="text-xs italic text-stone-500 border-l-2 border-[#B8935A] pl-2.5">
                    "{stylist.quotes}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#B8935A]/15 flex items-center gap-2">
                  <button
                    onClick={() => handleBookStylist(stylist.id)}
                    className="flex-1 py-2.5 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book with {stylist.name.split(" ")[0]}</span>
                  </button>
                  <button
                    onClick={() => onNavigate(`/stylists/${stylist.slug}`)}
                    className="px-3 py-2.5 border border-stone-300 dark:border-stone-700 hover:border-[#B8935A] text-[#1B1512] dark:text-[#F6F1EA] rounded-xl text-xs font-medium transition-colors"
                  >
                    Portfolio
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
