"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Fare, TripFare } from "../../types/fares";
import {
  durationInMonths,
  periodLabel,
  getPendingPrice,
  fmt,
} from "./utils";
import Counter from "./Counter";
import FuturePricesToggle from "./FuturePricesToggle";
import CostBreakdown from "./CostBreakdown";
import Verdict from "./Verdict";

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

  // ── Early returns (după hooks) ────────────────────────────
  if (fare.category !== "subscription" && fare.category !== "time-pass")
    return null;

  const months = durationInMonths(fare);
  if (!months) return null;

  // ── Derivate ──────────────────────────────────────────────
  const period = periodLabel(fare);
  const isMultiMonth = months > 1;
  const displayUnit = isMultiMonth ? "lună" : period;
  const basePrice = isMultiMonth
    ? effectiveFarePrice / months
    : effectiveFarePrice;

  const breakeven = !integrated
    ? Math.ceil(basePrice / effectiveSinglePrice)
    : null;

  // La deschiderea dialog-ului, counter-ele pornesc la prag:
  // - single-operator: exact breakeven
  // - integrated: split 50/50 STB/Metrorex astfel încât costul total ≈ basePrice
  const integratedSplit =
    integrated && effectiveStbPrice + effectiveMetroPrice > 0
      ? Math.max(1, Math.round(basePrice / (effectiveStbPrice + effectiveMetroPrice)))
      : null;

  function openDialog() {
    if (breakeven !== null) setSingleTrips(breakeven);
    if (integratedSplit !== null) {
      setStbTrips(integratedSplit);
      setMetroTrips(integratedSplit);
    }
    setOpen(true);
  }

  const currentCost = integrated
    ? stbTrips * effectiveStbPrice + metroTrips * effectiveMetroPrice
    : singleTrips * effectiveSinglePrice;

  const savings = currentCost - basePrice;

  const pricesUsedLabel = integrated
    ? `Bilete: STB ${fmt(effectiveStbPrice)} RON · Metrorex ${fmt(effectiveMetroPrice)} RON`
    : `Bilet: ${fmt(effectiveSinglePrice)} RON/călătorie`;

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openDialog();
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
            <FuturePricesToggle
              value={useFuturePrices}
              onChange={setUseFuturePrices}
            />
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

          <CostBreakdown
            currentCost={currentCost}
            basePrice={basePrice}
            isMultiMonth={isMultiMonth}
            pricesUsedLabel={pricesUsedLabel}
            useFuturePrices={useFuturePrices}
          />

          <Verdict savings={savings} displayUnit={displayUnit} />

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
