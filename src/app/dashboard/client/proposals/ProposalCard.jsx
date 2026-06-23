import React from "react";
import { Chip, Button } from "@heroui/react";
import {
  FiCheck,
  FiX,
  FiCalendar,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import Link from "next/link";

export default function ProposalCard({ proposal }) {
  // Date convert function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className=" bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 sm:p-6 shadow-sm transition-all hover:shadow-md">
      {/* Title badge and action button*/}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            {proposal?.taskTitle}
          </h3>
          <Chip
            size="sm"
            variant="flat"
            color="warning"
            className="capitalize text-xs font-semibold px-2 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-none h-6 rounded-md"
          >
            {proposal?.status}
          </Chip>
        </div>

        {/* (Accept & Reject) */}
        {proposal.status.toLowerCase() === "pending" && (
          <div className="flex items-center gap-2 self-end sm:self-center">
            <Link
              href={`/checkout?proposalId=${proposal?._id}`}
              size="sm"
              className="bg-[#00c875] hover:bg-[#00b368] text-white font-bold px-4 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 text-xs transition-colors"
            >
              <FiCheck className="stroke-[3px] text-sm" /> Accept
            </Link>
            <Button
              size="sm"
              variant="bordered"
              className="border-slate-200 dark:border-slate-800 text-[#ff4d4d] hover:bg-red-50 dark:hover:bg-red-950/20 font-bold px-4 py-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-colors bg-white dark:bg-transparent"
              // onPress={() => onReject(proposal)}
            >
              <FiX className="stroke-[3px] text-sm" /> Reject
            </Button>
          </div>
        )}
      </div>

      {/* ফ্রিল্যান্সার ইমেইল সাব-হেডিং */}
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-normal">
        from{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {proposal.freelancerEmail}
        </span>
      </div>

      {/* কভার লেটার বক্স (ইমেজ_9e7e5d.png এর মতো হালকা ব্যাকগ্রাউন্ড কন্টেইনার) */}
      <div className="bg-slate-50/50 dark:bg-slate-950/20 rounded-xl mb-1 text-sm text-slate-600 dark:text-slate-400/90 leading-relaxed font-normal min-h-[50px]">
        {proposal.coverLetter}
      </div>

      {/* মেটাডেটা ফুটার (বাজেট, দিন এবং ডেট) */}
      <div className="flex items-center gap-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium flex-wrap">
        <div className="flex items-center gap-1">
          <FiDollarSign className="text-slate-400 text-sm" />
          <span>Bid:</span>
          <span className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center mt-0.5">
            ${proposal.proposedBudget}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FiClock className="text-slate-400 text-sm" />
          <span>{proposal.estimatedDays} days</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 font-normal">
          <FiCalendar className="text-sm" />
          <span>{formatDate(proposal?.submittedAt)}</span>
        </div>
      </div>
    </div>
  );
}
