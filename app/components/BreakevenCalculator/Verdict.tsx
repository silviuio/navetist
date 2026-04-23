import { Check, X } from "lucide-react";
import { fmt } from "./utils";

type Props = {
  /** Pozitiv dacă abonamentul merită, negativ dacă nu */
  savings: number;
  /** "lună", "săptămână", "24h" etc. */
  displayUnit: string;
};

export default function Verdict({ savings, displayUnit }: Props) {
  const worthIt = savings > 0;

  return (
    <div
      className={`border rounded-lg p-3 flex items-start gap-2 ${
        worthIt
          ? "bg-emerald-500/10 border-emerald-500/30"
          : "bg-zinc-800/60 border-zinc-700/60"
      }`}
    >
      {worthIt ? (
        <>
          <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-emerald-300 font-semibold">
              Economisești {fmt(savings)} RON/{displayUnit}
            </p>
            <p className="text-emerald-200/70 text-xs mt-0.5">
              Abonamentul e mai avantajos la acest nivel de utilizare.
            </p>
          </div>
        </>
      ) : (
        <>
          <X size={18} className="text-zinc-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-zinc-200 font-semibold">
              Mai ai {fmt(Math.abs(savings))} RON până să merite
            </p>
            <p className="text-zinc-400 text-xs mt-0.5">
              La acest nivel, biletele individuale sunt mai ieftine.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
