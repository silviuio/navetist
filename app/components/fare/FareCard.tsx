import { getSingleTripFare } from "@/app/lib/fares";
import type { Duration, Fare, Operator } from "@/app/types/fares";
import {
  IdCard,
  Clock,
  ArrowLeftRight,
  CalendarDays,
  ScanLine,
  Hourglass,
  type LucideIcon,
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

type FareDetail = {
  id: string;
  icon: LucideIcon;
  label: string;
};

const durationLabel = (duration: Duration) =>
  `${duration.value} ${unitRo(duration.value, duration.unit)}`;

const getFareDetails = (fare: Fare): FareDetail[] => {
  const details: FareDetail[] = [];

  if (fare.category === "trip") {
    if (fare.validityMinutes) {
      details.push({
        id: "validity",
        icon: Clock,
        label: `${fare.validityMinutes} min`,
      });
    }

    if (fare.transferable) {
      details.push({
        id: "transfer",
        icon: ArrowLeftRight,
        label: "Transfer",
      });
    }
  }

  if (fare.category === "time-pass" || fare.category === "subscription") {
    details.push({
      id: "duration",
      icon: CalendarDays,
      label: durationLabel(fare.duration),
    });

    if (fare.activationWindowMinutes) {
      details.push({
        id: "activation-window",
        icon: Hourglass,
        label: `${fare.activationWindowMinutes} min`,
      });
    }

    if (fare.category === "time-pass" && fare.activationRequired) {
      details.push({
        id: "activation",
        icon: ScanLine,
        label: "Activare",
      });
    }

    if (fare.category === "subscription" && fare.nominalRequired) {
      details.push({
        id: "nominal",
        icon: IdCard,
        label: "Nominal",
      });
    }
  }

  return details;
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
  const details = getFareDetails(fare);

  return (
    <div
      className={`${operatorBg[fare.operator]} text-white rounded-lg flex h-full ${pendingChange ? "ring-1 ring-orange-500/60" : ""}`}
    >
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="font-semibold text-base leading-snug mb-5">
          {fare.name}
        </h3>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-gray-300">
          {details.map((detail) => {
            const Icon = detail.icon;

            return (
              <p
                key={detail.id}
                className="flex min-w-0 items-center gap-1 leading-snug"
              >
                <Icon size={12} className="shrink-0" />
                <span className="min-w-0">{detail.label}</span>
              </p>
            );
          })}
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
