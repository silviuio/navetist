import type { Metadata } from "next";
import { faresData } from "../lib/fares";

export const metadata: Metadata = {
  title: "Surse de date — Tarife STB și Metrorex | Navetist",
  description:
    "Sursele folosite pentru tarifele și datele afișate pe Navetist: STB, Metrorex, INSSE și articole de presă.",
};

type SourceLink = {
  label: string;
  href: string;
  dateLabel?: string;
};

type SourceCard = {
  operator: string;
  fullName: string;
  description: string;
  links: SourceLink[];
};

const sources: SourceCard[] = [
  {
    operator: "STB",
    fullName: "Societatea de Transport București",
    description:
      "Tarife pentru călătorii metropolitane (suprafață) și abonamente STB, inclusiv reduceri pentru donatori de sânge.",
    links: [{ label: "Tarife STB", href: faresData.meta.sources.stb }],
  },
  {
    operator: "Metrorex",
    fullName: "Metrorex S.A.",
    description:
      "Tarife pentru călătorii și abonamente de metrou, inclusiv reduceri pentru elevi, studenți și donatori de sânge.",
    links: [
      { label: "Tarife Metrorex", href: faresData.meta.sources.metrorex },
    ],
  },
  {
    operator: "INSSE",
    fullName: "Institutul Național de Statistică",
    description:
      "IPC — serie de date anuală: rata anuală a inflației folosită pentru comparația cu prețul biletului de metrou.",
    links: [
      {
        label: "IPC — serie de date anuală",
        href: "https://insse.ro/cms/ro/content/ipc%E2%80%93serie-de-date-anuala",
      },
    ],
  },
  {
    operator: "Știri",
    fullName: "Articole despre majorarea tarifelor Metrorex",
    description:
      "Articole folosite pentru contextul public al majorării și al propunerii de amânare.",
    links: [
      {
        dateLabel: "28.04.2026",
        label: "B365",
        href: "https://b365.ro/breaking-calatoria-cu-metroul-nu-se-mai-scumpeste-de-la-1-mai-ministrul-transporturilor-cere-metrorex-un-plan-de-reducere-a-cheltuielilor-cand-ar-urma-sa-creasca-tarifele-603456/",
      },
      {
        dateLabel: "28.04.2026",
        label: "HotNews",
        href: "https://hotnews.ro/scumpire-metrou-amanata-ministrul-interimar-al-transporturilor-radu-miruta-2231239",
      },
      {
        dateLabel: "25.04.2026",
        label: "HotNews",
        href: "https://hotnews.ro/scumpiri-la-metrou-de-la-1-mai-o-calatorie-va-costa-7-lei-ordinul-publicat-in-monitorul-oficial-2228965",
      },
      {
        dateLabel: "22.04.2026",
        label: "HotNews",
        href: "https://hotnews.ro/oficial-calatoria-cu-metroul-se-scumpeste-cu-40-ministrul-serban-a-semnat-ordinul-cu-o-zi-inainte-sa-si-dea-demisia-2226505",
      },
      {
        dateLabel: "29.04.2026",
        label: "HotNews",
        href: "https://hotnews.ro/scumpirea-biletului-de-la-metrou-amanata-pentru-60-de-zile-decizie-oficiala-ce-nereguli-a-gasit-noul-ministru-la-metrorex-si-ce-masuri-a-anuntat-e-strigator-la-cer-2232853",
      },
    ],
  },
];

export default function SursePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Surse de date
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Tarifele și datele statistice afișate pe Navetist sunt preluate din
        surse oficiale.
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        Ultima actualizare: {faresData.meta.lastUpdated}.
      </p>

      <div className="space-y-4">
        {sources.map((s) => (
          <div
            key={s.operator}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
          >
            <div className="mb-1">
              <span className="font-semibold text-gray-900 dark:text-white">
                {s.operator}
              </span>
              <span className="text-gray-400 text-sm ml-2">{s.fullName}</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {s.description}
            </p>
            <div className="space-y-2">
              {s.links.map((link) => (
                <div key={link.href} className="text-xs sm:flex sm:gap-3">
                  {link.dateLabel && (
                    <span className="mb-0.5 block shrink-0 text-gray-400 dark:text-gray-500 sm:w-28">
                      {link.dateLabel}
                    </span>
                  )}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block min-w-0 text-sky-500 dark:text-sky-400 break-all hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
                  >
                    <span className="font-medium">{link.label}</span>
                    <span className="text-gray-400 dark:text-gray-600">
                      {" "}
                      ·{" "}
                    </span>
                    {link.href}
                  </a>
                </div>
              ))}
            </div>
          </div>
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
