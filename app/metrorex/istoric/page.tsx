import type { Metadata } from "next";
import InflationConclusion from "./_components/InflationConclusion";
import PriceChart from "./_components/PriceChart";
import PriceHistoryTable from "./_components/PriceHistoryTable";
import { inflationDataNote } from "./_components/priceHistoryData";

export const metadata: Metadata = {
  title: "Evoluția prețului biletului de metrou București 2000–2026 | Navetist",
  description:
    "Istoricul complet al prețurilor la metroul din București: de la ~1 RON în 2000 la 7 RON din mai 2026, comparat cu inflația cumulată.",
  openGraph: {
    title: "Evoluția prețului biletului de metrou București 2000–2026",
    description:
      "De la 1 RON în 2000 la 7 RON în 2026 — vezi cum a evoluat prețul călătoriei cu metroul în București față de inflație.",
  },
};

export default function MetrorexIstoricPage() {
  return (
    <div className="min-w-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">
          Evoluția prețului biletului de metrou
        </h1>
        <p className="text-gray-400 text-sm max-w-xl">
          Prețul unei călătorii la metroul din București din 2000 până în
          prezent, inclusiv majorarea anunțată pentru mai 2026.
        </p>
      </div>

      <InflationConclusion />
      <PriceChart />
      <PriceHistoryTable />

      <p className="text-xs text-zinc-600 leading-5">
        * Datele despre preț dinainte de 2010 sunt estimative — prețul per
        călătorie este dedus din împărțirea prețului cartelei disponibile la
        momentul respectiv (2 sau 10 călătorii). Pentru comparația cu inflația,
        calculul pornește de la 1 RON în 2000 și aplică inflația anuală din 2001
        până în anul fiecărei observații. {inflationDataNote}
      </p>
    </div>
  );
}
