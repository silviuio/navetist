import type { Metadata } from "next";
import MetrorexIstoricChart from "../../components/MetrorexIstoricChart";

export const metadata: Metadata = {
  title: "Evoluția prețului biletului de metrou București 2000–2026 | Navetist",
  description:
    "Istoricul complet al prețurilor la metroul din București: de la ~1 RON în 2000 la 7 RON din mai 2026. Grafic și tabel cu toate majorările Metrorex în ultimii 25 de ani.",
  openGraph: {
    title: "Evoluția prețului biletului de metrou București 2000–2026",
    description:
      "De la 1 RON în 2000 la 7 RON în 2026 — vezi cum a evoluat prețul călătoriei cu metroul în București.",
  },
};

export default function MetrorexIstoricPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">
          Evoluția prețului biletului de metrou
        </h1>
        <p className="text-gray-400 text-sm max-w-xl">
          Prețul unei călătorii la metroul din București din 2000 până în
          prezent, inclusiv majorarea anunțată pentru mai 2026.
        </p>
      </div>

      <MetrorexIstoricChart />
    </div>
  );
}
