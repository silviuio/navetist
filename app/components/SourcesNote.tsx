import Link from "next/link";
import { faresData } from "../lib/fares";

type Props = {
  sources: ("stb" | "metrorex")[];
};

const sourceLinks: Record<"stb" | "metrorex", { label: string; href: string }> = {
  stb: { label: "stbsa.ro", href: faresData.meta.sources.stb },
  metrorex: { label: "metrorex.ro", href: faresData.meta.sources.metrorex },
};

export default function SourcesNote({ sources }: Props) {
  return (
    <p className="text-xs text-gray-400 dark:text-gray-500 mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800">
      Surse:{" "}
      {sources.map((s, i) => (
        <span key={s}>
          <a
            href={sourceLinks[s].href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {sourceLinks[s].label}
          </a>
          {i < sources.length - 1 && " · "}
        </span>
      ))}{" "}
      — actualizat {faresData.meta.lastUpdated}. {" "}
      <Link href="/surse" className="underline hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
        Vezi toate sursele
      </Link>
    </p>
  );
}
