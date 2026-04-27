"use client";

import { useRouter } from "next/navigation";
import { Bus, BusFront, TramFront, TrainFrontTunnel } from "lucide-react";
import { getFaresByOperator } from "../lib/fares";
import PriceChangeAlert from "./PriceChangeAlert";

const operators = [
  {
    key: "metrorex" as const,
    href: "/metrorex",
    title: "Tarife Metrorex",
    color: "border-sky-700",
  },
  {
    key: "stb" as const,
    href: "/stb",
    title: "Tarife STB",
    color: "border-emerald-600",
  },
  {
    key: "integrated" as const,
    href: "/integrat",
    title: "Tarife integrate",
    color: "border-slate-500",
  },
];

const ICON_SIZE = 14;
const transportItemClass =
  "flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400";

function OperatorDescription({ operatorKey }: { operatorKey: string }) {
  if (operatorKey === "stb") {
    return (
      <ul className="mb-4 flex flex-wrap gap-x-3 gap-y-1">
        <li className={transportItemClass}>
          <Bus size={ICON_SIZE} className="shrink-0" />
          <span>Autobuz</span>
        </li>
        <li className={transportItemClass}>
          <TramFront size={ICON_SIZE} className="shrink-0" />
          <span>Tramvai</span>
        </li>
        <li className={transportItemClass}>
          <BusFront size={ICON_SIZE} className="shrink-0" />
          <span>Troleibuz</span>
        </li>
      </ul>
    );
  }

  if (operatorKey === "metrorex") {
    return (
      <p className={`mb-4 ${transportItemClass}`}>
        <TrainFrontTunnel size={ICON_SIZE} className="shrink-0" />
        <span>Metrou</span>
      </p>
    );
  }

  // integrated
  return (
    <ul className="mb-4 flex flex-wrap gap-x-3 gap-y-1">
      <li className={transportItemClass}>
        <TrainFrontTunnel size={ICON_SIZE} className="shrink-0" />
        <span>Metrou</span>
      </li>
      <li className={transportItemClass}>
        <Bus size={ICON_SIZE} className="shrink-0" />
        <span>STB</span>
      </li>
    </ul>
  );
}

export default function HomeOperatorCards() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {operators.map((operator) => {
        const fares = getFaresByOperator(operator.key);
        const minPrice = Math.min(...fares.map((f) => f.price));

        return (
          <div
            key={operator.key}
            onClick={() => router.push(operator.href)}
            className={`group flex flex-col bg-white dark:bg-zinc-900 rounded-xl border-t-4 ${operator.color} shadow-sm hover:shadow-md transition-shadow p-5 cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {operator.title}
              </h2>
              <span className="text-gray-400 group-hover:translate-x-1 transition-transform text-lg">
                →
              </span>
            </div>

            <OperatorDescription operatorKey={operator.key} />

            {operator.key === "metrorex" && (
              <div className="mb-3" onClick={(e) => e.stopPropagation()}>
                <PriceChangeAlert />
              </div>
            )}

            <div className="mt-auto flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-zinc-800 pt-3">
              <span>{fares.length} tarife</span>
              <span>·</span>
              <span>de la {minPrice} RON</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
