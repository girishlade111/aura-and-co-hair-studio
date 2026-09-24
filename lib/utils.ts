import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig, BusinessHours } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0 && mins > 0) return `${hours} hr ${mins} min`;
  if (hours > 0) return `${hours} hr${hours > 1 ? "s" : ""}`;
  return `${mins} mins`;
}

export interface SalonStatus {
  isOpen: boolean;
  statusText: string;
  badgeClass: string;
  detail: string;
}

export function getSalonOpenStatus(mockNow?: Date): SalonStatus {
  const now = mockNow || new Date();
  const dayOfWeek = now.getDay(); // 0 = Sun, 1 = Mon ...
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeNumber = currentHour * 60 + currentMinute;

  const todayConfig = siteConfig.hours.find((h) => h.dayIndex === dayOfWeek);

  if (!todayConfig || !todayConfig.isOpen) {
    // Check next open day
    return {
      isOpen: false,
      statusText: "Closed Today",
      badgeClass: "bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300",
      detail: "Opens Tue at 10:00 AM",
    };
  }

  const [openHour, openMin] = todayConfig.open.split(":").map(Number);
  const [closeHour, closeMin] = todayConfig.close.split(":").map(Number);
  const openTimeNumber = openHour * 60 + openMin;
  const closeTimeNumber = closeHour * 60 + closeMin;

  if (currentTimeNumber >= openTimeNumber && currentTimeNumber < closeTimeNumber) {
    const formattedClose = closeHour > 12 ? `${closeHour - 12}:${closeMin ? "30" : "00"} PM` : `${closeHour}:00 AM`;
    return {
      isOpen: true,
      statusText: "Open Now",
      badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300",
      detail: `Closes at ${formattedClose}`,
    };
  } else if (currentTimeNumber < openTimeNumber) {
    const formattedOpen = `${openHour}:00 AM`;
    return {
      isOpen: false,
      statusText: "Closed",
      badgeClass: "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300",
      detail: `Opens today at ${formattedOpen}`,
    };
  } else {
    return {
      isOpen: false,
      statusText: "Closed for the day",
      badgeClass: "bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300",
      detail: "Reopens tomorrow at 10:00 AM",
    };
  }
}

export function generateICS(params: {
  title: string;
  description: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationMinutes: number;
}): string {
  const [year, month, day] = params.startDate.split("-").map(Number);
  const [hour, minute] = params.startTime.split(":").map(Number);

  const start = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const end = new Date(start.getTime() + params.durationMinutes * 60000);

  const formatDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Aura and Co Hair Studio//Appointment//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${params.title}`,
    `DESCRIPTION:${params.description}`,
    `LOCATION:${params.location}`,
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `STATUS:CONFIRMED`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
}
