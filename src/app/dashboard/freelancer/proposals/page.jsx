import React from "react";
import { getUserSession } from "@/lib/core/session";
import { getMyProposals } from "@/lib/api/getMyProposals";
import ProposalsTable from "./ProposalsTable";




export default async function MyProposalsPage() {
  const user=await getUserSession()
  const proposals = await getMyProposals(user?.email);
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ProposalsTable proposals={proposals} />
      </div>
    </div>
  );
}