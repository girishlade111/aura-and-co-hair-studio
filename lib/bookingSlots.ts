import { siteConfig } from "@/config/site";

export interface TimeSlot {
  time: string; // "10:30"
  label: string; // "10:30 AM"
  available: boolean;
  reason?: string;
}

export function getAvailableSlots(dateString: string, stylistId: string): TimeSlot[] {
  const [year, month, day] = dateString.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  const dayOfWeek = dateObj.getDay();

  const dayConfig = siteConfig.hours.find((h) => h.dayIndex === dayOfWeek);

  // Closed day (e.g. Monday)
  if (!dayConfig || !dayConfig.isOpen) {
    return [];
  }

  const slots: TimeSlot[] = [];
  const [startHour] = dayConfig.open.split(":").map(Number);
  const [endHour] = dayConfig.close.split(":").map(Number);

  // Generate slots every 45 or 30 minutes from open to close - 60 min
  for (let hour = startHour; hour < endHour; hour++) {
    for (const minute of [0, 30]) {
      if (hour === endHour - 1 && minute > 0) continue; // Don't allow bookings too close to closing

      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour;
      const label = `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;

      // Deterministic pseudo-booked slots based on date + hour + stylist for realistic availability
      const hashVal = (day * 13 + hour * 7 + minute * 3 + (stylistId.charCodeAt(stylistId.length - 1) || 5)) % 10;
      const isBooked = hashVal === 1 || hashVal === 4 || hashVal === 8;

      slots.push({
        time: timeString,
        label,
        available: !isBooked,
        reason: isBooked ? "Reserved" : undefined,
      });
    }
  }

  return slots;
}
