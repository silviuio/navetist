"use client";

import { useState } from "react";
import { Calculator, Check, Minus, Plus, TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Fare, TripFare } from "../types/fares";

type Props = {
  fare: Fare;
  stbSingleTripFare: TripFare;
  metroSingleTripFare: TripFare;
};

function durationInMonths(fare: Fare): number | null {
  if (fare.category !== "subscription" && fare.category !== "time-pass") return null;
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
  if (fare.category !== "subscription" && fare.category !== "time-pass") return "lună";
  const { value, unit } = fare.duration;
  if (unit === "months") return "lună";
  if (unit === "days") return value === 7 ? "săptămână" : `${value} zile`;
  if (unit === "hours") return `${value}h`;
  return "perioadă";
}

function formatRon(value: number): string {
  return `${value.toLocaleString("ro-RO", {
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  })} RON`;
}

type CounterProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
};

function Counter({ label, value, onChange }: CounterProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-zinc-950/40 border border-zinc-800/80 px-3 py-2">
      <span className="text-sm font-medium text-zinc-200">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-7 h-7 rounded-md bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 flex items-center justify-center text-zinc-300 transition-colors"
          disabled={value === 0}
          aria-label={`Scade ${label}`}
        >
          <Minus size={13} />
        </button>
        <span className="w-9 text-center text-base font-semibold text-white tabular-nums">
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

export default function IntegratedBreakevenDialog({
  fare,
  stbSingleTripFare,
  metroSingleTripFare,
}: Props) {
  const [open, setOpen] = useState(false);
  const [stbTrips, setStbTrips] = useState(15);
  const [metroTrips, setMetroTrips] = useState(10);

  if (fare.category !== "subscription" && fare.category !== "time-pass") return null;

  const months = durationInMonths(fare);
  if (!months) return null;

  const period = periodLabel(fare);
  const isMultiMonth = months > 1;
  const displayUnit = isMultiMonth ? "lună" : period;
  const basePrice = isMultiMonth ? fare.price / months : fare.price;

  const currentCost =
    stbTrips * stbSingleTripFare.price + metroTrips * metroSingleTripFare.price;
  const savings = currentCost - basePrice;
  const worthIt = savings >= 0;
  const remaining = Math.max(0, basePrice - currentCost);
  const resultLabel =
    savings === 0
      ? "Ești exact la pragul de rentabilitate"
      : `Economisești ${formatRon(savings)}/${displayUnit}`;

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors"
      >
        <Calculator size={12} />
        <span>De când merită?</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-w-sm">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <DialogTitle className="text-white text-lg">
                {fare.name}
              </DialogTitle>
              <span className="text-lg font-bold text-white tabular-nums whitespace-nowrap">
                {formatRon(basePrice)}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mt-1">
              Pentru integrat, rezultatul depinde de mixul STB/Metrorex.
            </p>
          </DialogHeader>

          <div className="space-y-2">
            <p className="text-xs text-zinc-500 uppercase tracking-wide">
              Câte călătorii faci pe {displayUnit}?
            </p>
            <Counter label="STB" value={stbTrips} onChange={setStbTrips} />
            <Counter label="Metrorex" value={metroTrips} onChange={setMetroTrips} />
          </div>

          <div className="border-t border-zinc-800 pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Fără abonament (bilete)</span>
              <span className="text-zinc-200 font-medium tabular-nums">
                {formatRon(currentCost)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">
                Cu abonament{isMultiMonth ? " (per lună)" : ""}
              </span>
              <span className="text-zinc-200 font-medium tabular-nums">
                {formatRon(basePrice)}
              </span>
            </div>
          </div>

          <div
            className={`border rounded-lg p-3 flex items-start gap-2 ${
              worthIt
                ? "bg-emerald-500/10 border-emerald-500/30"
                : "bg-amber-500/10 border-amber-500/30"
            }`}
          >
            {worthIt ? (
              <>
                <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-emerald-300 font-semibold">
                    {resultLabel}
                  </p>
                  <p className="text-emerald-200/70 text-xs mt-0.5">
                    Abonamentul integrat e mai avantajos la acest nivel de utilizare.
                  </p>
                </div>
              </>
            ) : (
              <>
                <TriangleAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-amber-200 font-semibold">
                    Mai ai {formatRon(remaining)} până să merite
                  </p>
                  <p className="text-amber-100/70 text-xs mt-0.5">
                    La acest nivel, biletele individuale sunt mai ieftine.
                  </p>
                </div>
              </>
            )}
          </div>

          {isMultiMonth && (
            <p className="text-xs text-zinc-500">
              Calculat asumând utilizare constantă pe toată perioada ({months} luni).
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
