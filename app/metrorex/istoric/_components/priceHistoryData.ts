import priceHistory from "../../../data/metrorex-price-history.json";
import inflation from "../../../data/romania-inflation.json";

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
  inflationAdjustedPrice: number;
  inflationAdjustedPriceFmt: string;
  inflationDifference: number;
  inflationDifferencePercent: number;
  inflationDifferenceFmt: string;
  inflationComparisonLabel: string;
};

const baseEntry = priceHistory.entries[0];
const baseYear = new Date(baseEntry.date).getFullYear();
const inflationRatesByYear = new Map(
  inflation.yearly.map((entry) => [entry.year, entry.rate]),
);

function formatRon(value: number): string {
  return `${value.toLocaleString("ro-RO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} RON`;
}

function getInflationAdjustedPrice(date: string): number {
  const targetYear = new Date(date).getFullYear();
  let multiplier = 1;

  for (let year = baseYear + 1; year <= targetYear; year += 1) {
    const rate = inflationRatesByYear.get(year);
    if (rate !== undefined) {
      multiplier *= 1 + rate / 100;
    }
  }

  return baseEntry.price * multiplier;
}

export const priceHistoryData: PriceHistoryEntry[] = priceHistory.entries.map(
  (e, index, entries) => {
    const previousPrice = entries[index - 1]?.price;
    const increasePercent =
      previousPrice === undefined
        ? null
        : ((e.price - previousPrice) / previousPrice) * 100;
    const inflationAdjustedPrice = getInflationAdjustedPrice(e.date);
    const inflationDifference = e.price - inflationAdjustedPrice;
    const inflationDifferencePercent =
      (inflationDifference / inflationAdjustedPrice) * 100;
    const inflationComparisonLabel =
      Math.abs(inflationDifferencePercent) < 5
        ? "aproape de inflație"
        : inflationDifferencePercent > 0
          ? "peste inflație"
          : "sub inflație";

    return {
      ...e,
      timestamp: new Date(e.date).getTime(),
      priceFmt: formatRon(e.price),
      increasePercent,
      increaseFmt:
        increasePercent === null
          ? "—"
          : `+${increasePercent.toLocaleString("ro-RO", {
              maximumFractionDigits: 1,
            })}%`,
      inflationAdjustedPrice,
      inflationAdjustedPriceFmt: formatRon(inflationAdjustedPrice),
      inflationDifference,
      inflationDifferencePercent,
      inflationDifferenceFmt: `${inflationDifference >= 0 ? "+" : ""}${formatRon(
        inflationDifference,
      )}`,
      inflationComparisonLabel,
    };
  },
);

export const latestPriceHistoryEntry =
  priceHistoryData[priceHistoryData.length - 1];

export const inflationDataSource = inflation.source;
export const inflationDataNote = inflation.note;

export function formatYear(timestamp: number): string {
  return new Date(timestamp).getFullYear().toString();
}
