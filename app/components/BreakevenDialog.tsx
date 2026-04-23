"use client";

import { useState } from "react";
import { Calculator, TrendingDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Fare, TripFare } from "../types/fares";
import upcomingChanges from "../data/upcoming-changes.json";

type Props = {
  fare: Fare;
  singleTripFare: TripFare;
};

// Normalizează durata abonamentului în luni
function durationInMonths(fare: Fare): number | null {
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

function periodLabel(fare: Fare): string {
  if (fare.category !== "subscription" && fare.category !== "time-pass")
    return "";
  const { value, unit } = fare.duration;
  if (unit === "months") return "lună";
  if (unit === "days") return value === 7 ? "săptămână" : `${value} zile`;
  if (unit === "hours") return `${value}h`;
  return "perioadă";
}

function getPendingPrice(fareId: string): number | undefined {
  return upcomingChanges.changes.find((c) => c.fareId === fareId)?.newPrice;
}

export default function BreakevenDialog({ fare, singleTripFare }: Props) {
  const [open, setOpen] = useState(false);
  const [useFuturePrices, setUseFuturePrices] = useState(false);

  if (fare.category !== "subscription" && fare.category !== "time-pass")
    return null;

  const months = durationInMonths(fare);
  if (!months) return null;

  // Prețuri viitoare (dacă există pentru acest fare sau pentru bilet)
  const farePendingPrice = getPendingPrice(fare.id);
  const tripPendingPrice = getPendingPrice(singleTripFare.id);
  const hasPendingChanges =
    farePendingPrice !== undefined || tripPendingPrice !== undefined;

  // Prețul efectiv pe care îl folosim în calcul
  const effectiveFarePrice =
    useFuturePrices && farePendingPrice !== undefined
      ? farePendingPrice
      : fare.price;
  const effectiveSingleTripPrice =
    useFuturePrices && tripPendingPrice !== undefined
      ? tripPendingPrice
      : singleTripFare.price;

  const pricePerMonth = effectiveFarePrice / months;
  const period = periodLabel(fare);
  const isMultiMonth = months > 1;
  const displayUnit = isMultiMonth ? "lună" : period;
  const basePrice = isMultiMonth ? pricePerMonth : effectiveFarePrice;

  const breakeven = Math.ceil(basePrice / effectiveSingleTripPrice);

  const tripCounts = [
    Math.max(1, Math.floor(breakeven * 0.6)),
    breakeven,
    Math.ceil(breakeven * 1.5),
    Math.ceil(breakeven * 2.5),
  ].filter((n, i, arr) => arr.indexOf(n) === i);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:border-white/25 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <Calculator size={13} />
        <span>Când merită?</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white text-lg">
              {fare.name}
            </DialogTitle>
            <p className="text-sm text-zinc-400 mt-1">
              Comparație cu biletul de {effectiveSingleTripPrice} RON /
              călătorie
            </p>
          </DialogHeader>

          {hasPendingChanges && (
            <div className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/60 rounded-lg p-2.5 text-xs">
              <span className="text-zinc-300">
                Calculează cu prețurile de la 1 mai 2026
              </span>
              <button
                onClick={() => setUseFuturePrices(!useFuturePrices)}
                className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors ${
                  useFuturePrices ? "bg-orange-500" : "bg-zinc-600"
                }`}
                aria-label="Toggle prețuri viitoare"
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    useFuturePrices ? "translate-x-4" : "translate-x-0.5"
                  } self-center`}
                />
              </button>
            </div>
          )}

          <div
            className={`border rounded-lg p-3 flex items-start gap-2 ${
              useFuturePrices
                ? "bg-orange-500/10 border-orange-500/30"
                : "bg-emerald-500/10 border-emerald-500/30"
            }`}
          >
            <TrendingDown
              size={18}
              className={`shrink-0 mt-0.5 ${useFuturePrices ? "text-orange-400" : "text-emerald-400"}`}
            />
            <div className="text-sm">
              <p
                className={`font-semibold ${useFuturePrices ? "text-orange-300" : "text-emerald-300"}`}
              >
                Merită de la {breakeven} curse/{displayUnit}
              </p>
              <p
                className={`text-xs mt-0.5 ${useFuturePrices ? "text-orange-200/70" : "text-emerald-200/70"}`}
              >
                Sub acest prag, biletele individuale sunt mai ieftine.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">
              Cost per călătorie, în funcție de utilizare
            </p>
            <div className="space-y-1">
              {tripCounts.map((n) => {
                const perTrip = basePrice / n;
                const isBreakeven = n === breakeven;
                const isCheaper = perTrip < effectiveSingleTripPrice;
                const highlightBg = useFuturePrices
                  ? "bg-orange-500/10"
                  : "bg-emerald-500/10";
                const cheaperText = useFuturePrices
                  ? "text-orange-400"
                  : "text-emerald-400";
                return (
                  <div
                    key={n}
                    className={`flex items-center justify-between py-2 px-3 rounded ${
                      isBreakeven ? highlightBg : ""
                    }`}
                  >
                    <span className="text-sm text-zinc-300">
                      {n} curse/{displayUnit}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        isCheaper ? cheaperText : "text-zinc-500"
                      }`}
                    >
                      {perTrip.toFixed(2)} RON/cursă
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {isMultiMonth && (
            <p className="text-xs text-zinc-500">
              Calculat asumând utilizare constantă pe toată perioada ({months}{" "}
              luni).
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
