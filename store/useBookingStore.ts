import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ServiceItem, salonServices } from "@/data/services";
import { Stylist, stylists } from "@/data/stylists";
import { Product } from "@/data/products";

export type AppointmentStatus = "confirmed" | "completed" | "cancelled" | "pending";

export interface BookingRecord {
  id: string;
  bookingRef: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
  services: ServiceItem[];
  totalAmount: number;
  totalDuration: number; // minutes
  stylistId: string; // 'any' or stylist.id
  stylistName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm (e.g., "11:30")
  status: AppointmentStatus;
  createdAt: string;
  source: "web" | "admin" | "phone";
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuizAnswers {
  hairType?: string;
  hairLength?: string;
  primaryGoal?: string;
  maintenanceLevel?: string;
  budgetRange?: string;
}

interface BookingWizardState {
  step: number;
  selectedServiceIds: string[];
  selectedStylistId: string; // 'any' or stylist.id
  selectedDate: string; // YYYY-MM-DD
  selectedTimeSlot: string;
  clientDetails: {
    name: string;
    phone: string;
    email: string;
    notes: string;
  };
  lastConfirmedBooking: BookingRecord | null;
}

interface AppStoreState {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Command palette
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Booking Wizard
  wizard: BookingWizardState;
  setWizardStep: (step: number) => void;
  toggleServiceSelection: (serviceId: string) => void;
  selectSingleServiceAndProceed: (serviceId: string) => void;
  setSelectedStylist: (stylistId: string) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTimeSlot: (slot: string) => void;
  setClientDetails: (details: Partial<BookingWizardState["clientDetails"]>) => void;
  resetWizard: () => void;

  // Public Booking Creation
  createBookingFromWizard: () => BookingRecord;

  // Bookings / Admin Appointments (Persistent)
  bookings: BookingRecord[];
  updateBookingStatus: (id: string, status: AppointmentStatus) => void;
  deleteBooking: (id: string) => void;
  addBookingDirect: (booking: BookingRecord) => void;

  // Services Catalog Management in Admin
  customServices: ServiceItem[];
  addService: (service: Omit<ServiceItem, "id">) => void;
  addCustomService: (service: ServiceItem | Omit<ServiceItem, "id">) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  deleteCustomService: (id: string) => void;

  // Style Quiz
  quizAnswers: QuizAnswers;
  setQuizAnswer: (key: keyof QuizAnswers, value: string) => void;
  resetQuiz: () => void;
}

// Initial realistic demo appointments for Admin
const INITIAL_DEMO_BOOKINGS: BookingRecord[] = [
  {
    id: "bk-101",
    bookingRef: "AUR-8921",
    clientName: "Priyanka Chopra",
    clientPhone: "+91 98220 11223",
    clientEmail: "priyanka.c@example.com",
    notes: "Special interest in warm honey tones. Wedding in two weeks.",
    services: [salonServices[3]], // French Balayage
    totalAmount: 8500,
    totalDuration: 180,
    stylistId: "stylist-aarav",
    stylistName: "Aarav Kapoor",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "11:00",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    source: "web",
  },
  {
    id: "bk-102",
    bookingRef: "AUR-8922",
    clientName: "Kabir Mathur",
    clientPhone: "+91 97654 33221",
    clientEmail: "kabir.m@example.com",
    notes: "Hot towel finish preferred.",
    services: [salonServices[14], salonServices[15]], // Executive Cut + Beard Spa
    totalAmount: 2350,
    totalDuration: 75,
    stylistId: "stylist-rohit",
    stylistName: "Rohit Kadam",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "14:00",
    status: "completed",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    source: "web",
  },
  {
    id: "bk-103",
    bookingRef: "AUR-8923",
    clientName: "Simran Kaur",
    clientPhone: "+91 98233 44556",
    clientEmail: "simran.k@example.com",
    notes: "First time trying Japanese Head Spa. Scalp dryness concerns.",
    services: [salonServices[9]], // Head Spa
    totalAmount: 3400,
    totalDuration: 60,
    stylistId: "stylist-meera",
    stylistName: "Meera Joshi",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "16:30",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    source: "web",
  },
  {
    id: "bk-104",
    bookingRef: "AUR-8924",
    clientName: "Natasha Poonawalla",
    clientPhone: "+91 98900 99887",
    clientEmail: "natasha.p@example.com",
    notes: "VIP Suite requested.",
    services: [salonServices[0], salonServices[8]], // Couture Cut + Botox
    totalAmount: 8950,
    totalDuration: 180,
    stylistId: "stylist-aarav",
    stylistName: "Aarav Kapoor",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    timeSlot: "12:00",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    source: "web",
  },
];

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      // Theme
      isDarkMode: false,
      toggleDarkMode: () => {
        set((state) => {
          const next = !state.isDarkMode;
          if (next) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { isDarkMode: next };
        });
      },

      // Command palette
      isCommandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),

      // Cart
      cart: [],
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      setIsCartOpen: (open) => set({ isCartOpen: open }),
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existing = state.cart.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
              ),
              isCartOpen: true,
            };
          }
          return {
            cart: [...state.cart, { product, quantity }],
            isCartOpen: true,
          };
        });
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
      },
      updateCartQuantity: (productId, quantity) => {
        set((state) => ({
          cart: quantity <= 0
            ? state.cart.filter((item) => item.product.id !== productId)
            : state.cart.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
              ),
        }));
      },
      clearCart: () => set({ cart: [] }),

      // Wizard initial state
      wizard: {
        step: 1,
        selectedServiceIds: [salonServices[0].id], // default architectural cut
        selectedStylistId: "any",
        selectedDate: new Date().toISOString().split("T")[0],
        selectedTimeSlot: "11:30",
        clientDetails: {
          name: "",
          phone: "",
          email: "",
          notes: "",
        },
        lastConfirmedBooking: null,
      },

      setWizardStep: (step) =>
        set((state) => ({ wizard: { ...state.wizard, step } })),

      toggleServiceSelection: (serviceId) =>
        set((state) => {
          const current = state.wizard.selectedServiceIds;
          const exists = current.includes(serviceId);
          let updated: string[];
          if (exists) {
            // Keep at least one if clicked
            updated = current.length > 1 ? current.filter((id) => id !== serviceId) : current;
          } else {
            updated = [...current, serviceId];
          }
          return { wizard: { ...state.wizard, selectedServiceIds: updated } };
        }),

      selectSingleServiceAndProceed: (serviceId) =>
        set((state) => ({
          wizard: {
            ...state.wizard,
            selectedServiceIds: [serviceId],
            step: 2,
          },
        })),

      setSelectedStylist: (stylistId) =>
        set((state) => ({
          wizard: { ...state.wizard, selectedStylistId: stylistId },
        })),

      setSelectedDate: (date) =>
        set((state) => ({
          wizard: { ...state.wizard, selectedDate: date },
        })),

      setSelectedTimeSlot: (slot) =>
        set((state) => ({
          wizard: { ...state.wizard, selectedTimeSlot: slot },
        })),

      setClientDetails: (details) =>
        set((state) => ({
          wizard: {
            ...state.wizard,
            clientDetails: { ...state.wizard.clientDetails, ...details },
          },
        })),

      resetWizard: () =>
        set((state) => ({
          wizard: {
            step: 1,
            selectedServiceIds: [salonServices[0].id],
            selectedStylistId: "any",
            selectedDate: new Date().toISOString().split("T")[0],
            selectedTimeSlot: "11:30",
            clientDetails: { name: "", phone: "", email: "", notes: "" },
            lastConfirmedBooking: null,
          },
        })),

      // Confirmed Bookings list (shared between public booking and admin!)
      bookings: INITIAL_DEMO_BOOKINGS,

      createBookingFromWizard: () => {
        const state = get();
        const allServices = [...salonServices, ...state.customServices];
        const selectedServices = allServices.filter((s) =>
          state.wizard.selectedServiceIds.includes(s.id)
        );

        const totalAmount = selectedServices.reduce((sum, s) => sum + s.price, 0);
        const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

        let stylistName = "Any Master Stylist";
        if (state.wizard.selectedStylistId !== "any") {
          const found = stylists.find((st) => st.id === state.wizard.selectedStylistId);
          if (found) stylistName = found.name;
        }

        const newId = `bk-${Date.now().toString().slice(-6)}`;
        const randomRef = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;

        const newRecord: BookingRecord = {
          id: newId,
          bookingRef: randomRef,
          clientName: state.wizard.clientDetails.name || "Aura Guest",
          clientPhone: state.wizard.clientDetails.phone || "+91 98000 00000",
          clientEmail: state.wizard.clientDetails.email || "guest@aurahairstudio.in",
          notes: state.wizard.clientDetails.notes || "",
          services: selectedServices,
          totalAmount,
          totalDuration,
          stylistId: state.wizard.selectedStylistId,
          stylistName,
          date: state.wizard.selectedDate,
          timeSlot: state.wizard.selectedTimeSlot,
          status: "confirmed",
          createdAt: new Date().toISOString(),
          source: "web",
        };

        set((curr) => ({
          bookings: [newRecord, ...curr.bookings],
          wizard: {
            ...curr.wizard,
            lastConfirmedBooking: newRecord,
            step: 5,
          },
        }));

        return newRecord;
      },

      updateBookingStatus: (id, status) =>
        set((state) => ({
          bookings: state.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
        })),

      deleteBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        })),

      addBookingDirect: (booking) =>
        set((state) => ({
          bookings: [booking, ...state.bookings],
        })),

      // Custom services in state
      customServices: [],
      addService: (newService) =>
        set((state) => {
          const serviceItem: ServiceItem = {
            ...newService,
            id: `srv-custom-${Date.now()}`,
          };
          return { customServices: [serviceItem, ...state.customServices] };
        }),
      addCustomService: (newService) =>
        set((state) => {
          const serviceItem: ServiceItem = {
            ...newService,
            id: (newService as ServiceItem).id || `srv-custom-${Date.now()}`,
          };
          return { customServices: [serviceItem, ...state.customServices] };
        }),
      updateService: (id, updated) =>
        set((state) => ({
          customServices: state.customServices.map((s) =>
            s.id === id ? { ...s, ...updated } : s
          ),
        })),
      deleteService: (id) =>
        set((state) => ({
          customServices: state.customServices.filter((s) => s.id !== id),
        })),
      deleteCustomService: (id) =>
        set((state) => ({
          customServices: state.customServices.filter((s) => s.id !== id),
        })),

      // Style Quiz
      quizAnswers: {},
      setQuizAnswer: (key, value) =>
        set((state) => ({
          quizAnswers: { ...state.quizAnswers, [key]: value },
        })),
      resetQuiz: () => set({ quizAnswers: {} }),
    }),
    {
      name: "aura-hair-studio-storage-v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
