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

export default function IntegratedBreakevenDialog({
  fare,
  stbSingleTripFare,
  metroSingleTripFare,
}: Props) {
  const [open, setOpen] = useState(false);
  const [stbTrips, setStbTrips] = useState(20);
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
  const worthIt = savings > 0;

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
            <DialogTitle className="text-white text-lg">{fare.name}</DialogTitle>
            <p className="text-sm text-zinc-400 mt-1">
              Câte călătorii faci pe {displayUnit}?
            </p>
          </DialogHeader>

          <div className="space-y-3">
            <Counter label="STB" value={stbTrips} onChange={setStbTrips} />
            <Counter label="Metrorex" value={metroTrips} onChange={setMetroTrips} />
          </div>

          <div className="border-t border-zinc-800 pt-3 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Fără abonament (bilete)</span>
              <span className="text-zinc-200 font-medium tabular-nums">
                {currentCost} RON
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">
                Cu abonament{isMultiMonth ? " (per lună)" : ""}
              </span>
              <span className="text-zinc-200 font-medium tabular-nums">
                {basePrice.toFixed(2).replace(/\.00$/, "")} RON
              </span>
            </div>
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
                <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-emerald-300 font-semibold">
                    Economisești {savings.toFixed(2).replace(/\.00$/, "")} RON/{displayUnit}
                  </p>
                  <p className="text-emerald-200/70 text-xs mt-0.5">
                    Abonamentul integrat e mai avantajos la acest nivel de utilizare.
                  </p>
                </div>
              </>
            ) : (
              <>
                <X size={18} className="text-zinc-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-zinc-200 font-semibold">
                    Mai ai {Math.abs(savings).toFixed(2).replace(/\.00$/, "")} RON până să merite
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
              Calculat asumând utilizare constantă pe toată perioada ({months} luni).
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
