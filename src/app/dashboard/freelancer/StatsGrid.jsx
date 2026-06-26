// src/app/dashboard/freelancer/components/StatsGrid.jsx
"use client";
import React from "react";
import { Card } from "@heroui/react";
import { FiSend, FiClock, FiCheckCircle, FiDollarSign } from "react-icons/fi";

export default function StatsGrid({ stats }) {
  const cards = [
    { title: "Total Proposals", value: stats?.totalProposals ?? 0, icon: FiSend, color: "text-blue-500", bg: "bg-blue-500/5" },
    { title: "Pending Proposals", value: stats?.pendingProposals ?? 0, icon: FiClock, color: "text-amber-500", bg: "bg-amber-500/5" },
    { title: "Accepted Proposals", value: stats?.acceptedProposals ?? 0, icon: FiCheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/5" },
    { title: "Total Earnings", value: `$${stats?.totalEarnings ?? 0}`, icon: FiDollarSign, color: "text-indigo-500", bg: "bg-indigo-500/5" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, i) => (
        <Card key={i} className="bg-white dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-900 p-5 rounded-2xl flex flex-row items-center justify-between shadow-sm hover:scale-[1.02] hover:shadow-md transition-all duration-300">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
              {card.title}
            </span>
            <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 tracking-tight block">
              {card.value}
            </span>
          </div>
          <div className={`p-3 rounded-xl ${card.bg} ${card.color} border border-current/10 shrink-0`}>
            <card.icon className="w-5 h-5" />
          </div>
        </Card>
      ))}
    </div>
  );
}