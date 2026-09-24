import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { CustomCursor } from "@/components/ui/CustomCursor";

// Page Views
import { HomePage } from "@/pages/HomePage";
import { ServicesPage } from "@/pages/ServicesPage";
import { StylistsPage } from "@/pages/StylistsPage";
import { StylistDetailPage } from "@/pages/StylistDetailPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { BookingPage } from "@/pages/BookingPage";
import { OffersPage } from "@/pages/OffersPage";
import { StyleQuizPage } from "@/pages/StyleQuizPage";
import { ShopPage } from "@/pages/ShopPage";
import { JournalPage } from "@/pages/JournalPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { AdminPage } from "@/pages/AdminPage";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>("/");

  // Initialize route from window.location.pathname or hash
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || "/";
      setCurrentRoute(path);
    };

    // Initial check
    if (window.location.pathname && window.location.pathname !== "/") {
      setCurrentRoute(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, "", route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render route content
  const renderPage = () => {
    if (currentRoute.startsWith("/stylists/")) {
      const slug = currentRoute.replace("/stylists/", "");
      return <StylistDetailPage slug={slug} onNavigate={navigate} />;
    }

    switch (currentRoute) {
      case "/":
        return <HomePage onNavigate={navigate} />;
      case "/services":
        return <ServicesPage onNavigate={navigate} />;
      case "/stylists":
        return <StylistsPage onNavigate={navigate} />;
      case "/gallery":
        return <GalleryPage onNavigate={navigate} />;
      case "/book":
        return <BookingPage onNavigate={navigate} />;
      case "/offers":
        return <OffersPage onNavigate={navigate} />;
      case "/style-quiz":
        return <StyleQuizPage onNavigate={navigate} />;
      case "/shop":
        return <ShopPage onNavigate={navigate} />;
      case "/journal":
        return <JournalPage onNavigate={navigate} />;
      case "/about":
        return <AboutPage onNavigate={navigate} />;
      case "/contact":
        return <ContactPage onNavigate={navigate} />;
      case "/admin":
        return <AdminPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const isAdmin = currentRoute === "/admin";

  return (
    <div className="min-h-screen bg-[#F6F1EA] dark:bg-[#120E0C] text-[#1B1512] dark:text-[#F6F1EA] font-sans antialiased film-grain flex flex-col selection:bg-[#B8935A]/30 selection:text-[#B8935A]">
      {/* Desktop Custom Editorial Cursor */}
      <CustomCursor />

      {/* Global Command Palette (Cmd + K) */}
      <CommandPalette onNavigate={navigate} />

      {/* Slide-out Shopping Cart Drawer */}
      <CartDrawer onNavigate={navigate} />

      {/* Global Header Navigation */}
      <Navbar currentRoute={currentRoute} onNavigate={navigate} />

      {/* Main Page Render Area */}
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer (Hidden on Admin Console for workspace ergonomics) */}
      {!isAdmin && <Footer onNavigate={navigate} />}

      {/* Floating WhatsApp and Sticky Mobile Booking Bar */}
      {!isAdmin && <FloatingActions onNavigate={navigate} currentRoute={currentRoute} />}
    </div>
  );
}
