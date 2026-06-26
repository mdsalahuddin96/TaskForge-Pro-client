"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { FiTrendingUp } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";
import { getClientMonthlyGrouth } from "@/lib/api/getClientMonthlyGrouth";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-slate-950 dark:bg-black border border-slate-800 rounded-xl p-3 shadow-xl">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
        {label}
      </p>

      <p className="text-indigo-400 text-xs font-bold">
        Completed Tasks:
        <span className="text-white ml-1">
          {data.completedTasks}
        </span>
      </p>

      <p className="text-emerald-400 text-xs font-bold mt-1">
        Total Budget:
        <span className="text-white ml-1">
          ${data.totalBudget}
        </span>
      </p>
    </div>
  );
};

export default function ClientTaskAnalytics() {
  const [chartData, setChartData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("");
  const [loading, setLoading] = useState(true);

  const { data } = useSession();
  const user = data?.user;

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const result = await getClientMonthlyGrouth(user?.id)
        setChartData(result);
        setCurrentMonth(
          new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchAnalytics();
    }
  }, [user?.id]);

  if (loading) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center border border-slate-200 dark:border-slate-800 rounded-2xl">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Header */}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FiTrendingUp className="text-indigo-500" />
          <h2 className="text-sm font-black uppercase tracking-wider">
            Monthly Growth Analytics
          </h2>
        </div>

        <span className="text-xs font-bold bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full">
          {currentMonth}
        </span>
      </div>

      {/* Chart */}

      <div className="w-full h-[380px] border border-slate-200 dark:border-slate-800 rounded-2xl p-5">

        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400 font-semibold">
            No completed task found this month.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="category"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                yAxisId="left"
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              <Legend />

              <Bar
                yAxisId="left"
                dataKey="completedTasks"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
                name="Completed Tasks"
                maxBarSize={35}
              />

              <Line
                yAxisId="right"
                type="monotone"
                dataKey="totalBudget"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
                name="Budget (USD)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}