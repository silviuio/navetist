"use client";

import { useState } from "react";
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

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-zinc-900 border border-zinc-700 rounded-xl w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">
                  Metrorex · 1 mai 2026
                </span>
                <h2 className="text-white font-bold text-lg mt-2">
                  Majorare tarife metrou
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-white text-xl leading-none ml-4"
              >
                ×
              </button>
            </div>

            <div className="space-y-2">
              {upcomingChanges.changes.map((change) => (
                <div
                  key={change.fareId}
                  className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
                >
                  <span className="text-sm text-zinc-300">{change.name}</span>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-zinc-500 line-through">{change.oldPrice} RON</span>
                    <span className="text-orange-400">→ {change.newPrice} RON</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-zinc-500 mt-4">
              Elevii și studenții beneficiază în continuare de gratuitate și reducere 90%.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
