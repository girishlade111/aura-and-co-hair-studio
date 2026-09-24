import React from "react";
import { Star, Sparkles, Calendar, ArrowLeft, Instagram, CheckCircle2, Scissors } from "lucide-react";
import { stylists, Stylist } from "@/data/stylists";
import { salonServices } from "@/data/services";
import { formatCurrency } from "@/lib/utils";
import { useAppStore } from "@/store/useBookingStore";

interface StylistDetailPageProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export function StylistDetailPage({ slug, onNavigate }: StylistDetailPageProps) {
  const { setSelectedStylist, selectSingleServiceAndProceed, setWizardStep } = useAppStore();
  const stylist = stylists.find((s) => s.slug === slug || s.id === slug) || stylists[0];

  const handleBookWithThisStylist = () => {
    setSelectedStylist(stylist.id);
    setWizardStep(1);
    onNavigate("/book");
  };

  const daysMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate("/stylists")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-[#B8935A] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Stylists</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Stylist Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#B8935A]/30">
              <img
                src={stylist.image}
                alt={stylist.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#B8935A] block mb-1 font-semibold">
                  {stylist.role}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold">{stylist.name}</h1>
                <p className="text-xs text-stone-300 mt-1">{stylist.experience} Salon & Backstage Experience</p>
              </div>
            </div>

            {/* Availability & Booking Action */}
            <div className="bg-white dark:bg-[#1A1412] p-6 rounded-2xl border border-[#B8935A]/20 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-500 text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{stylist.rating}</span>
                  <span className="text-stone-400 text-xs">({stylist.reviewsCount} reviews)</span>
                </div>
                <a
                  href={`https://instagram.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#B8935A] hover:underline flex items-center gap-1 font-medium"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  {stylist.instagram}
                </a>
              </div>

              <div>
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
                  Studio Chair Schedule
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {stylist.availableDays.map((d) => (
                    <span
                      key={d}
                      className="px-2.5 py-1 rounded-lg text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                    >
                      {daysMap[d]}
                    </span>
                  ))}
                </div>
              </div>

              <button
                id="book-stylist-chair-btn"
                onClick={handleBookWithThisStylist}
                className="w-full py-3.5 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve with {stylist.name}</span>
              </button>
            </div>
          </div>

          {/* Right: Bio, Philosophy & Portfolio */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> Stylist Dossier
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                Artistry & Diagnostic Approach
              </h2>
              <blockquote className="p-4 bg-[#B8935A]/10 border-l-4 border-[#B8935A] rounded-r-xl font-serif text-lg sm:text-xl italic text-stone-800 dark:text-stone-200">
                "{stylist.quotes}"
              </blockquote>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                {stylist.bio}
              </p>
            </div>

            {/* Specialties */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-semibold text-[#1B1512] dark:text-[#F6F1EA]">
                Signature Core Specializations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stylist.specialties.map((spec) => (
                  <div
                    key={spec}
                    className="p-3 rounded-xl bg-white dark:bg-[#1A1412] border border-[#B8935A]/20 flex items-center gap-2.5 text-xs sm:text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B8935A]" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Highlights */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-semibold text-[#1B1512] dark:text-[#F6F1EA]">
                Portfolio Case Studies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stylist.portfolio.map((item, idx) => (
                  <div key={idx} className="group rounded-2xl overflow-hidden border border-[#B8935A]/20 bg-black relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                      <span className="text-xs font-serif text-white font-medium">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Services to Pair */}
            <div className="space-y-4 pt-4 border-t border-[#B8935A]/20">
              <h3 className="font-serif text-xl font-semibold text-[#1B1512] dark:text-[#F6F1EA] flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#B8935A]" />
                Frequently Booked with {stylist.name.split(" ")[0]}
              </h3>
              <div className="space-y-2">
                {salonServices.slice(0, 3).map((srv) => (
                  <div
                    key={srv.id}
                    className="p-3.5 rounded-xl bg-white dark:bg-[#1A1412] border border-[#B8935A]/15 flex items-center justify-between gap-4 hover:border-[#B8935A]/40 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-semibold truncate">{srv.name}</div>
                      <div className="text-[11px] text-stone-500">{srv.duration} mins · {formatCurrency(srv.price)}</div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedStylist(stylist.id);
                        selectSingleServiceAndProceed(srv.id);
                        onNavigate("/book");
                      }}
                      className="px-3 py-1.5 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-lg text-xs font-semibold shrink-0"
                    >
                      Book This
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
