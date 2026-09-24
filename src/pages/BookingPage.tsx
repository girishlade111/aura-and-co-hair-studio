import React, { useState, useMemo } from "react";
import { 
  Check, Calendar, Clock, User, Scissors, ArrowRight, ArrowLeft, 
  Sparkles, CheckCircle2, Download, MessageSquare, AlertCircle, RefreshCw 
} from "lucide-react";
import { useAppStore } from "@/store/useBookingStore";
import { salonServices, ServiceItem } from "@/data/services";
import { stylists, Stylist } from "@/data/stylists";
import { getAvailableSlots, TimeSlot } from "@/lib/bookingSlots";
import { formatCurrency, formatDuration, generateICS, cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface BookingPageProps {
  onNavigate: (route: string) => void;
}

export function BookingPage({ onNavigate }: BookingPageProps) {
  const { 
    wizard, 
    setWizardStep, 
    toggleServiceSelection, 
    setSelectedStylist, 
    setSelectedDate, 
    setSelectedTimeSlot, 
    setClientDetails, 
    createBookingFromWizard, 
    resetWizard,
    customServices 
  } = useAppStore();

  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; email?: string }>({});

  const allAvailableServices = useMemo(() => {
    return [...salonServices, ...customServices];
  }, [customServices]);

  const selectedServices = useMemo(() => {
    return allAvailableServices.filter((s) => wizard.selectedServiceIds.includes(s.id));
  }, [allAvailableServices, wizard.selectedServiceIds]);

  const totalAmount = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

  const selectedStylistObj = stylists.find((st) => st.id === wizard.selectedStylistId);

  // Available slots for selected date & stylist
  const availableSlots = useMemo(() => {
    return getAvailableSlots(wizard.selectedDate, wizard.selectedStylistId);
  }, [wizard.selectedDate, wizard.selectedStylistId]);

  // Date picker: generate next 14 selectable days (disabled on closed days like Mondays)
  const availableDays = useMemo(() => {
    const days: { dateStr: string; dayName: string; dateNum: number; isOpen: boolean }[] = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay();
      const config = siteConfig.hours.find((h) => h.dayIndex === dayOfWeek);
      const dateStr = d.toISOString().split("T")[0];
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      days.push({
        dateStr,
        dayName: dayNames[dayOfWeek],
        dateNum: d.getDate(),
        isOpen: config ? config.isOpen : false,
      });
    }
    return days;
  }, []);

  // Validation before step 5
  const validateClientDetails = () => {
    const errors: { name?: string; phone?: string; email?: string } = {};
    if (!wizard.clientDetails.name.trim()) {
      errors.name = "Please enter your full name.";
    }
    if (!wizard.clientDetails.phone.trim() || wizard.clientDetails.phone.length < 10) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!wizard.clientDetails.email.trim() || !wizard.clientDetails.email.includes("@")) {
      errors.email = "Please enter a valid email address.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (wizard.step === 1) {
      if (selectedServices.length === 0) return;
      setWizardStep(2);
    } else if (wizard.step === 2) {
      setWizardStep(3);
    } else if (wizard.step === 3) {
      if (!wizard.selectedTimeSlot) return;
      setWizardStep(4);
    } else if (wizard.step === 4) {
      if (validateClientDetails()) {
        setWizardStep(5);
      }
    } else if (wizard.step === 5) {
      createBookingFromWizard();
    }
  };

  const handleBack = () => {
    if (wizard.step > 1) {
      setWizardStep(wizard.step - 1);
    }
  };

  const steps = [
    { num: 1, title: "Services" },
    { num: 2, title: "Stylist" },
    { num: 3, title: "Date & Time" },
    { num: 4, title: "Details" },
    { num: 5, title: "Confirm" },
  ];

  const confirmedBooking = wizard.lastConfirmedBooking;

  // Calendar .ics file download handler
  const handleDownloadICS = () => {
    if (!confirmedBooking) return;
    const icsUrl = generateICS({
      title: `Aura & Co. Appointment (${confirmedBooking.bookingRef})`,
      description: `Hair appointment for ${confirmedBooking.clientName}. Stylist: ${confirmedBooking.stylistName}. Services: ${confirmedBooking.services.map((s) => s.name).join(", ")}.`,
      location: siteConfig.address.full,
      startDate: confirmedBooking.date,
      startTime: confirmedBooking.timeSlot,
      durationMinutes: confirmedBooking.totalDuration,
    });

    const link = document.createElement("a");
    link.href = icsUrl;
    link.setAttribute("download", `Aura-Appointment-${confirmedBooking.bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // WhatsApp Share Handler
  const handleWhatsAppShare = () => {
    if (!confirmedBooking) return;
    const text = `Hi Aura & Co.! I have just confirmed my appointment (Ref: ${confirmedBooking.bookingRef}) for ${confirmedBooking.date} at ${confirmedBooking.timeSlot}. Services: ${confirmedBooking.services.map((s) => s.name).join(", ")}.`;
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wizard Progress Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            {/* Connecting line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-stone-200 dark:bg-stone-800 w-full -z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#B8935A] -z-0 transition-all duration-500"
              style={{ width: `${((wizard.step - 1) / 4) * 100}%` }}
            />

            {steps.map((s) => {
              const isCompleted = wizard.step > s.num || (wizard.step === 5 && confirmedBooking !== null);
              const isCurrent = wizard.step === s.num && !confirmedBooking;
              return (
                <div key={s.num} className="flex flex-col items-center relative z-10">
                  <button
                    disabled={s.num > wizard.step || confirmedBooking !== null}
                    onClick={() => setWizardStep(s.num)}
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center font-semibold text-xs transition-all",
                      isCompleted
                        ? "bg-[#B8935A] text-white"
                        : isCurrent
                        ? "bg-[#1B1512] text-white border-2 border-[#B8935A] shadow-md ring-4 ring-[#B8935A]/20"
                        : "bg-white dark:bg-stone-900 text-stone-400 border border-stone-300 dark:border-stone-700"
                    )}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                  </button>
                  <span className="text-[11px] font-medium mt-1 text-stone-500 dark:text-stone-400 hidden sm:block">
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 5: Completed Confirmation View */}
        {confirmedBooking && wizard.step === 5 ? (
          <div className="max-w-2xl mx-auto bg-white dark:bg-[#1A1412] p-8 sm:p-12 rounded-3xl border border-[#B8935A]/30 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold block mb-1">
                Booking Confirmed & Synchronized
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                We look forward to welcoming you
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                Your reservation reference is{" "}
                <strong className="text-[#B8935A] font-mono text-base">{confirmedBooking.bookingRef}</strong>
              </p>
            </div>

            {/* Summary Ticket */}
            <div className="bg-[#F6F1EA] dark:bg-black/40 p-6 rounded-2xl border border-[#B8935A]/20 text-left space-y-4 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-[#B8935A]/15 pb-3">
                <span className="text-stone-500">Guest:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {confirmedBooking.clientName} ({confirmedBooking.clientPhone})
                </span>
              </div>
              <div className="flex justify-between border-b border-[#B8935A]/15 pb-3">
                <span className="text-stone-500">Date & Slot:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {confirmedBooking.date} at {confirmedBooking.timeSlot}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#B8935A]/15 pb-3">
                <span className="text-stone-500">Assigned Stylist:</span>
                <span className="font-semibold text-[#B8935A]">{confirmedBooking.stylistName}</span>
              </div>
              <div>
                <span className="text-stone-500 block mb-1">Reserved Services:</span>
                <ul className="space-y-1">
                  {confirmedBooking.services.map((s) => (
                    <li key={s.id} className="flex justify-between font-medium">
                      <span>• {s.name} ({s.duration} mins)</span>
                      <span>{formatCurrency(s.price)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t border-[#B8935A]/20 flex justify-between font-bold text-base">
                <span>Total Investment:</span>
                <span className="text-[#B8935A] font-serif">{formatCurrency(confirmedBooking.totalAmount)}</span>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 text-left flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#B8935A] shrink-0 mt-0.5" />
              <span>
                <strong>Live Pitch Demo Note:</strong> This appointment was instantly synchronized into our Salon Admin Dashboard. Visit the <strong>Admin Demo</strong> tab anytime to see it live!
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleDownloadICS}
                className="flex-1 py-3 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold shadow transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>
              <button
                onClick={handleWhatsAppShare}
                className="flex-1 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-semibold shadow transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Notify on WhatsApp</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-6 text-xs text-stone-500">
              <button onClick={() => onNavigate("/admin")} className="hover:text-[#B8935A] underline">
                View in Admin Demo Dashboard →
              </button>
              <button onClick={resetWizard} className="hover:text-[#B8935A] flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Book another appointment
              </button>
            </div>
          </div>
        ) : (
          /* Normal Wizard Steps Grid with Sidebar */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Active Wizard Step Content */}
            <div className="lg:col-span-8 bg-white dark:bg-[#1A1412] p-6 sm:p-8 rounded-3xl border border-[#B8935A]/20 shadow-sm space-y-6">
              {/* STEP 1: SERVICES MULTI-SELECT */}
              {wizard.step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                      Select Desired Services & Rituals
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                      Choose one or multiple services. Running total and scheduled duration adjust automatically.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {allAvailableServices.map((service) => {
                      const isSelected = wizard.selectedServiceIds.includes(service.id);
                      return (
                        <div
                          key={service.id}
                          onClick={() => toggleServiceSelection(service.id)}
                          className={cn(
                            "p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4",
                            isSelected
                              ? "bg-[#B8935A]/10 border-[#B8935A] shadow-sm"
                              : "bg-stone-50/50 dark:bg-white/5 border-stone-200 dark:border-stone-800 hover:border-[#B8935A]/40"
                          )}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={cn(
                                "w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition-colors",
                                isSelected
                                  ? "bg-[#B8935A] border-[#B8935A] text-white"
                                  : "border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800"
                              )}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-sm sm:text-base font-semibold text-[#1B1512] dark:text-[#F6F1EA] truncate">
                                {service.name}
                              </h3>
                              <p className="text-xs text-stone-500 line-clamp-1">{service.description}</p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="font-serif text-sm sm:text-base font-bold text-[#B8935A]">
                              {formatCurrency(service.price)}
                            </div>
                            <div className="text-[11px] text-stone-400">{service.duration} mins</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: STYLIST SELECTION */}
              {wizard.step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                      Choose Your Preferred Stylist
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                      Select a specific specialist or choose "Any Available" for maximum scheduling flexibility.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Any Available Option */}
                    <div
                      onClick={() => setSelectedStylist("any")}
                      className={cn(
                        "p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4",
                        wizard.selectedStylistId === "any"
                          ? "bg-[#B8935A]/10 border-[#B8935A] shadow-md ring-1 ring-[#B8935A]"
                          : "bg-white dark:bg-white/5 border-stone-200 dark:border-stone-800 hover:border-[#B8935A]/40"
                      )}
                    >
                      <div className="w-14 h-14 rounded-full bg-[#B8935A]/20 text-[#B8935A] flex items-center justify-center shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold">Any Available Master</h3>
                        <p className="text-xs text-stone-500">First available qualified chair</p>
                      </div>
                    </div>

                    {/* Specific Stylists */}
                    {stylists.map((st) => {
                      const isSelected = wizard.selectedStylistId === st.id;
                      return (
                        <div
                          key={st.id}
                          onClick={() => setSelectedStylist(st.id)}
                          className={cn(
                            "p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4",
                            isSelected
                              ? "bg-[#B8935A]/10 border-[#B8935A] shadow-md ring-1 ring-[#B8935A]"
                              : "bg-white dark:bg-white/5 border-stone-200 dark:border-stone-800 hover:border-[#B8935A]/40"
                          )}
                        >
                          <img
                            src={st.image}
                            alt={st.name}
                            className="w-14 h-14 rounded-full object-cover shrink-0 border border-[#B8935A]/30"
                          />
                          <div className="min-w-0">
                            <h3 className="font-serif text-base font-bold truncate">{st.name}</h3>
                            <p className="text-xs text-[#B8935A] font-medium truncate">{st.role}</p>
                            <div className="text-[11px] text-stone-400">★ {st.rating} · {st.experience}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: DATE & TIME SLOTS */}
              {wizard.step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                      Select Appointment Date & Slot
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                      Salon open Tuesday to Sunday. Monday is reserved for academy training and closed.
                    </p>
                  </div>

                  {/* Horizontal Date Picker */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                      Choose Date (Next 14 Days)
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                      {availableDays.map((day) => {
                        const isSelected = wizard.selectedDate === day.dateStr;
                        return (
                          <button
                            key={day.dateStr}
                            disabled={!day.isOpen}
                            onClick={() => setSelectedDate(day.dateStr)}
                            className={cn(
                              "w-16 py-3 rounded-2xl flex flex-col items-center justify-center transition-all shrink-0 border",
                              !day.isOpen
                                ? "opacity-30 cursor-not-allowed bg-stone-100 dark:bg-stone-800 border-transparent text-stone-400"
                                : isSelected
                                ? "bg-[#B8935A] text-white border-[#B8935A] shadow-md"
                                : "bg-white dark:bg-white/5 border-stone-200 dark:border-stone-800 hover:border-[#B8935A]"
                            )}
                          >
                            <span className="text-[11px] uppercase font-semibold">{day.dayName}</span>
                            <span className="font-serif text-xl font-bold mt-0.5">{day.dateNum}</span>
                            {!day.isOpen && <span className="text-[9px] mt-0.5">Closed</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                      Available Time Slots on {wizard.selectedDate}
                    </label>
                    {availableSlots.length === 0 ? (
                      <div className="p-8 text-center bg-stone-100 dark:bg-stone-900 rounded-2xl text-xs text-stone-500">
                        The salon is closed on this day. Please select a Tuesday through Sunday.
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                        {availableSlots.map((slot) => {
                          const isSelected = wizard.selectedTimeSlot === slot.time;
                          return (
                            <button
                              key={slot.time}
                              disabled={!slot.available}
                              onClick={() => setSelectedTimeSlot(slot.time)}
                              className={cn(
                                "py-2.5 px-2 rounded-xl text-xs font-semibold transition-all border text-center",
                                !slot.available
                                  ? "bg-stone-100 dark:bg-stone-900 border-transparent text-stone-400 line-through cursor-not-allowed"
                                  : isSelected
                                  ? "bg-[#B8935A] text-white border-[#B8935A] shadow"
                                  : "bg-white dark:bg-white/5 border-stone-200 dark:border-stone-800 hover:border-[#B8935A]"
                              )}
                            >
                              {slot.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: CLIENT CONTACT DETAILS */}
              {wizard.step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                      Guest Contact Information
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                      We will send calendar confirmation, WhatsApp directions, and consultation notes here.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Radhika Apte"
                        value={wizard.clientDetails.name}
                        onChange={(e) => setClientDetails({ name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:border-[#B8935A]"
                      />
                      {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98220 12345"
                          value={wizard.clientDetails.phone}
                          onChange={(e) => setClientDetails({ phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:border-[#B8935A]"
                        />
                        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="radhika@example.com"
                          value={wizard.clientDetails.email}
                          onChange={(e) => setClientDetails({ email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:border-[#B8935A]"
                        />
                        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                        Hair History or Special Requests (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about previous chemical treatments, hair goals, allergies, or coffee preference..."
                        value={wizard.clientDetails.notes}
                        onChange={(e) => setClientDetails({ notes: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:border-[#B8935A]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW & FINAL CONFIRM */}
              {wizard.step === 5 && !confirmedBooking && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                      Review & Authorize Reservation
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                      Please verify appointment details. No advance payment required for demo reservations.
                    </p>
                  </div>

                  <div className="bg-[#F6F1EA] dark:bg-white/5 p-6 rounded-2xl border border-[#B8935A]/20 space-y-4 text-xs sm:text-sm">
                    <div className="flex justify-between border-b border-[#B8935A]/15 pb-2.5">
                      <span className="text-stone-500">Date & Time:</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100">
                        {wizard.selectedDate} at {wizard.selectedTimeSlot}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#B8935A]/15 pb-2.5">
                      <span className="text-stone-500">Stylist:</span>
                      <span className="font-semibold text-[#B8935A]">
                        {selectedStylistObj ? selectedStylistObj.name : "Any Available Master"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#B8935A]/15 pb-2.5">
                      <span className="text-stone-500">Guest:</span>
                      <span className="font-semibold">
                        {wizard.clientDetails.name} ({wizard.clientDetails.phone})
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 block mb-1">Selected Services:</span>
                      <ul className="space-y-1">
                        {selectedServices.map((s) => (
                          <li key={s.id} className="flex justify-between font-medium">
                            <span>• {s.name} ({s.duration} mins)</span>
                            <span>{formatCurrency(s.price)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Buttons */}
              <div className="pt-6 border-t border-[#B8935A]/20 flex items-center justify-between">
                {wizard.step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="px-5 py-2.5 border border-stone-300 dark:border-stone-700 hover:border-[#B8935A] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                <button
                  id="wizard-continue-btn"
                  onClick={handleNext}
                  className="px-8 py-3 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all flex items-center gap-2"
                >
                  <span>{wizard.step === 5 ? "Confirm Appointment" : "Continue"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Sticky Summary Sidebar */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="bg-white dark:bg-[#1A1412] p-6 rounded-3xl border border-[#B8935A]/30 shadow-lg space-y-5">
                <div className="flex items-center justify-between border-b border-[#B8935A]/20 pb-4">
                  <h3 className="font-serif text-xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                    Appointment Summary
                  </h3>
                  <span className="text-[10px] uppercase font-semibold text-[#B8935A] bg-[#B8935A]/10 px-2 py-0.5 rounded-full">
                    Step {wizard.step} of 5
                  </span>
                </div>

                {/* Selected Services in Sidebar */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                    Services ({selectedServices.length})
                  </span>
                  {selectedServices.length === 0 ? (
                    <p className="text-xs text-stone-400 italic">No service selected yet</p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {selectedServices.map((s) => (
                        <div key={s.id} className="flex justify-between text-xs">
                          <span className="text-stone-700 dark:text-stone-300 font-medium truncate pr-2">
                            {s.name}
                          </span>
                          <span className="text-[#B8935A] font-semibold shrink-0">
                            {formatCurrency(s.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stylist & Schedule details */}
                <div className="pt-3 border-t border-[#B8935A]/15 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Stylist:</span>
                    <span className="font-medium">
                      {selectedStylistObj ? selectedStylistObj.name : "Any Available"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Date:</span>
                    <span className="font-medium">{wizard.selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Slot:</span>
                    <span className="font-medium">{wizard.selectedTimeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Duration:</span>
                    <span className="font-medium">{formatDuration(totalDuration)}</span>
                  </div>
                </div>

                {/* Totals */}
                <div className="pt-4 border-t border-[#B8935A]/20 flex justify-between items-baseline">
                  <span className="text-sm font-semibold">Total Estimated</span>
                  <span className="font-serif text-2xl font-bold text-[#B8935A]">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-white/5 rounded-xl text-[11px] text-stone-500 text-center">
                  Payment is made at the studio chair after service completion.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
