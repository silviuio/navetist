import { priceHistoryData } from "./priceHistoryData";

export default function PriceHistoryTable() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left px-4 py-3 text-zinc-400 font-medium">
              Perioadă
            </th>
            <th className="text-left px-4 py-3 text-zinc-400 font-medium">
              Preț / călătorie
            </th>
            <th className="text-left px-4 py-3 text-zinc-400 font-medium">
              Majorare
            </th>
            <th className="text-left px-4 py-3 text-zinc-400 font-medium hidden sm:table-cell">
              Observație
            </th>
          </tr>
        </thead>
        <tbody>
          {priceHistoryData.map((entry, i) => (
            <tr
              key={i}
              className={`border-b border-zinc-800/60 last:border-0 ${entry.upcoming ? "bg-orange-500/5" : ""}`}
            >
              <td className="px-4 py-3 text-zinc-300 font-medium">
                {entry.label}
              </td>
              <td
                className={`px-4 py-3 font-bold ${entry.upcoming ? "text-orange-400" : "text-white"}`}
              >
                {entry.priceFmt}
                {entry.upcoming && (
                  <span className="ml-2 text-xs font-normal text-orange-400/70">
                    anunțat
                  </span>
                )}
              </td>
              <td
                className={`px-4 py-3 font-semibold tabular-nums ${
                  entry.upcoming ? "text-orange-400" : "text-zinc-300"
                }`}
              >
                {entry.increaseFmt}
              </td>
              <td className="px-4 py-3 text-zinc-500 hidden sm:table-cell">
                {entry.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
