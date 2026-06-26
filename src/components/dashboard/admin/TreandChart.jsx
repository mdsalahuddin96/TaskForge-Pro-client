"use client";
import React from "react";
import { Card } from "@heroui/react";
import { AreaChart, Area, XBox, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TrendChart({ data }) {
  return (
    <Card className="bg-white dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-900 p-6 rounded-2xl shadow-sm h-[380px] flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-zinc-300">
          Revenue & Growth Trend
        </h3>
        <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium">Daily visualization of platforms health</p>
      </div>
      
      <div className="w-full h-full min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
            <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
              labelStyle={{ color: '#a1a1aa', fontSize: '12px', fontWeight: 'bold' }}
              itemStyle={{ color: '#6366f1', fontSize: '13px' }}
            />
            <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}