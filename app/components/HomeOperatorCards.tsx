"use client";

import { useRouter } from "next/navigation";
import { getFaresByOperator } from "../lib/fares";
import PriceChangeAlert from "./PriceChangeAlert";

const operators = [
  {
    key: "stb" as const,
    href: "/stb",
    title: "Tarife STB",
    description:
      "Transport de suprafață — autobuze, tramvaie, troleibuze — în Regiunea București-Ilfov. Călătoriile sunt valabile 90 de minute cu transfer gratuit între linii.",
    color: "border-emerald-600",
  },
  {
    key: "metrorex" as const,
    href: "/metrorex",
    title: "Tarife Metrorex",
    description:
      "Rețeaua de metrou din București cu 5 magistrale și 63 de stații. Fiecare validare reprezintă o călătorie individuală fără transfer.",
    color: "border-sky-700",
  },
  {
    key: "integrated" as const,
    href: "/integrat",
    title: "Tarife integrate",
    description:
      "Bilete și abonamente comune pentru deplasări mixte pe suprafață și metrou. Valabile 120 de minute cu validări nelimitate.",
    color: "border-slate-500",
  },
];

export default function HomeOperatorCards() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {operators.map((operator) => {
        const fares = getFaresByOperator(operator.key);
        const minPrice = Math.min(...fares.map((f) => f.price));

        return (
          <div
            key={operator.key}
            onClick={() => router.push(operator.href)}
            className={`group flex flex-col bg-white dark:bg-zinc-900 rounded-xl border-t-4 ${operator.color} shadow-sm hover:shadow-md transition-shadow p-5 cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {operator.title}
              </h2>
              <span className="text-gray-400 group-hover:translate-x-1 transition-transform text-lg">
                →
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              {operator.description}
            </p>

            {operator.key === "metrorex" && (
              <div className="mb-3" onClick={(e) => e.stopPropagation()}>
                <PriceChangeAlert />
              </div>
            )}

            <div className="mt-auto flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-zinc-800 pt-3">
              <span>{fares.length} tipuri de bilete</span>
              <span>·</span>
              <span>de la {minPrice} RON</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
