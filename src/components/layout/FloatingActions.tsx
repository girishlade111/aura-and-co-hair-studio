import React from "react";
import { MessageSquare, Calendar } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getSalonOpenStatus } from "@/lib/utils";

interface FloatingActionsProps {
  onNavigate: (route: string) => void;
  currentRoute: string;
}

export function FloatingActions({ onNavigate, currentRoute }: FloatingActionsProps) {
  const status = getSalonOpenStatus();
  const isBookingPage = currentRoute === "/book";

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        id="floating-whatsapp-btn"
        href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
          siteConfig.contact.whatsappDefaultMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Aura Concierge on WhatsApp"
        className="fixed bottom-20 sm:bottom-8 right-5 z-40 w-13 h-13 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        {/* Tooltip on desktop */}
        <span className="absolute right-15 bg-[#1B1512] text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-white/10 hidden sm:block">
          Need assistance? Chat with us
        </span>
      </a>

      {/* Sticky Book Now Bar on Mobile (hidden on /book page itself) */}
      {!isBookingPage && (
        <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#F6F1EA]/95 dark:bg-[#120E0C]/95 backdrop-blur-md border-t border-[#B8935A]/30 p-3 px-4 flex items-center justify-between shadow-2xl">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8935A]">
              Aura & Co. Pune
            </span>
            <div className="flex items-center gap-1.5 text-xs font-medium text-stone-700 dark:text-stone-300">
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-stone-400"}`} />
              <span>{status.isOpen ? "Open Today" : "Closed"}</span>
              <span className="text-[10px] text-stone-400">· {siteConfig.currency.symbol}2,450+</span>
            </div>
          </div>

          <button
            id="mobile-sticky-book-btn"
            onClick={() => onNavigate("/book")}
            className="px-5 py-2.5 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold tracking-wide shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>
        </div>
      )}
    </>
  );
}
