"use client";
import React from "react";
import { Card } from "@heroui/react";
import { FiUsers, FiBriefcase, FiDollarSign, FiActivity } from "react-icons/fi";

export default function StatsCards({ stats }) {
  const cardItems = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <FiUsers className="w-5 h-5 text-indigo-500" />,
      bg: "bg-indigo-500/5",
    },
    {
      title: "Total Tasks",
      value: stats?.totalTasks || 0,
      icon: <FiBriefcase className="w-5 h-5 text-emerald-500" />,
      bg: "bg-emerald-500/5",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: <FiDollarSign className="w-5 h-5 text-amber-500" />,
      bg: "bg-amber-500/5",
    },
    {
      title: "Active Tasks",
      value: stats?.activeTasks || 0,
      icon: <FiActivity className="w-5 h-5 text-rose-500" />,
      bg: "bg-rose-500/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cardItems.map((item, index) => (
        <Card key={index} className="bg-white dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-900 p-5 rounded-2xl shadow-sm hover:border-indigo-500/20 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
              {item.title}
            </span>
            <div className={`p-2.5 rounded-xl ${item.bg}`}>
              {item.icon}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-900 dark:text-zinc-100 tracking-tight">
              {item.value}
            </h3>
          </div>
        </Card>
      ))}
    </div>
  );
}