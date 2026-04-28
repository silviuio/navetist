import { getSingleTripFare, pricePerTrip } from "@/app/lib/fares";
import { Fare, Operator } from "@/app/types/fares";
import {
  IdCard,
  Clock,
  ArrowLeftRight,
  CalendarDays,
  ScanLine,
  Hourglass,
} from "lucide-react";
import BreakevenCalculator from "../BreakevenCalculator";

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
  const isSubscription =
    fare.category === "subscription" || fare.category === "time-pass";
  const singleOperatorTripFare =
    isSubscription && (fare.operator === "stb" || fare.operator === "metrorex")
      ? getSingleTripFare(fare.operator)
      : undefined;
  const isIntegratedSub = isSubscription && fare.operator === "integrated";
  const stbSingleTripFare = isIntegratedSub
    ? getSingleTripFare("stb")
    : undefined;
  const metroSingleTripFare = isIntegratedSub
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

        <div className="text-xs text-gray-300 space-y-1">
          {fare.category === "trip" && (
            <>
              {fare.validityMinutes && (
                <p className="flex items-center gap-1">
                  <Clock size={12} className="shrink-0" />
                  {fare.validityMinutes} min
                </p>
              )}
              {fare.transferable && (
                <p className="flex items-center gap-1">
                  <ArrowLeftRight size={12} className="shrink-0" />
                  Transfer inclus
                </p>
              )}
            </>
          )}

          {fare.category === "time-pass" && (
            <>
              <p className="flex items-center gap-1">
                <CalendarDays size={12} className="shrink-0" />
                {fare.duration.value}{" "}
                {unitRo(fare.duration.value, fare.duration.unit)}
              </p>

              {fare.activationWindowMinutes && (
                <p className="flex items-center gap-1">
                  <Hourglass size={12} className="shrink-0" />
                  {fare.activationWindowMinutes} min
                </p>
              )}

              {fare.activationRequired && (
                <p className="flex items-center gap-1">
                  <ScanLine size={12} className="shrink-0" />
                  Activare
                </p>
              )}
            </>
          )}

          {fare.category === "subscription" && (
            <>
              <p className="flex items-center gap-1">
                <CalendarDays size={12} className="shrink-0" />
                {fare.duration.value}{" "}
                {unitRo(fare.duration.value, fare.duration.unit)}
              </p>
              {fare.activationWindowMinutes && (
                <p className="flex items-center gap-1">
                  <Hourglass size={12} className="shrink-0" />
                  {fare.activationWindowMinutes} min
                </p>
              )}
              {fare.nominalRequired && (
                <p className="flex items-center gap-1">
                  <IdCard size={12} className="shrink-0" />
                  Nominal
                </p>
              )}
            </>
          )}
        </div>

        {singleOperatorTripFare && (
          <div className="mt-auto pt-3">
            <BreakevenCalculator
              fare={fare}
              tripFare={singleOperatorTripFare}
            />
          </div>
        )}

        {isIntegratedSub && stbSingleTripFare && metroSingleTripFare && (
          <div className="mt-auto pt-3">
            <BreakevenCalculator
              fare={fare}
              stbTripFare={stbSingleTripFare}
              metroTripFare={metroSingleTripFare}
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
