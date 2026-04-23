"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import priceHistory from "../data/metrorex-price-history.json";

const data = priceHistory.entries.map((e, index, entries) => {
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
});

function formatYear(timestamp: number): string {
  return new Date(timestamp).getFullYear().toString();
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: (typeof data)[0] }[];
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm shadow-lg">
      <p className="font-semibold text-white mb-0.5">{d.label}</p>
      <p
        className={`font-bold text-lg ${d.upcoming ? "text-orange-400" : "text-sky-400"}`}
      >
        {d.priceFmt}
      </p>
      {d.note && (
        <p className="text-zinc-400 text-xs mt-1 max-w-[180px]">{d.note}</p>
      )}
    </div>
  );
}

export default function MetrorexIstoricChart() {
  const upcomingEntry = data.find((e) => e.upcoming);

  return (
    <>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-400 inline-block" />
            <span className="text-zinc-400">Preț confirmat</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-400 inline-block" />
            <span className="text-zinc-400">Majorare anunțată</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
              vertical={false}
            />
            <XAxis
              dataKey="timestamp"
              type="number"
              scale="time"
              domain={["dataMin", "dataMax"]}
              tickFormatter={formatYear}
              tick={{ fill: "#71717a", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickCount={6}
            />
            <YAxis
              tick={{ fill: "#71717a", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v} RON`}
              domain={[0, 8]}
              ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
            />
            <Tooltip content={<CustomTooltip />} />
            {upcomingEntry && (
              <ReferenceLine
                x={upcomingEntry.timestamp}
                stroke="#f97316"
                strokeDasharray="4 4"
                strokeOpacity={0.5}
              />
            )}
            <Area
              type="monotone"
              dataKey="price"
              stroke="#38bdf8"
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={(props) => {
                const entry = props.payload as (typeof data)[0];
                const color = entry.upcoming ? "#f97316" : "#38bdf8";
                return (
                  <circle
                    key={props.index}
                    cx={props.cx}
                    cy={props.cy}
                    r={5}
                    fill={color}
                    stroke={color}
                    strokeWidth={2}
                  />
                );
              }}
              activeDot={{ r: 7, fill: "#38bdf8" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

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
            {data.map((entry, i) => (
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

      <p className="text-xs text-zinc-600">
        * Datele dinainte de 2010 sunt estimative — prețul per călătorie este
        dedus din împărțirea prețului cartelei disponibile la momentul respectiv
        (2 sau 10 călătorii).
      </p>
    </>
  );
}
