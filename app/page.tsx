import type { Metadata } from "next";
import Link from "next/link";
import { getFaresByOperator } from "./lib/fares";
import PriceChangeAlert from "./components/PriceChangeAlert";

export const metadata: Metadata = {
  title: "Tarife transport public București 2026 — STB și Metrorex | Navetist",
  description:
    "Prețuri actualizate pentru bilete și abonamente STB și Metrorex în București. Compară tarife, calculează costul per călătorie și află de la câte călătorii merită abonamentul.",
};

const operators = [
  {
    key: "stb" as const,
    href: "/stb",
    label: "STB",
    fullName: "Societatea de Transport București",
    description:
      "Transport de suprafață — autobuze, tramvaie, troleibuze — în Regiunea București-Ilfov. Călătoriile sunt valabile 90 de minute cu transfer gratuit între linii.",
    color: "border-emerald-600",
    badge: "bg-emerald-900 text-emerald-100",
  },
  {
    key: "metrorex" as const,
    href: "/metrorex",
    label: "Metrorex",
    fullName: "Metrorex S.A.",
    description:
      "Rețeaua de metrou din București cu 5 magistrale și 63 de stații. Fiecare validare reprezintă o călătorie individuală fără transfer.",
    color: "border-sky-700",
    badge: "bg-sky-950 text-blue-100",
  },
  {
    key: "integrated" as const,
    href: "/integrat",
    label: "Integrat",
    fullName: "STB + Metrorex",
    description:
      "Bilete și abonamente comune pentru deplasări mixte pe suprafață și metrou. Valabile 120 de minute cu validări nelimitate.",
    color: "border-slate-500",
    badge: "bg-slate-700 text-slate-100",
  },
];

export default function Home() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Tarife transport public București 2026
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl">
          Prețuri actualizate pentru bilete și abonamente STB și Metrorex, cu calcule
          care te ajută să alegi cea mai avantajoasă opțiune.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {operators.map((op) => {
          const fares = getFaresByOperator(op.key);
          const minPrice = Math.min(...fares.map((f) => f.price));

          return (
            <Link
              key={op.key}
              href={op.href}
              className={`group flex flex-col bg-white dark:bg-zinc-900 rounded-xl border-t-4 ${op.color} shadow-sm hover:shadow-md transition-shadow p-5`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-sm font-semibold px-3 py-1.5 rounded ${op.badge}`}>
                  {op.label}
                </span>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform text-lg">
                  →
                </span>
              </div>

              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {op.fullName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                {op.description}
              </p>

              {op.key === "metrorex" && (
                <div className="mb-3">
                  <PriceChangeAlert />
                </div>
              )}

              <div className="mt-auto flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-zinc-800 pt-3">
                <span>{fares.length} tipuri de bilete</span>
                <span>·</span>
                <span>de la {minPrice} RON</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
