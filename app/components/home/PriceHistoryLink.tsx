import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function PriceHistoryLink() {
  return (
    <Link
      href="/metrorex/istoric"
      className="group flex items-center justify-between gap-4 bg-white/40 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 py-4 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0 size-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <TrendingUp size={18} className="text-gray-600 dark:text-zinc-300" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Evoluția prețurilor la metrou
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Din 2000 până în 2026
          </p>
        </div>
      </div>
      <span className="text-gray-400 group-hover:translate-x-1 transition-transform text-lg shrink-0">
        →
      </span>
    </Link>
  );
}
