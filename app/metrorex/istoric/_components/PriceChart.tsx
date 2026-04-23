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
import {
  priceHistoryData,
  formatYear,
  type PriceHistoryEntry,
} from "./priceHistoryData";

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: PriceHistoryEntry }[];
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

export default function PriceChart() {
  const upcomingEntry = priceHistoryData.find((e) => e.upcoming);

  return (
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
          data={priceHistoryData}
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
              const entry = props.payload as PriceHistoryEntry;
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
  );
}
