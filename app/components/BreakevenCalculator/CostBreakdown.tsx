import { fmt } from "./utils";

type Props = {
  currentCost: number;
  basePrice: number;
  isMultiMonth: boolean;
  pricesUsedLabel: string;
  useFuturePrices: boolean;
  daysAway?: number;
  bloodDonorDiscount?: boolean;
};

export default function CostBreakdown({
  currentCost,
  basePrice,
  isMultiMonth,
  pricesUsedLabel,
  useFuturePrices,
  daysAway = 0,
  bloodDonorDiscount = false,
}: Props) {
  return (
    <div className="border-t border-zinc-800 pt-3 space-y-1.5 text-sm">
      <div className="flex justify-between">
        <span className="text-zinc-400">
          Cu abonament{isMultiMonth ? " (per lună)" : ""}
          {bloodDonorDiscount && (
            <span className="text-emerald-400/80 text-xs ml-1">
              · −50% donator
            </span>
          )}
        </span>
        <span className="text-zinc-200 font-medium tabular-nums">
          {fmt(basePrice)} RON
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-zinc-400">
          Fără abonament (bilete)
          {daysAway > 0 && (
            <span className="text-zinc-500 text-xs ml-1">
              · −{daysAway} zile
            </span>
          )}
        </span>
        <span className="text-zinc-200 font-medium tabular-nums">
          {fmt(currentCost)} RON
        </span>
      </div>
      <p
        className={`text-xs pt-1 ${useFuturePrices ? "text-orange-400/80" : "text-zinc-500"}`}
      >
        {pricesUsedLabel}
      </p>
    </div>
  );
}
