"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  label: string;
  value: number;
  onChange: (v: number) => void;
};

export default function Counter({ label, value, onChange }: Props) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-zinc-300">{label}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-7 h-7 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 transition-colors"
          aria-label={`Scade ${label}`}
        >
          <Minus size={13} />
        </button>
        <span className="w-10 text-center text-sm font-semibold text-white tabular-nums">
          {value}
        </span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-7 h-7 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 transition-colors"
          aria-label={`Crește ${label}`}
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}
