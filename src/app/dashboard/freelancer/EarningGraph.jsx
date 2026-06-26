"use client";

import React from "react";
import { Card } from "@heroui/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FiTrendingUp, FiDollarSign } from "react-icons/fi";

const MONTHS = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/95 backdrop-blur-xl shadow-xl px-4 py-3">
      <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
        {MONTHS[data.month]} {data.year}
      </p>

      <div className="flex items-center justify-between gap-8">
        <span className="text-xs font-semibold text-slate-300">
          Revenue
        </span>

        <span className="text-sm font-black text-emerald-400">
          ${data.earning}
        </span>
      </div>
    </div>
  );
};

export default function EarningGraph({ chartData = [] }) {
  const totalEarnings = chartData.reduce(
    (sum, item) => sum + Number(item.earning),
    0
  );

  return (
    <Card className="rounded-3xl border border-slate-200/70 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-zinc-900">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
            <FiTrendingUp className="text-indigo-500 text-xl" />
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white">
              Revenue Analytics
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Earnings from the last 3 months
            </p>
          </div>

        </div>

        <div className="text-right">

          <div className="flex items-center justify-end gap-1">

            <FiDollarSign className="text-emerald-500" />

            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              ${totalEarnings}
            </h2>

          </div>

          <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
            Total Earnings
          </p>

        </div>

      </div>

      {/* Chart */}

      <div className="p-6">

        {chartData.length === 0 ? (
          <div className="h-[320px] flex flex-col items-center justify-center">

            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <FiTrendingUp className="text-3xl text-indigo-500" />
            </div>

            <h3 className="mt-5 text-lg font-black text-slate-700 dark:text-white">
              No Earnings Yet
            </h3>

            <p className="mt-2 text-sm text-center text-slate-400 max-w-xs">
              Complete projects and receive payments to view your earnings analytics.
            </p>

          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 15,
                left: -10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="earningGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#6366F1"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="100%"
                    stopColor="#6366F1"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#CBD5E1"
                opacity={0.35}
              />

              <XAxis
                dataKey="month"
                tickFormatter={(value) => MONTHS[value]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fontWeight: 700,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
                tick={{
                  fontSize: 12,
                  fontWeight: 700,
                }}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#6366F1",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />

              <Area
                type="monotone"
                dataKey="earning"
                stroke="#6366F1"
                strokeWidth={3}
                fill="url(#earningGradient)"
                animationDuration={1200}
                activeDot={{
                  r: 6,
                  stroke: "#6366F1",
                  strokeWidth: 3,
                  fill: "#ffffff",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

      </div>
    </Card>
  );
}