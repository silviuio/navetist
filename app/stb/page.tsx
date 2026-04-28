import type { Metadata } from "next";
import { getFaresByOperator } from "../lib/fares";
import FareGroup from "../components/fare/FareGroup";

export const metadata: Metadata = {
  title:
    "Prețuri STB 2026 — Bilete și abonamente transport suprafață București | Navetist",
  description:
    "Tarife actuale STB: bilet 1 călătorie, 2 și 10 călătorii, abonamente 24h, 72h, 7 zile, lunar, 6 luni și 12 luni pentru transportul de suprafață în București și Ilfov.",
};

export default function StbPage() {
  const fares = getFaresByOperator("stb");
  const trips = fares.filter((f) => f.category === "trip");
  const subscriptions = fares.filter(
    (f) => f.category === "time-pass" || f.category === "subscription",
  );

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Tarife STB
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl text-sm">
          Transport de suprafață în Regiunea București-Ilfov. Călătoriile sunt
          valabile 90 de minute cu transfer gratuit între linii, indiferent de
          numărul de validări.
        </p>
      </div>

      <div className="space-y-8">
        <FareGroup title="Călătorii" fares={trips} />
        <FareGroup title="Abonamente" fares={subscriptions} />
      </div>
    </div>
  );
}
