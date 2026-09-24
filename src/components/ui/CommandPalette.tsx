import React, { useState, useEffect, useMemo } from "react";
import { Search, X, Calendar, Scissors, User, Sparkles, BookOpen, ShoppingBag, ArrowRight } from "lucide-react";
import { useAppStore } from "@/store/useBookingStore";
import { salonServices } from "@/data/services";
import { stylists } from "@/data/stylists";
import { formatCurrency } from "@/lib/utils";

interface CommandPaletteProps {
  onNavigate: (route: string) => void;
}

export function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const { isCommandPaletteOpen, setCommandPaletteOpen, selectSingleServiceAndProceed } = useAppStore();
  const [query, setQuery] = useState("");

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      } else if (e.key === "Escape" && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  // Reset query on close
  useEffect(() => {
    if (!isCommandPaletteOpen) setQuery("");
  }, [isCommandPaletteOpen]);

  const filteredServices = useMemo(() => {
    if (!query.trim()) return salonServices.slice(0, 4);
    const q = query.toLowerCase();
    return salonServices.filter(
      (s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query]);

  const filteredStylists = useMemo(() => {
    if (!query.trim()) return stylists.slice(0, 3);
    const q = query.toLowerCase();
    return stylists.filter(
      (st) =>
        st.name.toLowerCase().includes(q) ||
        st.role.toLowerCase().includes(q) ||
        st.specialties.some((spec) => spec.toLowerCase().includes(q))
    ).slice(0, 3);
  }, [query]);

  const quickPages = [
    { label: "Book Appointment", href: "/book", icon: Calendar, tag: "Booking Flow" },
    { label: "All Services Menu", href: "/services", icon: Scissors, tag: "Catalog" },
    { label: "Hair Style Quiz", href: "/style-quiz", icon: Sparkles, tag: "Diagnostic" },
    { label: "Bridal & Glow Offers", href: "/offers", icon: Sparkles, tag: "Packages" },
    { label: "Haircare Boutique Shop", href: "/shop", icon: ShoppingBag, tag: "Retail" },
    { label: "Salon Journal & Guides", href: "/journal", icon: BookOpen, tag: "Editorial" },
    { label: "Admin Demo Dashboard", href: "/admin", icon: User, tag: "Salon Operations" },
  ].filter((p) => !query.trim() || p.label.toLowerCase().includes(query.toLowerCase()));

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#F6F1EA] dark:bg-[#1A1412] text-[#1B1512] dark:text-[#F6F1EA] rounded-2xl shadow-2xl border border-[#B8935A]/30 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#B8935A]/20 gap-3">
          <Search className="w-5 h-5 text-[#B8935A] shrink-0" />
          <input
            id="command-palette-input"
            type="text"
            placeholder="Search services, stylists, journal articles, or navigate..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent focus:outline-none text-base sm:text-lg placeholder:text-stone-400 dark:placeholder:text-stone-500"
          />
          <button
            id="close-command-palette-btn"
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1 text-sm">
          {/* Quick Pages */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#B8935A] mb-2 px-2">
              Navigation
            </div>
            <div className="space-y-1">
              {quickPages.map((page) => {
                const Icon = page.icon;
                return (
                  <button
                    key={page.href}
                    onClick={() => {
                      setCommandPaletteOpen(false);
                      onNavigate(page.href);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#B8935A]/10 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#B8935A]/15 text-[#B8935A] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium group-hover:text-[#B8935A] transition-colors">
                        {page.label}
                      </span>
                    </div>
                    <span className="text-xs text-stone-400 group-hover:text-[#B8935A] flex items-center gap-1">
                      {page.tag} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#B8935A] mb-2 px-2">
              Salon Services ({filteredServices.length})
            </div>
            <div className="space-y-1">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#B8935A]/10 transition-colors group"
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="font-medium truncate group-hover:text-[#B8935A] transition-colors">
                      {service.name}
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400">
                      {service.category} · {service.duration} mins
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-serif text-sm text-[#B8935A] font-semibold">
                      {formatCurrency(service.price)}
                    </span>
                    <button
                      onClick={() => {
                        selectSingleServiceAndProceed(service.id);
                        setCommandPaletteOpen(false);
                        onNavigate("/book");
                      }}
                      className="px-3 py-1 text-xs bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-lg transition-colors font-medium"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stylists */}
          {filteredStylists.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#B8935A] mb-2 px-2">
                Master Stylists
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {filteredStylists.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setCommandPaletteOpen(false);
                      onNavigate(`/stylists/${st.slug}`);
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#B8935A]/10 text-left transition-colors border border-transparent hover:border-[#B8935A]/20"
                  >
                    <img
                      src={st.image}
                      alt={st.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-medium text-xs truncate">{st.name}</div>
                      <div className="text-[11px] text-stone-400 truncate">{st.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-black/5 dark:bg-white/5 border-t border-[#B8935A]/15 text-xs text-stone-500 dark:text-stone-400 flex items-center justify-between">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono">ESC</kbd> to exit</span>
          <span className="hidden sm:inline">Aura & Co. Concierge Search</span>
        </div>
      </div>
    </div>
  );
}
