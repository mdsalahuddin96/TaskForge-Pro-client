"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Avatar, Button, Chip } from "@heroui/react";
import {
  FiMail,
  FiCalendar,
  FiShield,
  FiEdit3,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { useSession } from "@/lib/auth-client";

export default function ClientProfilePage() {
  const { data } = useSession();
  const clientData = data?.user;

  // Format the ISO date string to a readable format (e.g., June 18, 2026)
  const convertDate = (dateString) => {
    const memberSince = new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return memberSince;
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Main animated container wrapper */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header Profile Card */}
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 sm:p-8 shadow-sm">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                {/* Framer motion wrapper for avatar hover effect */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Avatar className="h-24 w-24 rounded-2xl border-3 border-indigo-500 shadow-md">
                    <Avatar.Image
                      src={clientData?.image}
                      alt={clientData?.name}
                      referrerPolicy="no-referrer"
                      className="object-cover "
                    />

                    <Avatar.Fallback className="text-xl font-bold bg-indigo-50 text-indigo-600">
                      {clientData?.name
                        ? clientData.name.slice(0, 2).toUpperCase()
                        : "JD"}
                    </Avatar.Fallback>
                  </Avatar>
                </motion.div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                      {clientData?.name}
                    </h1>
                    <Chip
                      size="sm"
                      variant="flat"
                      color="primary"
                      className="font-bold text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 capitalize"
                    >
                      {clientData?.role}
                    </Chip>
                  </div>
                  <p className="text-sm font-medium text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                    <FiMail className="w-4 h-4 text-slate-400/80" />{" "}
                    {clientData?.email}
                  </p>
                </div>
              </div>

              {/* Edit Profile Action Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/dashboard/client/profile/edit" // Your profile edit route path
                  className="font-bold text-sm bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-600/10 px-5 py-2.5 flex items-center gap-2 group"
                >
                  <FiEdit3 className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  Edit Profile
                </Link>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Account Details Matrix */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Verification Status Card */}
          <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl border ${
                  clientData?.emailVerified
                    ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-600"
                    : "bg-amber-50/50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30 text-amber-500"
                }`}
              >
                {clientData?.emailVerified ? (
                  <FiCheckCircle className="w-5 h-5" />
                ) : (
                  <FiXCircle className="w-5 h-5" />
                )}
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Email Verification
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {clientData?.emailVerified
                    ? "Verified Account"
                    : "Pending Verification"}
                </span>
              </div>
            </div>
          </Card>

          {/* Account Status Card */}
          <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl border ${
                  !clientData?.isBlocked
                    ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-600"
                    : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30 text-rose-500"
                }`}
              >
                <FiShield className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Account Status
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {clientData?.isBlocked
                    ? "Blocked / Restricted"
                    : "Active / Standing Good"}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Security & System Metadata Info Section */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800/40 text-slate-400">
                  <FiCalendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Member Since
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {convertDate(clientData?.createdAt)}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right sm:ml-auto">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Unique Identification Reference
                </span>
                <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                  {clientData?.id}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
