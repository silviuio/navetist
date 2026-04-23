"use client";

import { useState } from "react";
import { Calculator, Minus, Plus, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Fare, TripFare } from "../types/fares";
import upcomingChanges from "../data/upcoming-changes.json";

type SingleProps = {
  fare: Fare;
  tripFare: TripFare;
};

type IntegratedProps = {
  fare: Fare;
  stbTripFare: TripFare;
  metroTripFare: TripFare;
};

type Props = SingleProps | IntegratedProps;

function isIntegrated(props: Props): props is IntegratedProps {
  return "stbTripFare" in props;
}

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
    return "perioadă";
  const { value, unit } = fare.duration;
  if (unit === "months") return "lună";
  if (unit === "days") return value === 7 ? "săptămână" : `${value} zile`;
  if (unit === "hours") return `${value}h`;
  return "perioadă";
}

function getPendingPrice(fareId: string): number | undefined {
  return upcomingChanges.changes.find((c) => c.fareId === fareId)?.newPrice;
}

function fmt(n: number): string {
  return n.toLocaleString("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

type CounterProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
};

function Counter({ label, value, onChange }: CounterProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-zinc-300">{label}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-7 h-7 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 transition-colors"
          aria-label={`Scade ${label}`}
        >
          <Minus size={13} />
        </button>
        <span className="w-10 text-center text-sm font-semibold text-white tabular-nums">
          {value}
        </span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-7 h-7 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 transition-colors"
          aria-label={`Crește ${label}`}
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}

export default function BreakevenCalculator(props: Props) {
  const integrated = isIntegrated(props);
  const { fare } = props;

  const [open, setOpen] = useState(false);
  const [useFuturePrices, setUseFuturePrices] = useState(false);
  const [singleTrips, setSingleTrips] = useState(30);
  const [stbTrips, setStbTrips] = useState(20);
  const [metroTrips, setMetroTrips] = useState(10);

  // ── Pending prices ────────────────────────────────────────
  const farePending = getPendingPrice(fare.id);
  const singleTripPending = integrated
    ? undefined
    : getPendingPrice(props.tripFare.id);
  const stbTripPending = integrated
    ? getPendingPrice(props.stbTripFare.id)
    : undefined;
  const metroTripPending = integrated
    ? getPendingPrice(props.metroTripFare.id)
    : undefined;

  const hasPending =
    farePending !== undefined ||
    singleTripPending !== undefined ||
    stbTripPending !== undefined ||
    metroTripPending !== undefined;

  // ── Effective prices (respecting toggle) ──────────────────
  const effectiveFarePrice =
    useFuturePrices && farePending !== undefined ? farePending : fare.price;

  const effectiveSinglePrice = integrated
    ? 0
    : useFuturePrices && singleTripPending !== undefined
      ? singleTripPending
      : props.tripFare.price;

  const effectiveStbPrice = !integrated
    ? 0
    : useFuturePrices && stbTripPending !== undefined
      ? stbTripPending
      : props.stbTripFare.price;

  const effectiveMetroPrice = !integrated
    ? 0
    : useFuturePrices && metroTripPending !== undefined
      ? metroTripPending
      : props.metroTripFare.price;

  // ── Validare după ce am calculat prețurile (earlier return pentru non-sub) ──
  if (fare.category !== "subscription" && fare.category !== "time-pass")
    return null;

  const months = durationInMonths(fare);
  if (!months) return null;

  const period = periodLabel(fare);
  const isMultiMonth = months > 1;
  const displayUnit = isMultiMonth ? "lună" : period;
  const basePrice = isMultiMonth ? effectiveFarePrice / months : effectiveFarePrice;

  // ── Breakeven (doar pentru single-operator) ───────────────
  const breakeven = !integrated
    ? Math.ceil(basePrice / effectiveSinglePrice)
    : null;

  // ── Calculul costului curent pe baza input-ului ───────────
  const currentCost = integrated
    ? stbTrips * effectiveStbPrice + metroTrips * effectiveMetroPrice
    : singleTrips * effectiveSinglePrice;

  const savings = currentCost - basePrice;
  const worthIt = savings > 0;

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/15 text-white px-3 py-1.5 rounded-full transition-colors w-fit"
      >
        <Calculator size={12} />
        <span>Când merită?</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white text-lg">
              {fare.name}
            </DialogTitle>
            {breakeven !== null && (
              <p
                className={`text-sm font-medium mt-1 ${useFuturePrices ? "text-orange-400" : "text-emerald-400"}`}
              >
                Merită de la {breakeven} călătorii/{displayUnit}
              </p>
            )}
          </DialogHeader>

          {hasPending && (
            <div className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/60 rounded-lg p-2.5 text-xs">
              <span className="text-zinc-300">
                Calculează cu prețurile de la 1 mai 2026
              </span>
              <button
                onClick={() => setUseFuturePrices(!useFuturePrices)}
                role="switch"
                aria-checked={useFuturePrices}
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

          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">
              Câte călătorii faci pe {displayUnit}?
            </p>
            <div className="space-y-2">
              {integrated ? (
                <>
                  <Counter
                    label="STB"
                    value={stbTrips}
                    onChange={setStbTrips}
                  />
                  <Counter
                    label="Metrorex"
                    value={metroTrips}
                    onChange={setMetroTrips}
                  />
                </>
              ) : (
                <Counter
                  label="Călătorii"
                  value={singleTrips}
                  onChange={setSingleTrips}
                />
              )}
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-3 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Fără abonament (bilete)</span>
              <span className="text-zinc-200 font-medium tabular-nums">
                {fmt(currentCost)} RON
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">
                Cu abonament{isMultiMonth ? " (per lună)" : ""}
              </span>
              <span className="text-zinc-200 font-medium tabular-nums">
                {fmt(basePrice)} RON
              </span>
            </div>
            <p
              className={`text-xs pt-1 ${useFuturePrices ? "text-orange-400/80" : "text-zinc-500"}`}
            >
              {integrated
                ? `Bilete: STB ${fmt(effectiveStbPrice)} RON · Metrorex ${fmt(effectiveMetroPrice)} RON`
                : `Bilet: ${fmt(effectiveSinglePrice)} RON/călătorie`}
            </p>
          </div>

          <div
            className={`border rounded-lg p-3 flex items-start gap-2 ${
              worthIt
                ? "bg-emerald-500/10 border-emerald-500/30"
                : "bg-zinc-800/60 border-zinc-700/60"
            }`}
          >
            {worthIt ? (
              <>
                <Check
                  size={18}
                  className="text-emerald-400 shrink-0 mt-0.5"
                />
                <div className="text-sm">
                  <p className="text-emerald-300 font-semibold">
                    Economisești {fmt(savings)} RON/{displayUnit}
                  </p>
                  <p className="text-emerald-200/70 text-xs mt-0.5">
                    Abonamentul e mai avantajos la acest nivel de utilizare.
                  </p>
                </div>
              </>
            ) : (
              <>
                <X size={18} className="text-zinc-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-zinc-200 font-semibold">
                    Mai ai {fmt(Math.abs(savings))} RON până să merite
                  </p>
                  <p className="text-zinc-400 text-xs mt-0.5">
                    La acest nivel, biletele individuale sunt mai ieftine.
                  </p>
                </div>
              </>
            )}
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
