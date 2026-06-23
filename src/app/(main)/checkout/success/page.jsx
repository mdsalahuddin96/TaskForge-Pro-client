
import React from 'react';
import Link from 'next/link';
import { FiCheckCircle, FiArrowRight, FiBriefcase, FiUser, FiDollarSign } from 'react-icons/fi';
import { getProposalById } from '@/lib/api/getProposalById';

const SuccessPage = async ({ searchParams }) => {
    const { proposalId } = await searchParams;
    const proposal = await getProposalById(proposalId);
    // সেফটি চেক: ডাটা না থাকলে বা এরর হলে হ্যান্ডেল করার জন্য
    if (!proposal) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
                <div className="text-center font-medium text-slate-500">Loading receipt or proposal not found...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 font-sans">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 sm:p-8 shadow-sm text-center">
                
                {/* ১. সাকসেস ট্রানজেকশন অ্যানিমেশন/আইকন এবং মেসেজ */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mb-4">
                        <FiCheckCircle className="text-emerald-500 w-10 h-10 stroke-[2.5]" />
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-1">
                        Payment Successful!
                    </h1>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                        Your transaction has been safely processed.
                    </p>
                </div>

                {/* ২. টাস্ক টাইটেল, ওয়ার্কার নেম এবং প্রাইজ ডিসপ্লে বক্স */}
                <div className="bg-slate-50/60 dark:bg-slate-950/40 rounded-2xl p-5 text-left border border-slate-100 dark:border-slate-800/40 space-y-4 mb-6">
                    
                    {/* টাস্ক টাইটেল */}
                    <div className="flex items-start gap-3">
                        <FiBriefcase className="text-slate-400 mt-0.5 shrink-0" />
                        <div>
                            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Project Title</span>
                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight block mt-0.5">
                                {proposal?.taskTitle}
                            </span>
                        </div>
                    </div>

                    {/* ওয়ার্কার নেম */}
                    <div className="flex items-start gap-3">
                        <FiUser className="text-slate-400 mt-0.5 shrink-0" />
                        <div>
                            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hired Freelancer</span>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mt-0.5">
                                {proposal?.freelancerName || "N/A"}
                            </span>
                            <span className="text-xs text-slate-400 block">{proposal?.freelancerEmail}</span>
                        </div>
                    </div>

                    <hr className="border-slate-200/60 dark:border-slate-800/60 my-2" />

                    {/* প্রাইজ সাইজ / এমাউন্ট */}
                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            <FiDollarSign className="text-slate-400" /> Total Paid
                        </div>
                        <div className="text-xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                            ${proposal?.proposedBudget} <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-normal ml-0.5">USD</span>
                        </div>
                    </div>
                </div>

                {/* ৩. ইজি ন্যাভিগেশন বাটন "Go to Dashboard" */}
                <Link
                    href="/dashboard/client"
                    className="w-full inline-flex items-center justify-center gap-2 font-black text-sm tracking-wide rounded-xl py-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/10 dark:shadow-none transition-all"
                >
                    Go to Dashboard <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                <p className="text-[10px] text-slate-400 font-medium mt-4">
                    A receipt has been sent to your email. ID: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-500 font-mono">{proposal?._id}</code>
                </p>
            </div>
        </div>
    );
};

export default SuccessPage;