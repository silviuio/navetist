import type { Fare } from "../../types/fares";
import { getPendingPrice as getAnnouncedPrice } from "../../lib/upcomingChanges";

export function durationInMonths(fare: Fare): number | null {
  if (fare.category !== "subscription" && fare.category !== "time-pass")
    return null;
  const { value, unit } = fare.duration;
  switch (unit) {
    case "months":
      return value;
    case "days":
      return value / 30;
    case "hours":
      return value / (24 * 30);
    default:
      return null;
  }
}

export function periodLabel(fare: Fare): string {
  if (fare.category !== "subscription" && fare.category !== "time-pass")
    return "perioadă";
  const { value, unit } = fare.duration;
  if (unit === "months") return "lună";
  if (unit === "days") return value === 7 ? "săptămână" : `${value} zile`;
  if (unit === "hours") return `${value}h`;
  return "perioadă";
}

export function getPendingPrice(fareId: string): number | undefined {
  return getAnnouncedPrice(fareId);
}

export function fmt(n: number): string {
  return n.toLocaleString("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
