"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "W1", signal: 22, performance: 18 },
  { name: "W2", signal: 28, performance: 20 },
  { name: "W3", signal: 35, performance: 26 },
  { name: "W4", signal: 44, performance: 34 },
  { name: "W5", signal: 52, performance: 40 },
  { name: "W6", signal: 61, performance: 49 },
  { name: "W7", signal: 74, performance: 58 },
  { name: "W8", signal: 86, performance: 66 },
];

export function InsightsChart() {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gSignal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(146, 11, 11)" stopOpacity={0.6} />
              <stop offset="95%" stopColor="rgb(146, 11, 11)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gPerformance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(255, 255, 255)" stopOpacity={0.22} />
              <stop offset="95%" stopColor="rgb(255, 255, 255)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.25)" tickLine={false} axisLine={false} />
          <YAxis stroke="rgba(255,255,255,0.25)" tickLine={false} axisLine={false} width={30} />
          <Tooltip
            contentStyle={{
              background: "rgba(13,13,15,0.75)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 16,
              backdropFilter: "blur(16px)",
              color: "white",
            }}
            cursor={{ stroke: "rgba(255,255,255,0.12)" }}
          />

          <Area
            type="monotone"
            dataKey="performance"
            stroke="rgba(255,255,255,0.28)"
            fill="url(#gPerformance)"
            strokeWidth={2}
          />
          <Area type="monotone" dataKey="signal" stroke="rgb(146, 11, 11)" fill="url(#gSignal)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

