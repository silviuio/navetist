import type { Metadata } from "next";
import { faresData } from "../lib/fares";

export const metadata: Metadata = {
  title: "Surse de date — Tarife STB și Metrorex | Navetist",
  description:
    "Sursele oficiale folosite pentru tarifele afișate pe Navetist: STB și Metrorex.",
};

const sources = [
  {
    operator: "STB",
    fullName: "Societatea de Transport București",
    href: faresData.meta.sources.stb,
    description:
      "Tarife pentru călătorii metropolitane (suprafață) și abonamente STB, inclusiv reduceri pentru donatori de sânge.",
  },
  {
    operator: "Metrorex",
    fullName: "Metrorex S.A.",
    href: faresData.meta.sources.metrorex,
    description:
      "Tarife pentru călătorii și abonamente de metrou, inclusiv reduceri pentru elevi, studenți și donatori de sânge.",
  },
];

export default function SursePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Surse de date
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Toate tarifele afișate pe Navetist sunt preluate direct de pe site-urile
        oficiale ale operatorilor.
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        Ultima actualizare: {faresData.meta.lastUpdated}.
      </p>

      <div className="space-y-4">
        {sources.map((s) => (
          <a
            key={s.operator}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {s.operator}
                </span>
                <span className="text-gray-400 text-sm ml-2">{s.fullName}</span>
              </div>
              <span className="text-gray-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {s.description}
            </p>
            <p className="text-xs text-sky-500 dark:text-sky-400 break-all">
              {s.href}
            </p>
          </a>
        ))}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-8">
        Navetist nu este afiliat cu STB sau Metrorex. Datele sunt furnizate
        informativ — verificați întotdeauna tarifele actuale pe site-urile
        oficiale.
      </p>
    </div>
  );
}
