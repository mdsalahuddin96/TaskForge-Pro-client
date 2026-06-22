import { Input, Button } from "@heroui/react";
import { FiArrowLeft, FiLock, FiShoppingBag } from "react-icons/fi";
import toast from "react-hot-toast";
import PaymentForm from "./PaymentForm";
import { getProposalById } from "@/lib/api/getProposalById";
import Link from "next/link";
import { requiredRole } from "@/lib/core/session";

export default async function CheckoutClient({ searchParams }) {
  await requiredRole("Client");
  const { proposalId } = await searchParams;
  // Jodi ProposalID na thake taile kico kj korte hobe

  const proposal = await getProposalById(proposalId);
  const { proposedBudget, freelancerEmail, taskTitle, taskId } = proposal;
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* বাম পাশ: অর্ডার সামারি ও ব্র্যান্ডিং (Slate/Indigo থিম) */}
        <div className="md:col-span-5 space-y-6 md:sticky md:top-8">
          {/* ব্যাক টু প্রোপোজাল বাটন */}
          <Link
            href={`/dashboard/client/my-tasks/${taskId}`}
            className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-bold bg-transparent"
          >
            <FiArrowLeft /> Back to proposals
          </Link>

          {/* প্ল্যাটফর্ম ব্র্যান্ড হেডার */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <FiShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none">
                Secure Checkout
              </h2>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                End-to-End Encrypted
              </span>
            </div>
          </div>

          {/* বড় প্রাইস ডেসক্রিপশন */}
          <div className="pt-2">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Due Today
            </span>
            <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
              ${proposedBudget}{" "}
              <span className="text-xl font-bold text-slate-400">USD</span>
            </h1>
          </div>

          {/* মিনিমালিস্ট ইনভয়েস কার্ড */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-start gap-4">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Freelancer Email
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[180px]">
                {freelancerEmail}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-slate-50 dark:border-slate-800/60 pt-4">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Amount
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                ${proposedBudget}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-slate-50 dark:border-slate-800/60 pt-4 text-base font-black">
              <span className="text-slate-900 dark:text-white">Total</span>
              <span className="text-indigo-600 dark:text-indigo-400">
                ${proposedBudget} USD
              </span>
            </div>
          </div>

          {/* Security Tagline */}
          <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5 justify-center lg:justify-start">
            <FiLock className="text-emerald-500" /> Your payment is secured via
            fully tokenized integration.
          </p>
        </div>

        {/* ডান পাশ: পেমেন্ট গেটওয়ে কার্ড ইন্টারফেস */}
        <div className="md:col-span-7">
          <PaymentForm amount={proposedBudget} />
        </div>
      </div>
    </div>
  );
}
