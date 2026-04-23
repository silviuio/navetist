import priceHistory from "../../data/metrorex-price-history.json";

export type PriceHistoryEntry = {
  date: string;
  price: number;
  label: string;
  note?: string;
  upcoming?: boolean;
  timestamp: number;
  priceFmt: string;
  increasePercent: number | null;
  increaseFmt: string;
};

export const priceHistoryData: PriceHistoryEntry[] = priceHistory.entries.map(
  (e, index, entries) => {
    const previousPrice = entries[index - 1]?.price;
    const increasePercent =
      previousPrice === undefined
        ? null
        : ((e.price - previousPrice) / previousPrice) * 100;

    return {
      ...e,
      timestamp: new Date(e.date).getTime(),
      priceFmt: `${e.price.toFixed(2)} RON`,
      increasePercent,
      increaseFmt:
        increasePercent === null
          ? "—"
          : `+${increasePercent.toLocaleString("ro-RO", {
              maximumFractionDigits: 1,
            })}%`,
    };
  },
);

export function formatYear(timestamp: number): string {
  return new Date(timestamp).getFullYear().toString();
}
