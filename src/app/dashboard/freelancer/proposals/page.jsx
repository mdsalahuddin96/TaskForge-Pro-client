import React from "react";
import { getUserSession } from "@/lib/core/session";
import { getFreelancerProposals } from "@/lib/api/getFreelancerProposals";
import ProposalsTable from "./ProposalsTable";




export default async function MyProposalsPage() {
  const user=await getUserSession()
  const proposals = await getFreelancerProposals(user?.email);
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950  py-8  md:px-8">
      <div className="max-w-7xl mx-auto">
        <ProposalsTable proposals={proposals} />
      </div>
    </div>
  );
}