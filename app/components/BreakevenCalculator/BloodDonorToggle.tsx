"use client";

type Props = {
  value: boolean;
  onChange: (v: boolean) => void;
};

export default function BloodDonorToggle({ value, onChange }: Props) {
  return (
    <div className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/60 rounded-lg p-2.5 text-xs">
      <span className="text-zinc-300">Sunt donator de sânge (−50%)</span>
      <button
        onClick={() => onChange(!value)}
        role="switch"
        aria-checked={value}
        aria-label="Toggle reducere donator de sânge"
        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors ${
          value ? "bg-emerald-500" : "bg-zinc-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
            value ? "translate-x-4" : "translate-x-0.5"
          } self-center`}
        />
      </button>
    </div>
  );
}
