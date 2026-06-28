// src/components/FeaturedTasks.jsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import {
  FiDollarSign,
  FiCalendar,
  FiFolder,
  FiUser,
  FiArrowUpRight,
  FiZap,
} from "react-icons/fi";
import { getFeaturedTask } from "@/lib/api/getFeaturedTask";
import Link from "next/link";

export default function FeaturedTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    const fetchLatestTasks = async () => {
      try {
        const tasks = await getFeaturedTask();
        if (tasks) {
          setTasks(tasks);
        }
      } catch (err) {
        console.error("Error loading featured tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestTasks();
  }, []);

  // Framer Motion Animation Setup for parent container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Card slide-up and fade-in entry spring mechanics
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };
  if (!isMounted) {
    return <div className="min-h-[400px] bg-slate-50 dark:bg-black" />;
  }
  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-slate-50 dark:bg-black overflow-hidden relative">
      {/* Decorative Background Aura Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/[0.04] dark:bg-indigo-500/[0.01] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10 space-y-12">
        {/* ─── SECTION HEADER WITH ANIMATION ─── */}
        <div className="flex flex-col items-center text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 text-[11px] font-black uppercase tracking-widest"
          >
            <FiZap className="fill-current" /> Explore Marketplace
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-black tracking-tight text-slate-800 dark:text-zinc-100 uppercase"
          >
            Latest Featured Tasks
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-zinc-500 max-w-md leading-relaxed"
          >
            Apply to the most recent open tasks submitted directly by verified
            platform employers.
          </motion.p>
        </div>

        {/* ─── TASKS GRID COMPONENT PANEL ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tasks.map((task) => (
            <Link href={`/browse-tasks/${task?._id}`} key={task?._id}>
              <motion.div variants={cardVariants} className="h-full flex">
                <Card className="bg-white dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-900 shadow-sm rounded-2xl h-full w-full flex flex-col justify-between overflow-hidden group hover:scale-[1.03] hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/[0.03] dark:hover:shadow-indigo-500/[0.01] transition-all duration-300 ease-out relative">
                  {/* Visual Accent Top Line on Hover */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Card Top: Title & Category */}
                  <Card.Header className="p-5 pb-2 flex flex-col items-start space-y-2">
                    <div className="flex items-center justify-between w-full">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-900 px-2 py-0.5 rounded-md border border-slate-200/40 dark:border-zinc-800/60">
                        <FiFolder className="w-3 h-3" /> {task.category}
                      </span>
                      <FiArrowUpRight className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all w-4 h-4" />
                    </div>

                    <Card.Title className="text-base font-black tracking-tight text-slate-800 dark:text-zinc-100 group-hover:text-indigo-500 transition-colors line-clamp-2 pt-1">
                      {task.title}
                    </Card.Title>
                  </Card.Header>

                  {/* Card Center: Client Identity Metadata */}
                  <Card.Content className="p-5 py-2 grow">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-zinc-400 bg-slate-50/50 dark:bg-zinc-900/30 p-2.5 rounded-xl border border-slate-100 dark:border-zinc-900/40">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                        <FiUser className="w-3 h-3" />
                      </div>
                      <span className="truncate" title={task.clientEmail}>
                        {task.clientEmail}
                      </span>
                    </div>
                  </Card.Content>

                  {/* Card Bottom: Financials & Countdown Deliveries */}
                  <Card.Footer className="p-5 pt-3 border-t border-slate-100 dark:border-zinc-900/60 flex items-center justify-between bg-slate-50/30 dark:bg-zinc-950/20">
                    {/* Budget View Box */}
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                        Budget
                      </span>
                      <span className="text-base font-black text-emerald-500 flex items-center mt-0.5">
                        <FiDollarSign className="w-4 h-4 -mr-0.5 shrink-0" />
                        {task.budget}
                      </span>
                    </div>

                    {/* Deadline Metrics Block */}
                    <div className="flex flex-col text-right">
                      <span className="text-[9px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                        Due Date
                      </span>
                      <span className="text-xs font-bold text-slate-600 dark:text-zinc-300 flex items-center gap-1 mt-1 justify-end">
                        <FiCalendar className="w-3.5 h-3.5 text-slate-400" />
                        {task.deadline}
                      </span>
                    </div>
                  </Card.Footer>
                </Card>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* No Data Fallback Placeholder */}
        {tasks.length === 0 && (
          <p className="text-center text-xs font-semibold text-slate-400 py-10">
            No active featured tasks available right now.
          </p>
        )}
      </div>
    </section>
  );
}
