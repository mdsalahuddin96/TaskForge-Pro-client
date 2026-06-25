// src/app/dashboard/client/overview/TaskAnalytics.jsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { FiTrendingUp } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";


// 🎯 কাস্টম মিনিমালিস্ট টুলটিপ Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-slate-950/95 dark:bg-black border border-slate-800 rounded-xl p-3 shadow-xl backdrop-blur-md">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
          {label} Overview
        </p>
        <div className="space-y-1 text-xs">
          <p className="font-bold text-indigo-400">
            Completed: <span className="font-black text-white">{payload[0]?.value ?? 0} Tasks</span>
          </p>
          <p className="font-bold text-amber-400">
            Open/Active: <span className="font-black text-white">{payload[1]?.value ?? 0} Tasks</span>
          </p>
          <div className="border-t border-slate-800/60 my-1 pt-1">
            <p className="font-bold text-emerald-400">
              Total Budget: <span className="font-black text-white">${payload[0]?.payload?.budgetAmt ?? 0}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function ClientTaskAnalytics() {
  const [chartData, setChartData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const {data}=useSession()
  const user=data?.user
  // ব্যাকএন্ড থেকে কারেন্ট মাসের লাইভ ডেটা ফেচিং
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // আপনার ব্যাকএন্ড বেস ইউআরএল সেট করুন (যেমন: http://localhost:5000)
        const response = await fetch(`http://localhost:5000/api/monthly-growth/${user.id}`);
        const data=await response.json()
        if (data.success) {
          setChartData(response.data.data);
          setCurrentMonth(response.data.monthName);
        }
      } catch (error) {
        console.error("Error fetching monthly analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchAnalytics();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center border border-slate-200/60 dark:border-slate-800/60 rounded-2xl">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="space-y-4"
    >
      {/* Section Headline */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiTrendingUp className="text-indigo-500 w-4 h-4" />
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Task Efficiency Analytics
          </h2>
        </div>
        {currentMonth && (
          <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full">
            {currentMonth}
          </span>
        )}
      </div>

      {/* Cardless Outer Layout Wrapper Container */}
      <div className="w-full border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-4 sm:p-6 bg-transparent overflow-hidden flex justify-center">
        {chartData.length === 0 ? (
          <p className="text-xs font-semibold text-slate-400 py-12">No tasks found for this month.</p>
        ) : (
          <BarChart
            style={{ width: "100%", maxWidth: "700px", maxHeight: "70vh", aspectRatio: 1.618 }}
            responsive="true"
            data={chartData}
            margin={{ top: 25, right: 0, left: -25, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              className="stroke-slate-100 dark:stroke-slate-800/50" 
            />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              dy={8}
              className="fill-slate-400 dark:fill-slate-500 font-bold text-[11px]"
            />
            <YAxis 
              width={60} 
              axisLine={false} 
              tickLine={false}
              dx={5}
              className="fill-slate-400 dark:fill-slate-500 font-bold text-[11px]"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99, 102, 241, 0.04)" }} />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
              iconSize={8}
              className="text-[11px] font-black uppercase tracking-wider fill-slate-500"
            />
            <Bar 
              name="Completed"
              dataKey="completed" 
              fill="#6366f1" 
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
              background={{ fill: "rgba(148, 163, 184, 0.06)" }} 
            />
            <Bar 
              name="Open / Active"
              dataKey="open" 
              fill="#f59e0b" 
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        )}
      </div>
    </motion.div>
  );
}