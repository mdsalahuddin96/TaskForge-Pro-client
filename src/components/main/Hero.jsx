"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { FiPlusCircle, FiSearch, FiArrowRight } from "react-icons/fi";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };
  const user = "Client";
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, delay: 0.1 },
    },
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-tr from-slate-50 via-white to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-6 py-20">
      {/* ================= Animated glow Background ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.25, 0.9, 1],
            opacity: [0.25, 0.55, 0.35, 0.25],
            x: [0, 40, -30, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-1/4 w-[380px] h-[380px] bg-indigo-500/30 blur-[90px] rounded-full dark:bg-indigo-600/15"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 0.85, 1],
            opacity: [0.2, 0.5, 0.3, 0.2],
            x: [0, -40, 30, 0],
            y: [0, 30, -40, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-12 right-1/4 w-[320px] h-[320px] bg-purple-500/30 blur-[90px] rounded-full dark:bg-purple-600/15"
        />
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center"
      >
        {/* Badge*/}
        <motion.div
          variants={badgeVariants}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-indigo-600 dark:border-indigo-900/30 dark:bg-indigo-950/30 dark:text-indigo-400 text-xs font-semibold mb-6 shadow-sm"
        >
          <span>🚀 Quantum Gigs Marketplace</span>
          <FiArrowRight className="w-3 h-3" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] max-w-3xl"
        >
          Get your tasks done by{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400">
            skilled freelancers
          </span>
        </motion.h1>

        {/* Sub Text */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-relaxed"
        >
          TaskForge Pro is a simplified micro-task marketplace. Post small,
          simple jobs like fixing a CSS bug, writing articles, or designing
          logos, and instantly connect with top talent for fast, one-time
          execution.
        </motion.p>

        {/* Action Button */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Post a Task Button (Client) */}
          {user === "Client" && (
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/15 hover:from-indigo-700 hover:to-violet-700 hover:scale-105 transition duration-300 flex items-center justify-center gap-2"
            >
              <FiPlusCircle className="w-5 h-5" />
              <span>Post a Task</span>
            </Button>
          )}

          {/* Browse Tasks Button (Freelancer) */}
          {user === "Freelancer" && (
            <Button
              size="lg"
              variant="bordered"
              className="w-full sm:w-auto px-8 py-6 border-2 border-slate-200 dark:border-slate-800 font-bold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 hover:scale-105 dark:hover:bg-slate-900 transition duration-300 flex items-center justify-center gap-2"
            >
              <FiSearch className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              <span>Browse Tasks</span>
            </Button>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
