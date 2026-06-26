// src/app/browse-freelancers/[id]/page.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { FiArrowLeft, FiStar, FiDollarSign, FiMail, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";



export default function DetailsInfo({freelancer}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 pb-20 selection:bg-indigo-500/30">
      
      {/* ─── TOP BAR SECTION ─── */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-4">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white bg-white dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-900 px-4 py-2.5 rounded-xl shadow-sm transition-colors group"
        >
          <FiArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
          Back to Browse
        </motion.button>
      </div>

      {/* ─── MAIN PROFILE DETAILS CONTAINER ─── */}
      <div className="max-w-4xl mx-auto px-4 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card className="bg-white dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-900 shadow-sm rounded-3xl overflow-hidden flex flex-col justify-between">
            
            {/* 🎯 Card Header: Profile Hero Block */}
            <Card.Header className="p-6 sm:p-8 pb-4 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left justify-between gap-6 border-b border-slate-100 dark:border-zinc-900/60 bg-gradient-to-b from-slate-50/50 to-transparent dark:from-zinc-950/30">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Avatar frame */}
                <div className="relative">
                  <Image 
                    src={freelancer?.image} 
                    alt={freelancer?.name} 
                    width={300}
                    height={300}
                    className="w-24 h-24 rounded-full border-2 border-slate-200 dark:border-zinc-800 bg-slate-100 object-cover shadow-inner"
                  />
                  <div className="absolute bottom-1 right-1 bg-indigo-500 text-white p-1 rounded-full border-2 border-white dark:border-zinc-950">
                    <FiCheckCircle className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Identity info */}
                <div className="space-y-1">
                  <Card.Title className="text-2xl font-black tracking-tight text-slate-900 dark:text-zinc-100">
                    {freelancer?.name}
                  </Card.Title>
                  <Card.Description className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
                    {freelancer?.role}
                  </Card.Description>
                  <p className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-slate-400 dark:text-zinc-500">
                    <FiMail className="w-3.5 h-3.5" /> {freelancer?.email}
                  </p>
                </div>
              </div>

              {/* Rating Summary Grid box */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-500 text-sm font-black shrink-0">
                <FiStar className="fill-current w-4 h-4" />
                <span>{freelancer?.averageRating?freelancer.averageRating.toFixed(1):0}</span>
                <span className="text-xs font-bold text-slate-400 dark:text-zinc-500">({freelancer.totalReviews} review)</span>
              </div>
            </Card.Header>

            {/* 🎯 Card Content: Biography & Skills Grid matrix */}
            <Card.Content className="p-6 sm:p-8 space-y-8 flex-grow">
              
              {/* Bio Block */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                  About Me
                </h3>
                <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-600 dark:text-zinc-300 max-w-3xl">
                  {freelancer.bio}
                </p>
              </div>

              {/* Skills Mesh framework */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                  Core Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {freelancer?.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card.Content>

            {/* 🎯 Card Footer: Rate & Metadata Block */}
            <Card.Footer className="p-6 sm:p-8 pt-4 border-t border-slate-100 dark:border-zinc-900/60 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/30 dark:bg-zinc-950/20">
              {/* Rate Metrics counter */}
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 text-indigo-500 border border-indigo-500/10">
                  <FiDollarSign className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest block">Hourly Rate</span>
                  <span className="text-xl font-black text-slate-800 dark:text-zinc-100">
                    ${freelancer?.hourlyRate}<span className="text-xs font-bold text-slate-400"> / hr</span>
                  </span>
                </div>
              </div>

              {/* Registration Meta Date box */}
              <div className="flex items-center gap-2 text-right">
                <div className="hidden sm:block text-right">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest block">Member Since</span>
                  <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5 justify-end">
                    <FiCalendar className="w-3.5 h-3.5" />
                    {new Date(freelancer?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </Card.Footer>

          </Card>
        </motion.div>
      </div>

    </div>
  );
}