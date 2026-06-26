"use client";
import React from "react";
import { Card } from "@heroui/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function CategoryChart({ data }) {
  const COLORS = ["#6366f1", "#4f46e5", "#3b82f6", "#10b981", "#f59e0b"];

  return (
    <Card className="bg-white dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-900 p-6 rounded-2xl shadow-sm h-[380px] flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-zinc-300">
          Task Categories
        </h3>
        <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium">Job demand breakdown</p>
      </div>

      <div className="w-full h-full min-h-[240px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
              itemStyle={{ fontSize: '12px', color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}