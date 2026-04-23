"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import upcomingChanges from "../data/upcoming-changes.json";

export default function PriceChangeAlert() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="flex items-center gap-1.5 text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2.5 py-1 rounded-full hover:bg-orange-500/30 transition-colors"
      >
        <span>⚠</span>
        <span>Scumpiri de la 1 mai 2026</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-w-sm">
          <DialogHeader>
            <span className="text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full w-fit">
              Metrorex · 1 mai 2026
            </span>
            <DialogTitle className="text-white text-lg mt-2">
              Majorare tarife metrou
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            {upcomingChanges.changes.map((change) => (
              <div
                key={change.fareId}
                className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
              >
                <span className="text-sm text-zinc-300">{change.name}</span>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-zinc-500 line-through">
                    {change.oldPrice} RON
                  </span>
                  <span className="text-orange-400">→ {change.newPrice} RON</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-500 mt-2">
            Elevii și studenții beneficiază în continuare de gratuitate și
            reducere 90%.
          </p>

          <Link
            href="/metrorex/istoric"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 mt-2 pt-3 border-t border-zinc-800 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <TrendingUp size={14} className="shrink-0" />
            <span>Vezi evoluția prețurilor din 2000 până azi</span>
            <span className="ml-auto">→</span>
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
}
