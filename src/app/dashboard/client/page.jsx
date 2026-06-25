"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiGrid, FiLoader, FiDollarSign, FiClock } from "react-icons/fi";
import ClientTaskAnalytics from "@/components/dashboard/ClientTaskAnalytics";
import ClientRecentTasks from "@/components/dashboard/ClientRecentTasks";

export default function ClientOverview() {
  const stats = [
    {
      id: 1,
      label: "Total Tasks",
      value: "24",
      icon: FiGrid,
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-950/30",
    },
    {
      id: 2,
      label: "Open Tasks",
      value: "7",
      icon: FiClock,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      id: 3,
      label: "Tasks In Progress",
      value: "12",
      icon: FiLoader,
      color: "text-sky-500",
      bg: "bg-sky-50 dark:bg-sky-950/30",
    },
    {
      id: 4,
      label: "Total Spent (USD)",
      value: "$3,450",
      icon: FiDollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-12 py-4"
    >
      {/* Page Header Info */}
      <div>
        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-0.5">
          Welcome back! Here is a summary of your workspace activities.
        </p>
      </div>

      {/* 4-Card Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="p-5 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl flex items-center justify-between bg-transparent transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                  {stat.label}
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white block">
                  {stat.value}
                </span>
              </div>
              <div
                className={`p-3 rounded-xl ${stat.bg} ${stat.color} shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {/*  Graph Analytics Section Component */}
        <ClientTaskAnalytics />
        {/* Recent Active Tasks Table Component */}
        <ClientRecentTasks />
      </div>
    </motion.div>
  );
}
