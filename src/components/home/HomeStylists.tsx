import React from "react";
import { Star, Sparkles, ArrowRight, Instagram, Calendar } from "lucide-react";
import { stylists, Stylist } from "@/data/stylists";
import { useAppStore } from "@/store/useBookingStore";

interface HomeStylistsProps {
  onNavigate: (route: string) => void;
}

export function HomeStylists({ onNavigate }: HomeStylistsProps) {
  const { setSelectedStylist, setWizardStep } = useAppStore();

  const handleBookWithStylist = (stylistId: string) => {
    setSelectedStylist(stylistId);
    setWizardStep(1);
    onNavigate("/book");
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#B8935A]/20 pb-6 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            The Masters of Craft
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1B1512] dark:text-[#F6F1EA] tracking-tight mt-1">
            Meet the Ateliers
          </h2>
        </div>
        <button
          onClick={() => onNavigate("/stylists")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#B8935A] hover:text-[#9E7B45] transition-colors group"
        >
          <span>View All Stylist Bios & Portfolios</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Stylists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stylists.slice(0, 3).map((st) => (
          <div
            key={st.id}
            className="group bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Image Frame */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={st.image}
                alt={st.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Rating & Exp Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <span className="px-3 py-1 bg-[#1B1512]/80 backdrop-blur-sm text-[#B8935A] text-xs font-semibold rounded-full border border-[#B8935A]/30 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-amber-400" />
                  {st.rating} ({st.reviewsCount})
                </span>
                <span className="px-3 py-1 bg-[#1B1512]/80 backdrop-blur-sm text-stone-200 text-xs rounded-full border border-white/10">
                  {st.experience}
                </span>
              </div>

              {/* Bottom overlay text */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-2xl font-bold">{st.name}</h3>
                <p className="text-xs text-[#B8935A] font-medium tracking-wide">{st.role}</p>
              </div>
            </div>

            {/* Info */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {st.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#B8935A]/10 text-[#1B1512] dark:text-[#F6F1EA] border border-[#B8935A]/20 font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                  {st.bio}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center gap-2 border-t border-[#B8935A]/15">
                <button
                  onClick={() => handleBookWithStylist(st.id)}
                  className="flex-1 py-2.5 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {st.name.split(" ")[0]}</span>
                </button>
                <button
                  onClick={() => onNavigate(`/stylists/${st.slug}`)}
                  className="px-3 py-2.5 border border-stone-300 dark:border-stone-700 hover:border-[#B8935A] text-[#1B1512] dark:text-[#F6F1EA] rounded-xl text-xs font-medium transition-colors"
                  title="View Profile"
                >
                  Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
