// src/app/dashboard/freelancer/profile/FreelancerProfileClient.jsx
"use client";

import React from "react";
import { Card, Button, Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import {
  FiBriefcase,
  FiMail,
  FiDollarSign,
  FiAward,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

export default function FreelancerProfileClient({ profile }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* 🔹 Left Side: Main Profile Card (lg: 4 Columns) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="lg:col-span-4 w-full"
      >
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center">
          {/* Profile Image & Avatar Container */}
          <div className="relative mb-4">
            <Avatar className="w-24 h-24 rounded-2xl text-large border-3 border-indigo-500 shadow-md">
              <Avatar.Image
                referrerPolicy="no-referrer"
                src={profile?.image}
                alt={profile?.name}
                className="object-cover rounded-2xl"
              />
              <Avatar.Fallback className="font-black">SU</Avatar.Fallback>
            </Avatar>
          </div>

          {/* Name & Role Designation */}
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {profile?.name}
          </h2>
          <span className="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-1 flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded-full border border-indigo-100/10">
            <FiBriefcase className="w-3 h-3" /> {profile?.role}
          </span>

          {/* 🌟 Dynamic Rating & Reviews Bar */}
          <div className="flex items-center gap-1.5 mt-4 bg-slate-50 dark:bg-slate-950/40 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-800/60">
            <div className="flex text-amber-400 gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`w-3.5 h-3.5 ${star <= Math.round(profile?.averageRating) ? "fill-current" : "text-slate-200 dark:text-slate-800"}`}
                />
              ))}
            </div>
            <span className="text-xs font-black text-slate-800 dark:text-white pl-1 border-l border-slate-200 dark:border-slate-700">
              {profile?.averageRating?.toFixed(1)}
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              ({profile?.totalReviews} review)
            </span>
          </div>

          <hr className="w-full my-5 border-slate-100 dark:border-slate-800/80" />

          {/* Contact Details & Rate Information Metrics */}
          <div className="w-full space-y-3.5 text-left">
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <FiMail className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="overflow-hidden">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">
                  Email Address
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate block">
                  {profile?.email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <FiDollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">
                  Hourly Rate
                </span>
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  ${profile?.hourlyRate}/hr
                </span>
              </div>
            </div>
          </div>

          {/* Profile Action Trigger */}
          <Button
            className="w-full mt-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl shadow-sm hover:opacity-90 transition-opacity py-5"
            variant="solid"
          >
            Edit Profile
          </Button>
        </Card>
      </motion.div>

      {/* 🔹 Right Side: Detailed Profile Information (lg: 8 Columns) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="lg:col-span-8 w-full space-y-6"
      >
        {/* 1. Professional Biography Card */}
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <FiAward className="text-indigo-500 w-4 h-4" />
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
              Professional Bio
            </h3>
          </div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-950/10 p-4 rounded-xl border border-slate-100 dark:border-slate-800/20">
            &ldquo;{profile?.bio}&rdquo;
          </p>
        </Card>

        {/* 2. Expertise & Technical Skills Grid */}
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FiClock className="text-indigo-500 w-4 h-4" />
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
              Expertise & Technical Skills
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.skills?.map((skill, index) => (
              <span
                key={index}
                className="text-xs font-extrabold px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-100/10 hover:scale-105 transition-transform cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>

        {/* 3. Quick Stats Overview Highlight Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl shadow-sm flex flex-row items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-500">
              <FaStar className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Success Score
              </span>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                100% Top Rated
              </h4>
            </div>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl shadow-sm flex flex-row items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500">
              <FiCheckCircle className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Total Jobs
              </span>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                {profile?.totalReviews} Completed
              </h4>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
