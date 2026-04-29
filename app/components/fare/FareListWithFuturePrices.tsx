"use client";

import { useState } from "react";
import FareGroup from "@/app/components/fare/FareGroup";
import {
  NEXT_PRICE_CHANGE_DATE,
  formatDateRoLong,
} from "@/app/lib/dates";
import type { Fare } from "@/app/types/fares";
import type { PendingChanges } from "@/app/lib/upcomingChanges";

const NEXT_PRICE_CHANGE_LABEL = formatDateRoLong(NEXT_PRICE_CHANGE_DATE);

type Props = {
  trips: Fare[];
  subscriptions: Fare[];
  pendingChanges: PendingChanges;
  alertTitle: string;
  alertDescription: string;
  currentLabel?: string;
  futureLabel?: string;
  currentDescription?: string;
  futureDescription?: string;
  switchAriaLabel?: string;
};

export default function FareListWithFuturePrices({
  trips,
  subscriptions,
  pendingChanges,
  alertTitle,
  alertDescription,
  currentLabel = "Prețuri actuale",
  futureLabel = `Prețuri de la ${NEXT_PRICE_CHANGE_LABEL}`,
  currentDescription = "Tarifele în vigoare azi. Comută pentru a vedea cele noi.",
  futureDescription = "Vezi cum vor arăta tarifele după majorare.",
  switchAriaLabel = `Comută între prețuri actuale și cele de la ${NEXT_PRICE_CHANGE_LABEL}`,
}: Props) {
  const [useFuturePrices, setUseFuturePrices] = useState(false);

  const effectivePendingChanges = useFuturePrices ? pendingChanges : {};

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg px-4 py-3 flex items-start gap-3">
          <span className="text-orange-400 text-lg leading-none mt-0.5">
            ⚠
          </span>
          <div className="text-sm">
            <p className="font-semibold text-orange-300 mb-1">{alertTitle}</p>
            <p className="text-orange-200/70">{alertDescription}</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3">
          <div className="text-sm">
            <p className="font-medium text-white">
              {useFuturePrices ? futureLabel : currentLabel}
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">
              {useFuturePrices ? futureDescription : currentDescription}
            </p>
          </div>
          <button
            onClick={() => setUseFuturePrices(!useFuturePrices)}
            role="switch"
            aria-checked={useFuturePrices}
            aria-label={switchAriaLabel}
            className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
              useFuturePrices ? "bg-orange-500" : "bg-zinc-700"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                useFuturePrices ? "translate-x-5" : "translate-x-0.5"
              } self-center`}
            />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <FareGroup
          title="Călătorii"
          fares={trips}
          pendingChanges={effectivePendingChanges}
        />
        <FareGroup
          title="Abonamente"
          fares={subscriptions}
          pendingChanges={effectivePendingChanges}
        />
      </div>
    </>
  );
}
