import Link from "next/link";
import { faresData } from "../lib/fares";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-2">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
        <span>Date actualizate: {faresData.meta.lastUpdated}</span>
        <div className="flex items-center gap-4">
          <Link href="/surse" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            Surse de date
          </Link>
          <span className="text-gray-300 dark:text-gray-700">·</span>
          <Link href="/despre" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            Despre
          </Link>
        </div>
      </div>
    </footer>
  );
}
