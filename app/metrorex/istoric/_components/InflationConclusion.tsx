import { latestPriceHistoryEntry } from "./priceHistoryData";

export default function InflationConclusion() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
      <p className="text-sm text-zinc-300 leading-6 max-w-3xl">
        Biletul de metrou a rămas, în multe perioade, sub ritmul inflației. Cu
        majorarea anunțată pentru mai 2026, ajunge la{" "}
        <span className="font-semibold text-orange-300">
          {latestPriceHistoryEntry.priceFmt}
        </span>
        , ușor peste reperul inflației cumulate:{" "}
        <span className="font-semibold text-orange-300">
          {latestPriceHistoryEntry.inflationAdjustedPriceFmt}
        </span>
        .
      </p>
    </div>
  );
}
