"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiLock, FiArrowLeft, FiLogIn, FiKey } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 flex items-center justify-center relative overflow-hidden selection:bg-indigo-500/20">
      {/* 1. Subtle Engineering Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* 2. Soft Indigo Radial Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-indigo-500/[0.07] dark:bg-indigo-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

      {/* ─── INTERACTION CARD LAYER ─── */}
      <div className="max-w-md w-full px-6 text-center relative z-10 flex flex-col items-center space-y-7">
        
        {/* Animated Cyber Security Key Frame */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="w-20 h-20 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center relative z-10 shadow-sm"
          >
            <FiLock className="w-9 h-9" />
          </motion.div>
          
          {/* Back Floating Secondary Key Component Icon */}
          <motion.div 
            animate={{ y: [-2, 3, -2] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="absolute -top-2 -right-3 bg-slate-900 dark:bg-zinc-900 border border-slate-800 text-amber-400 p-1.5 rounded-lg shadow-md"
          >
            <FiKey className="w-3.5 h-3.5" />
          </motion.div>
        </div>

        {/* Numerical Identity Block Context */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-1"
        >
          <span className="text-xs font-black tracking-widest text-indigo-500 uppercase">
            Error Code 401
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 dark:text-zinc-100">
            Unauthorized Session
          </h1>
        </motion.div>

        {/* Operational Context Description */}
        <motion.p 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-sm font-medium text-slate-400 dark:text-zinc-500 leading-relaxed max-w-sm mx-auto"
        >
          Your authentication token is missing, invalid, or has expired. Please log in with valid credentials to re-initialize your workspace.
        </motion.p>

        {/* ─── INTERACTION TERMINALS ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          {/* Fallback Return Route Button */}
          <button 
            onClick={() => router.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider rounded-xl bg-white hover:bg-slate-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 shadow-sm transition-colors group"
          >
            <FiArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
            Go Back
          </button>

          {/* Secure Login Redirection Action Terminal */}
          <button 
            onClick={() => router.push("/login")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black shadow-sm transition-colors group/btn"
          >
            <FiLogIn className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform" />
            Login Now
          </button>
        </motion.div>

        {/* Security Meta Ledger Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-wider pt-4"
        >
          Authentication Filter Validation Framework
        </motion.div>

      </div>
    </div>
  );
}