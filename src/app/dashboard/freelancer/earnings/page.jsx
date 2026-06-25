// src/app/dashboard/freelancer/earnings/page.jsx
import React from "react";
import EarningsClientPage from "./EarningsClientPage";
import { getUserSession } from "@/lib/core/session";
import { getFreelancerEarnings } from "@/lib/api/getFreelancerEarning";

export default async function MyEarningsPage() {
  const user=await getUserSession()
  const response = await getFreelancerEarnings(user?.email);
  console.log(response)
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full space-y-10">
      {/* Header text component */}
      <div className="text-left">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          My Earnings
        </h1>
        <p className="text-sm text-slate-400 font-medium mt-1">
          A complete historical breakdown list of finished tasks and payments received.
        </p>
      </div>

      <EarningsClientPage 
        initialData={response?.data || []} 
        totalEarnings={response?.totalEarnings || 0} 
      />
    </div>
  );
}