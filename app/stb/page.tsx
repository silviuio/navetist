import type { Metadata } from "next";
import FareGroup from "../components/FareGroup";
import { getFaresByOperator } from "../lib/fares";

export const metadata: Metadata = {
  title: "Prețuri STB 2026 — Bilete și abonamente transport suprafață București | Navetist",
  description:
    "Tarife actuale STB: bilet 1 călătorie, 2 și 10 călătorii, abonamente 24h, 72h, 7 zile, lunar, 6 luni și 12 luni pentru transportul de suprafață în București și Ilfov.",
};

export default function StbPage() {
  const fares = getFaresByOperator("stb");
  const trips = fares.filter((f) => f.category === "trip");
  const timePasses = fares.filter((f) => f.category === "time-pass");
  const subscriptions = fares.filter((f) => f.category === "subscription");

  return (
    <div>
      <div className="mb-8">
        <span className="text-xs font-semibold bg-emerald-900 text-emerald-100 px-2 py-1 rounded">
          STB
        </span>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-3 mb-1">
          Societatea de Transport București
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl text-sm">
          Transport de suprafață în Regiunea București-Ilfov. Călătoriile sunt valabile
          90 de minute cu transfer gratuit între linii, indiferent de numărul de validări.
        </p>
      </div>

      <div className="space-y-8">
        <FareGroup title="Călătorii" fares={trips} />
        <FareGroup title="Abonamente timp" fares={timePasses} />
        <FareGroup title="Abonamente" fares={subscriptions} />
      </div>
    </div>
  );
}
