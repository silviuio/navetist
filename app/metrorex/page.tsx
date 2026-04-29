import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { getFaresByOperator } from "../lib/fares";
import { getPendingChangesByOperator } from "../lib/upcomingChanges";
import { NEXT_PRICE_CHANGE_DATE, formatDateRoLong } from "../lib/dates";
import MetrorexFareList from "./_components/MetrorexFareList";

const nextChangeLabel = formatDateRoLong(NEXT_PRICE_CHANGE_DATE);

export const metadata: Metadata = {
  title: `Prețuri Metrorex 2026 — Scumpiri de la ${nextChangeLabel}, bilete și abonamente metrou București | Navetist`,
  description: `Tarife actuale Metrorex și scumpirile anunțate de la ${nextChangeLabel}: bilet 1, 2 și 10 călătorii, abonamente 24h, 72h, săptămânal, lunar, 6 luni și anual pentru metroul din București.`,
};

const pendingChanges = getPendingChangesByOperator("metrorex");

export default function MetrorexPage() {
  const fares = getFaresByOperator("metrorex");
  const trips = fares.filter((f) => f.category === "trip");
  const subscriptions = fares.filter(
    (f) => f.category === "time-pass" || f.category === "subscription",
  );

  return (
    <div>
      <div className="mb-12">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Tarife Metrorex
          </h1>
          <Link
            href="/metrorex/istoric"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <TrendingUp size={14} />
            <span>Vezi istoric prețuri</span>
          </Link>
        </div>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl text-sm">
          Rețeaua de metrou din București cu 5 magistrale și 63 de stații.
          Fiecare validare reprezintă o călătorie individuală — nu există
          transfer între stații.
        </p>
      </div>

      <MetrorexFareList
        trips={trips}
        subscriptions={subscriptions}
        pendingChanges={pendingChanges}
      />
    </div>
  );
}
