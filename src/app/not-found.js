"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiHome, FiHelpCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 flex items-center justify-center relative overflow-hidden selection:bg-indigo-500/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* 2. Indigo Radial Soft Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-indigo-500/10 dark:bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* ─── MAIN CARD CONTENT ─── */}
      <div className="max-w-md w-full px-6 text-center relative z-10 flex flex-col items-center space-y-8">
        
        {/* Large Animated 404 Counter */}
        <div className="relative select-none">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
            className="text-[120px] sm:text-[160px] font-black tracking-tighter leading-none bg-gradient-to-b from-slate-900 to-slate-400 dark:from-white dark:to-zinc-800 bg-clip-text text-transparent font-sans"
          >
            404
          </motion.h1>
          
          {/* Subtle Accent Tag */}
          <motion.span 
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: -4 }}
            transition={{ delay: 0.4 }}
            className="absolute -top-1 -right-3 bg-indigo-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider"
          >
            Lost
          </motion.span>
        </div>

        {/* Text Headline Context */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 dark:text-zinc-100">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-400 dark:text-zinc-500 leading-relaxed max-w-sm mx-auto">
            The destination URL you are looking for might have been removed, renamed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* ─── ACTION ROUTE BUTTONS ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-full flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          {/* Back Action button */}
          <button 
            onClick={() => router.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider rounded-xl bg-white hover:bg-slate-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 shadow-sm transition-colors group"
          >
            <FiArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
            Go Back
          </button>

          {/* Home Route button */}
          <button 
            onClick={() => router.push("/")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black shadow-sm transition-colors"
          >
            <FiHome className="w-4 h-4" />
            Dashboard Home
          </button>
        </motion.div>

        {/* Footer Link / Meta text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4 flex items-center gap-1.5 text-[11px] font-bold text-slate-400 dark:text-zinc-600"
        >
          <FiHelpCircle />
          <span>Need help? contact support at salauddincse96@gmail.com</span>
        </motion.div>

      </div>
    </div>
  );
}