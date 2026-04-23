import type { Metadata } from "next";
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Tarife transport public București 2026
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl">
          Prețuri actualizate pentru bilete și abonamente STB și Metrorex, cu
          calcule care te ajută să alegi cea mai avantajoasă opțiune.
        </p>
      </div>

      <HomeOperatorCards />
    </div>
  );
}
