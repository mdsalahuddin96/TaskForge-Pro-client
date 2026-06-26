// src/app/browse-freelancers/page.jsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@heroui/react"; // HeroUI Card package
import {
  FiSearch,
  FiSliders,
  FiStar,
  FiDollarSign,
  FiAward,
  FiArrowRight,
} from "react-icons/fi";
import { getAllFreelancer } from "@/lib/api/getAllFreelancer";
import Image from "next/image";
import Link from "next/link";

export default function BrowseFreelancers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    const fetchFreelancer = async () => {
      const freelancers = await getAllFreelancer();
      setFreelancers(freelancers);
    };
    fetchFreelancer();
  }, []);
  const filteredFreelancers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return freelancers;

    return freelancers.filter((freelancer) => {
      const matchName = freelancer?.name.toLowerCase().includes(query);
      const matchSkills = freelancer?.skills.some((skill) =>
        skill.toLowerCase().includes(query),
      );
      return matchName || matchSkills;
    });
  }, [searchQuery, freelancers]);

  // Framer Motion Layout Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };
  console.log(freelancers);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 pb-20 selection:bg-indigo-500/30">
      {/* ─── HEADER SECTION ─── */}
      <div className="relative overflow-hidden border-b border-slate-200/60 dark:border-slate-900 bg-white dark:bg-zinc-950 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest"
          >
            <FiAward /> Global Talent Pool
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight font-sans max-w-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-zinc-400 bg-clip-text text-transparent"
          >
            Find & Hire Expert Freelancers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 max-w-lg font-medium leading-relaxed"
          >
            Explore top-rated developers and designers verified by our quality
            assurance filter framework.
          </motion.p>

          {/* Search Input Bar Controlled Component */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-xl flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl shadow-inner focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all"
          >
            <div className="flex items-center pl-3 text-slate-400">
              <FiSearch className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by name or specific skills (e.g., React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 outline-none text-sm font-medium py-2 placeholder-slate-400 dark:placeholder-zinc-500 text-slate-800 dark:text-zinc-100"
            />
            <button className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors">
              <FiSliders className="w-3 h-3" /> Filter
            </button>
          </motion.div>
        </div>
      </div>

      {/* ─── FREELANCERS GRID SECTION ─── */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        {/* Dynamic Items Counter View */}
        <div className="mb-6 text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
          Showing {filteredFreelancers.length}{" "}
          {filteredFreelancers.length === 1 ? "Freelancer" : "Freelancers"}
        </div>

        {/* AnimatePresence helps smoothly animate lists on filter removal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredFreelancers.map((freelancer) => (
              <motion.div
                key={freelancer?._id}
                variants={itemVariants}
                layout
                exit="exit"
              >
                <Card className="bg-white dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-900 shadow-sm rounded-2xl h-full flex flex-col justify-between overflow-hidden group hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/[0.04] dark:hover:shadow-indigo-500/[0.02] transition-all duration-300 ease-out">
                  {/* Card Header Section */}
                  <Card.Header className="p-5 pb-3 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <Image
                        src={freelancer?.image}
                        alt={freelancer?.name}
                        width={200}
                        height={200}
                        className="w-12 h-12 rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50 object-cover"
                      />
                      <div>
                        <Card.Title className="text-base font-black tracking-tight text-slate-800 dark:text-zinc-100 group-hover:text-indigo-500 transition-colors">
                          {freelancer?.name}
                        </Card.Title>
                        <Card.Description className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mt-0.5">
                          {freelancer?.role}
                        </Card.Description>
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/5 border border-amber-500/20 text-amber-500 text-xs font-bold shrink-0">
                      <FiStar className="fill-current w-3 h-3" />
                      <span>
                        {freelancer.averageRating
                          ? freelancer.averageRating.toFixed(1)
                          : 0}
                      </span>
                    </div>
                  </Card.Header>

                  {/* Card Content Section */}
                  <Card.Content className="px-5 py-2 flex-grow space-y-4">
                    <p className="text-xs sm:text-[13px] font-medium leading-relaxed text-slate-500 dark:text-zinc-400 line-clamp-2">
                      {freelancer?.bio}
                    </p>

                    {/* Skills Badge Row */}
                    <div className="flex flex-wrap gap-1.5">
                      {freelancer?.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 text-slate-600 dark:text-zinc-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card.Content>

                  {/* Card Footer Section */}
                  <Card.Footer className="p-5 pt-3 border-t border-slate-100 dark:border-zinc-900/60 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-950/40">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                        Rate
                      </span>
                      <span className="text-base font-black text-slate-800 dark:text-zinc-200 flex items-center">
                        <FiDollarSign className="w-3.5 h-3.5 -mr-0.5 text-indigo-500" />
                        {freelancer?.hourlyRate}
                        <span className="text-xs font-bold text-slate-400">
                          /hr
                        </span>
                      </span>
                    </div>

                    <Link
                      href={`/browse-freelancers/${freelancer?._id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl bg-slate-100 hover:bg-indigo-600 dark:bg-zinc-900 dark:hover:bg-indigo-600 text-slate-700 hover:text-white dark:text-zinc-300 dark:hover:text-white transition-all shadow-sm group/btn"
                    >
                      View Profile
                      <FiArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </Card.Footer>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State Matrix View */}
        {filteredFreelancers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full text-center py-20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl"
          >
            <p className="text-sm font-bold text-slate-400 dark:text-zinc-500">
              No freelancers matched your specific search criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
