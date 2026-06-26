"use client";

import React from "react";
import { motion } from "framer-motion";
import {  FiArrowLeft, FiHome, FiLock, FiShield } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Forbidden() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 flex items-center justify-center relative overflow-hidden selection:bg-rose-500/20">
      
      {/* ─── BACKGROUND CONFIGURATION ─── */}
      {/* 1. Technical Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* 2. Soft Rose/Crimson Radial Glow to indicate restriction */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-rose-500/[0.06] dark:bg-rose-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

      {/* ─── MAIN CARD INTERACTION CONTAINER ─── */}
      <div className="max-w-md w-full px-6 text-center relative z-10 flex flex-col items-center space-y-7">
        
        {/* Animated Icon Security Badge */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-20 h-20 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center relative z-10"
          >
            <FiShield className="w-10 h-10" />
          </motion.div>
          
          {/* Decorative Back Floating Ring Lock Icon */}
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-3 -right-3 bg-slate-900 dark:bg-zinc-900 border border-slate-800 text-slate-400 p-1.5 rounded-lg shadow-md"
          >
            <FiLock className="w-3.5 h-3.5" />
          </motion.div>
        </div>

        {/* Error Numerical String Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-1"
        >
          <span className="text-xs font-black tracking-widest text-rose-500 uppercase">
            Error Code 403
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 dark:text-zinc-100">
            Forbidden Access
          </h1>
        </motion.div>

        {/* Informative Text Description */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-sm font-medium text-slate-400 dark:text-zinc-500 leading-relaxed max-w-sm mx-auto"
        >
          You do not have the required clearance or administrator role privileges to access this secure zone resource.
        </motion.p>

        {/* ─── ACTION TERMINALS ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          {/* Go Back button */}
          <button 
            onClick={() => router.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider rounded-xl bg-white hover:bg-slate-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 shadow-sm transition-colors group"
          >
            <FiArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
            Go Back
          </button>

          {/* Secure Route Dashboard Redirect */}
          <button 
            onClick={() => router.push("/")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black shadow-sm transition-colors"
          >
            <FiHome className="w-4 h-4" />
            Return Home
          </button>
        </motion.div>

        {/* Security Help Desk Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-wider pt-4"
        >
          Secured Workspace Environment System
        </motion.div>

      </div>
    </div>
  );
}