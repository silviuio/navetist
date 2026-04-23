"use client";

import { useState } from "react";
import FareGroup from "./FareGroup";
import type { Fare } from "../types/fares";
import upcomingChanges from "../data/upcoming-changes.json";

type PendingChange = { newPrice: number };

type Props = {
  trips: Fare[];
  subscriptions: Fare[];
};

const pendingChanges: Record<string, PendingChange> = Object.fromEntries(
  upcomingChanges.changes.map((c) => [c.fareId, { newPrice: c.newPrice }]),
);

export default function MetrorexFaresClient({ trips, subscriptions }: Props) {
  const [useFuturePrices, setUseFuturePrices] = useState(false);
  const visiblePendingChanges = useFuturePrices ? pendingChanges : undefined;

  return (
    <>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 bg-orange-500/10 border border-orange-500/30 rounded-lg px-4 py-3">
          <div className="flex items-start gap-3">
            <span className="text-orange-400 text-lg">⚠</span>
            <div className="text-sm">
              <p className="font-semibold text-orange-300 mb-1">
                Majorare tarife Metrorex de la 1 mai 2026
              </p>
              <p className="text-orange-200/70">
                Tarifele marcate cu portocaliu vor crește. Elevii și studenții
                beneficiază în continuare de gratuitate și reducere 90%.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setUseFuturePrices(!useFuturePrices)}
          className="flex h-9 w-fit shrink-0 items-center gap-2 rounded-full border border-orange-500/30 bg-zinc-950/30 px-3 text-xs font-semibold text-orange-100 transition-colors hover:bg-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50"
          aria-pressed={useFuturePrices}
        >
          <span>
            {useFuturePrices ? "Prețuri de la 1 mai" : "Prețuri curente"}
          </span>
          <span
            className={`relative inline-flex h-4 w-8 shrink-0 rounded-full transition-colors ${
              useFuturePrices ? "bg-orange-500" : "bg-zinc-600"
            }`}
            aria-hidden="true"
          >
            <span
              className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                useFuturePrices ? "translate-x-4" : "translate-x-0.5"
              } self-center`}
            />
          </span>
        </button>
      </div>

      <div className="space-y-8">
        <FareGroup
          title="Călătorii"
          fares={trips}
          pendingChanges={visiblePendingChanges}
        />
        <FareGroup
          title="Abonamente"
          fares={subscriptions}
          pendingChanges={visiblePendingChanges}
        />
      </div>
    </>
  );
}
