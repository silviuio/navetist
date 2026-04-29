import upcomingChanges from "../data/upcoming-changes.json";

/**
 * Data efectivă a următoarei majorări de tarife.
 * Source of truth: primul anunț din `upcoming-changes.json`.
 *
 * Asumăm că toate anunțurile curente au aceeași dată efectivă.
 * Dacă în viitor avem date diferite per operator, înlocuiește cu un getter
 * per operator (`getEffectiveDate(operator)`).
 */
export const NEXT_PRICE_CHANGE_DATE: string =
  upcomingChanges.announcements[0]?.effectiveDate ?? "";

/**
 * Formatează o dată ISO ca dată completă în română.
 * Ex: "2026-07-01" → "1 iulie 2026"
 */
export function formatDateRoLong(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formatează o dată ISO ca lună + an în română.
 * Ex: "2026-07-01" → "iulie 2026"
 */
export function formatDateRoMonthYear(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("ro-RO", {
    month: "long",
    year: "numeric",
  });
}

/**
 * Formatează o dată ISO ca lună scurtă + an în română.
 * Ex: "2026-07-01" → "iul. 2026"
 */
export function formatDateRoShortMonthYear(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("ro-RO", {
    month: "short",
    year: "numeric",
  });
}
