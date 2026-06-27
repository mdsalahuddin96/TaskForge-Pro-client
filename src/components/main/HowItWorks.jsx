"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiEdit3, FiLayers, FiCheckSquare } from "react-icons/fi";

const steps = [
  {
    icon: <FiEdit3 className="w-6 h-6" />,
    title: "Post Your Task",
    desc: "Create a task by adding a clear title, detailed description, budget, category, and deadline so freelancers understand exactly what you need.",
  },
  {
    icon: <FiLayers className="w-6 h-6" />,
    title: "Receive Proposals",
    desc: "Freelancers submit proposals for your task. Compare their offers, experience, and pricing to choose the best match for your project.",
  },
  {
    icon: <FiCheckSquare className="w-6 h-6" />,
    title: "Hire & Complete",
    desc: "Accept a proposal, collaborate with your freelancer, review the submitted work, and complete payment securely after successful delivery.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white dark:bg-black relative border-b border-slate-100 dark:border-zinc-900/50">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 dark:text-zinc-100 uppercase">
            How TaskForge Pro Works
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-zinc-500 max-w-sm mx-auto">
            An easy 3-step structured guide to get your tasks executed
            seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col items-center text-center p-6 bg-slate-50/50 dark:bg-zinc-950/40 border border-slate-200/50 dark:border-zinc-900 rounded-2xl relative group"
            >
              <div className="w-14 h-14 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-base font-black text-slate-800 dark:text-zinc-200 mb-2 uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="text-xs font-medium text-slate-400 dark:text-zinc-500 leading-relaxed">
                {step.desc}
              </p>
              {idx < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-slate-200 dark:bg-zinc-800 z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
