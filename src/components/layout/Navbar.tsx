import React, { useState, useEffect } from "react";
import { 
  Menu, X, Search, ShoppingBag, Sun, Moon, Calendar, 
  Sparkles, ChevronRight, Phone, MessageSquare, ShieldCheck
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getSalonOpenStatus } from "@/lib/utils";
import { useAppStore } from "@/store/useBookingStore";

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { 
    isDarkMode, 
    toggleDarkMode, 
    setCommandPaletteOpen, 
    cart, 
    setCartOpen 
  } = useAppStore();

  const [salonStatus, setSalonStatus] = useState(getSalonOpenStatus());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update open status every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSalonStatus(getSalonOpenStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Stylists", href: "/stylists" },
    { label: "Gallery", href: "/gallery" },
    { label: "Offers", href: "/offers" },
    { label: "Style Quiz", href: "/style-quiz" },
    { label: "Shop", href: "/shop" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F6F1EA]/90 dark:bg-[#120E0C]/90 backdrop-blur-md shadow-sm border-b border-[#B8935A]/15 py-3"
            : "bg-[#F6F1EA]/70 dark:bg-[#120E0C]/70 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Monogram & Name */}
          <div className="flex items-center gap-4">
            <button
              id="brand-home-btn"
              onClick={() => onNavigate("/")}
              className="text-left group flex items-center gap-3 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full border border-[#B8935A] flex items-center justify-center font-serif text-lg font-semibold text-[#B8935A] group-hover:bg-[#B8935A] group-hover:text-white transition-all">
                A
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#1B1512] dark:text-[#F6F1EA] block uppercase leading-none">
                  Aura & Co.
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 block mt-1 font-sans">
                  Hair Studio · Pune
                </span>
              </div>
            </button>

            {/* Live Open / Closed Status Pill */}
            <div
              className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${salonStatus.badgeClass}`}
              title={salonStatus.detail}
            >
              <span className={`w-2 h-2 rounded-full ${salonStatus.isOpen ? "bg-emerald-500 animate-pulse" : "bg-stone-400"}`} />
              <span>{salonStatus.statusText}</span>
              <span className="text-stone-400 text-[10px] hidden 2xl:inline">({salonStatus.detail})</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentRoute === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => onNavigate(item.href)}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                    isActive
                      ? "text-[#B8935A] font-semibold bg-[#B8935A]/10"
                      : "text-[#1B1512]/80 dark:text-[#F6F1EA]/80 hover:text-[#B8935A] hover:bg-[#B8935A]/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Book CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search / Command Palette Trigger */}
            <button
              id="open-search-palette-btn"
              onClick={() => setCommandPaletteOpen(true)}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-[#B8935A] hover:bg-[#B8935A]/10 transition-colors flex items-center gap-1 text-xs"
              title="Quick Search (Cmd+K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline-block font-mono text-[11px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-stone-500">
                ⌘K
              </span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              id="toggle-theme-btn"
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-[#B8935A] hover:bg-[#B8935A]/10 transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#B8935A]" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              id="open-cart-btn"
              onClick={() => setCartOpen(true)}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-[#B8935A] hover:bg-[#B8935A]/10 transition-colors relative"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#B8935A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Admin Demo Quick Access */}
            <button
              id="nav-admin-demo-btn"
              onClick={() => onNavigate("/admin")}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg transition-colors border ${
                currentRoute === "/admin"
                  ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200"
                  : "border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-[#B8935A]"
              }`}
              title="Preview Salon Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8935A]" />
              <span className="font-medium">Admin Demo</span>
            </button>

            {/* Book Now Primary Button */}
            <button
              id="nav-book-now-btn"
              onClick={() => onNavigate("/book")}
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 lg:hidden text-stone-700 dark:text-stone-200 hover:text-[#B8935A] transition-colors"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#1B1512] text-[#F6F1EA] flex flex-col p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="font-serif text-2xl tracking-wider uppercase font-bold text-[#B8935A]">
                Aura & Co.
              </span>
              <span className="text-xs text-stone-400 block">Hair Studio · Koregaon Park</span>
            </div>
            <button
              id="close-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white/5 text-stone-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Live Status */}
          <div className="my-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${salonStatus.isOpen ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span className="font-medium text-white">{salonStatus.statusText}</span>
              <span className="text-stone-400">{salonStatus.detail}</span>
            </div>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#B8935A] font-medium underline flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3" /> WhatsApp
            </a>
          </div>

          {/* Nav Links */}
          <div className="flex-1 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(item.href);
                }}
                className={`w-full flex items-center justify-between py-3 px-3 text-lg font-serif border-b border-white/5 transition-colors ${
                  currentRoute === item.href ? "text-[#B8935A] font-bold" : "text-stone-200 hover:text-[#B8935A]"
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("/admin");
              }}
              className="w-full flex items-center justify-between py-3 px-3 text-base text-amber-300 font-medium border-b border-white/5 mt-2"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Demo Dashboard</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile CTA */}
          <div className="pt-4 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("/book");
              }}
              className="w-full py-3.5 bg-[#B8935A] text-white font-medium rounded-xl text-center shadow-lg"
            >
              Reserve Salon Appointment
            </button>
            <div className="text-center text-xs text-stone-400">
              Call Concierge: <a href={`tel:${siteConfig.contact.phone}`} className="text-white underline">{siteConfig.contact.phone}</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
