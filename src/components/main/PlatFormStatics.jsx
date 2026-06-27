"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiUsers,
  FiCreditCard,
  FiCheckCircle,
} from "react-icons/fi";

const stats = [
  {
    title: "Tasks Posted",
    value: "45K+",
    description: "Projects published by clients",
    icon: FiBriefcase,
  },
  {
    title: "Active Users",
    value: "18K+",
    description: "Clients & Freelancers",
    icon: FiUsers,
  },
  {
    title: "Payments Processed",
    value: "$3.8M",
    description: "Secure payouts completed",
    icon: FiCreditCard,
  },
  {
    title: "Completed Tasks",
    value: "39K+",
    description: "Successfully delivered",
    icon: FiCheckCircle,
  },
];

export default function PlatformStatistics() {
  return (
    <section className="relative overflow-hidden py-24 bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-zinc-900/50">
      
      {/*BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* 2. Soft Indigo Radial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/[0.05] dark:bg-indigo-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">

        {/* ─── SECTION HEADER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16 space-y-3"
        >
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 text-[10px] font-black uppercase tracking-widest">
            Platform Statistics
          </span>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-800 dark:text-zinc-100 uppercase">
            Trusted by Thousands
          </h2>

          <p className="max-w-md mx-auto text-xs sm:text-sm font-semibold text-slate-400 dark:text-zinc-500 leading-relaxed">
            TaskForge Pro connects businesses with talented freelancers through secure collaboration, transparent payments, and efficient project
          </p>
        </motion.div>

        {/* ─── METRICS CARDS PANEL ─── */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/70 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/[0.02]"
              >
                {/* Card Hover Radial Shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-transparent pointer-events-none" />

                <div>
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center text-xl mb-6 group-hover:scale-105 transition-transform duration-300 shrink-0">
                    <Icon />
                  </div>

                  {/* Value */}
                  <h3 className="text-3xl font-black text-slate-800 dark:text-zinc-100 tracking-tighter">
                    {item.value}
                  </h3>

                  {/* Title */}
                  <p className="mt-1.5 font-black uppercase tracking-wider text-indigo-500 dark:text-indigo-400 text-[10px]">
                    {item.title}
                  </p>

                  {/* Description */}
                  <p className="mt-2 text-xs font-medium text-slate-400 dark:text-zinc-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Border Accent Line */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-indigo-500 to-indigo-600 group-hover:w-full transition-all duration-500 ease-out" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}