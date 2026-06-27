import React from 'react';
import ProposalCard from './ProposalCard';
import { getClientProposals } from '@/lib/api/getClientProposals';
import { getUserSession } from '@/lib/core/session';
import { FiInbox, FiPlusCircle } from 'react-icons/fi';
import Link from 'next/link';

const ProposalPage = async () => {
    const client = await getUserSession();
    const proposals = await getClientProposals(client?.email) || []; // Fallback empty array

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
            
            {/* Header section for page context */}
            <div className="flex flex-col gap-1 pb-4 border-b border-slate-100 dark:border-zinc-900">
                <h1 className="text-xl font-black text-slate-800 dark:text-zinc-100 uppercase tracking-tight">
                    Received Proposals
                </h1>
                <p className="text-xs font-semibold text-slate-400 dark:text-zinc-500">
                    Review and manage all incoming competitive bids for your active workspace contracts.
                </p>
            </div>

            {/* ─── CONDITIONAL RENDER CHECK ─── */}
            {proposals.length === 0 ? (
                /* Empty State Premium View Placeholder */
                <div className="w-full min-h-[40vh] border border-dashed border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/20 rounded-2xl flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
                    
                    {/* Subtle Background Glow Vector */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/[0.03] dark:bg-indigo-500/[0.01] blur-[80px] rounded-full pointer-events-none" />

                    {/* Styled Icon Framework Box */}
                    <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-400 dark:text-zinc-600 border border-slate-200/50 dark:border-zinc-800/80 flex items-center justify-center text-xl mb-5 relative z-10">
                        <FiInbox />
                    </div>

                    {/* Information Text Messaging */}
                    <h3 className="text-base font-black text-slate-800 dark:text-zinc-200 uppercase tracking-tight relative z-10">
                        No Proposals Available
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 dark:text-zinc-500 max-w-xs mt-1.5 leading-relaxed relative z-10">
                        There are currently no active freelancers pitched to your requirements. Try refining your task parameters or publish a new contract setup.
                    </p>

                    {/* Action Call to Redirect Node */}
                    <Link 
                        href="/dashboard/client/post-task" 
                        className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black shadow-sm transition-colors relative z-10"
                    >
                        <FiPlusCircle className="text-sm" />
                        Create New Task
                    </Link>
                </div>
            ) : (
                /* Main Data Collection List Pipeline */
                <div className="grid grid-cols-1 gap-4">
                    {proposals.map((proposal) => (
                        <ProposalCard key={proposal?._id} proposal={proposal} />
                    ))}
                </div>
            )}
            
        </div>
    );
};

export default ProposalPage;