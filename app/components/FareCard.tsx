import { IdCard, Clock, ArrowLeftRight, Timer } from "lucide-react";
import { pricePerTrip, getSingleTripFare } from "../lib/fares";
import type { Fare, Operator } from "../types/fares";
import BreakevenDialog from "./BreakevenDialog";
import IntegratedBreakevenDialog from "./IntegratedBreakevenDialog";

const unitRo = (value: number, unit: string): string => {
  const singular: Record<string, string> = {
    hours: "oră",
    days: "zi",
    weeks: "săptămână",
    months: "lună",
    years: "an",
  };
  const plural: Record<string, string> = {
    hours: "ore",
    days: "zile",
    weeks: "săptămâni",
    months: "luni",
    years: "ani",
  };
  return value === 1 ? (singular[unit] ?? unit) : (plural[unit] ?? unit);
};

const operatorBg: Record<Operator, string> = {
  stb: "bg-emerald-900",
  metrorex: "bg-sky-950",
  integrated: "bg-slate-700",
};

type PendingChange = { newPrice: number };

type Props = {
  fare: Fare;
  pendingChange?: PendingChange;
};

const FareCard = ({ fare, pendingChange }: Props) => {
  const showBreakeven =
    (fare.operator === "stb" || fare.operator === "metrorex") &&
    (fare.category === "subscription" || fare.category === "time-pass");
  const singleTripFare = showBreakeven ? getSingleTripFare(fare.operator) : undefined;
  const showIntegratedBreakeven =
    fare.operator === "integrated" &&
    (fare.category === "subscription" || fare.category === "time-pass");
  const stbSingleTripFare = showIntegratedBreakeven
    ? getSingleTripFare("stb")
    : undefined;
  const metroSingleTripFare = showIntegratedBreakeven
    ? getSingleTripFare("metrorex")
    : undefined;

  return (
    <div
      className={`${operatorBg[fare.operator]} text-white rounded-lg flex h-full ${pendingChange ? "ring-1 ring-orange-500/60" : ""}`}
    >
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="font-semibold text-base leading-snug mb-2">
          {fare.name}
        </h3>

        <div className="text-sm text-gray-300 space-y-1">
          {fare.category === "trip" && (
            <>
              <p>{+pricePerTrip(fare).toFixed(2)} RON / călătorie</p>
              {fare.validityMinutes && (
                <p className="flex items-center gap-1">
                  <Clock size={13} className="shrink-0" />
                  {fare.validityMinutes} min
                </p>
              )}
              {fare.transferable && (
                <p className="flex items-center gap-1">
                  <ArrowLeftRight size={13} className="shrink-0" />
                  Transfer inclus
                </p>
              )}
            </>
          )}

          {fare.category === "time-pass" && (
            <>
              <p className="flex items-center gap-1">
                <Timer size={13} className="shrink-0" />
                Activare la prima validare
              </p>
              {fare.activationWindowMinutes && (
                <p className="flex items-center gap-1">
                  <Clock size={13} className="shrink-0" />
                  Temporizare: {fare.activationWindowMinutes} min
                </p>
              )}
            </>
          )}

          {fare.category === "subscription" && (
            <>
              <p className="flex items-center gap-1">
                <Clock size={13} className="shrink-0" />
                {fare.duration.value} {unitRo(fare.duration.value, fare.duration.unit)}
              </p>
              {fare.nominalRequired && (
                <p className="flex items-center gap-1">
                  <IdCard size={13} className="shrink-0" />
                  Nominal
                </p>
              )}
            </>
          )}
        </div>

        {showBreakeven && singleTripFare && (
          <div className="mt-auto pt-3">
            <BreakevenDialog fare={fare} singleTripFare={singleTripFare} />
          </div>
        )}

        {showIntegratedBreakeven && stbSingleTripFare && metroSingleTripFare && (
          <div className="mt-auto pt-3">
            <IntegratedBreakevenDialog
              fare={fare}
              stbSingleTripFare={stbSingleTripFare}
              metroSingleTripFare={metroSingleTripFare}
            />
          </div>
        )}
      </div>

      <div className="border-l border-white/10 flex flex-col items-center justify-center px-4 w-24 shrink-0 gap-1">
        <span
          className={`text-lg font-bold whitespace-nowrap ${pendingChange ? "line-through text-white/40 text-sm" : ""}`}
        >
          {fare.price} RON
        </span>
        {pendingChange && (
          <span className="text-orange-400 font-bold text-base whitespace-nowrap">
            {pendingChange.newPrice} RON
          </span>
        )}
      </div>
    </div>
  );
};

export default FareCard;
