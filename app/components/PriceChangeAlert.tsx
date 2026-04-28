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
import type { Operator } from "../types/fares";

type Props = {
  operator: Operator;
};

function formatDateLabel(date: string): string {
  return new Date(date).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(price: number): string {
  return `${price.toLocaleString("ro-RO")} RON`;
}

export default function PriceChangeAlert({ operator }: Props) {
  const [open, setOpen] = useState(false);
  const announcement = upcomingChanges.announcements.find(
    (item) => item.operator === operator,
  );

  if (!announcement) {
    return null;
  }

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
        <span>{announcement.buttonLabel}</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-w-sm">
          <DialogHeader>
            <span className="text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full w-fit">
              {announcement.operatorLabel} ·{" "}
              {formatDateLabel(announcement.effectiveDate)}
            </span>
            <DialogTitle className="text-white text-lg mt-2">
              {announcement.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            {announcement.changes.map((change) => (
              <div
                key={change.fareId}
                className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
              >
                <span className="text-sm text-zinc-300">{change.name}</span>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-zinc-500 line-through">
                    {formatPrice(change.oldPrice)}
                  </span>
                  <span className="text-orange-400">
                    → {formatPrice(change.newPrice)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-500 mt-2">
            {announcement.note}
          </p>

          {"historyHref" in announcement && announcement.historyHref && (
            <Link
              href={announcement.historyHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 mt-2 pt-3 border-t border-zinc-800 text-sm text-sky-400 hover:text-sky-300 transition-colors"
            >
              <TrendingUp size={14} className="shrink-0" />
              <span>{announcement.historyLabel}</span>
              <span className="ml-auto">→</span>
            </Link>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
