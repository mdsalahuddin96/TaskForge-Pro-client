// src/app/dashboard/freelancer/projects/page.jsx
import React from "react";
import ActiveProjectsClient from "./ActiveProjectsClient";
import { getActiveProjects } from "@/lib/api/getActiveProjects";
import { getUserSession } from "@/lib/core/session";



export default async function ActiveProjectsPage() {
    const freelancer=await getUserSession()
  const projects = await getActiveProjects(freelancer?.email);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="mb-10 text-left">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Active Projects
        </h1>
        <p className="text-sm text-slate-400 font-medium mt-1">
          Track your active contract progress, submit deliverables, and view completed history.
        </p>
      </div>

      {/* Passing data to Client Component for filtering and interaction */}
      <ActiveProjectsClient initialProjects={projects} user={freelancer} />
    </div>
  );
}