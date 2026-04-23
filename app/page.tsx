import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import HomeOperatorCards from "./components/HomeOperatorCards";

export const metadata: Metadata = {
  title: "Tarife transport public București 2026 — STB și Metrorex | Navetist",
  description:
    "Prețuri actualizate pentru bilete și abonamente STB și Metrorex în București. Compară tarife, calculează costul per călătorie și află de la câte călătorii merită abonamentul.",
};

export default function Home() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tarife transport public București 2026
          </h1>
          <Link
            href="/metrorex/istoric"
            className="shrink-0 inline-flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors sm:mt-2"
          >
            <TrendingUp size={15} className="shrink-0" />
            <span>Evoluția prețurilor la metrou 2000–2026</span>
            <span>→</span>
          </Link>
        </div>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl">
          Prețuri actualizate pentru bilete și abonamente STB și Metrorex, cu
          calcule care te ajută să alegi cea mai avantajoasă opțiune.
        </p>
      </div>

      <HomeOperatorCards />
    </div>
  );
}
