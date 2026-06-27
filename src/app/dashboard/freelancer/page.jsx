// src/app/dashboard/freelancer/overview/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatsGrid from "./StatsGrid";
import EarningGraph from "./EarningGraph";
import RunningProjects from "./RunningProjects";
import { getFreelancerDashboardOverview } from "@/lib/api/getFreelancerDashboardOverview";
import { useSession } from "@/lib/auth-client";


export default function FreelancerOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
const {data:user}=useSession()
const freelancer=user?.user
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getFreelancerDashboardOverview(freelancer?.email)
        if (data) {
          setData(data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [freelancer?.email]);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto selection:bg-indigo-500/20"
    >
      {/* Dashboard Top Header Title */}
      <div>
        <h1 className="text-xl font-black text-slate-800 dark:text-zinc-100 tracking-tight uppercase">
          Workspace Overview
        </h1>
        <p className="text-xs font-semibold text-slate-400 dark:text-zinc-500 mt-0.5">
          Welcome back! Here&apos;s your production data analysis breakdown
          ecosystem context.
        </p>
      </div>

      {/* ─── 1. CORE STATISTICS GRID ─── */}
      <StatsGrid stats={data?.stats} />

      {/* ─── 2. DYNAMIC COMPONENT SPLIT TRACKER LAYOUT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Analytics Monthly Earning Graph */}
        <div className="lg:col-span-7 xl:col-span-8">
          <EarningGraph chartData={data?.monthlyEarnings} />
        </div>

        {/* Active Projects Tracker Panel */}
        <div className="lg:col-span-5 xl:col-span-4">
          <RunningProjects projects={data?.runningProjects} />
        </div>
      </div>
    </motion.div>
  );
}
