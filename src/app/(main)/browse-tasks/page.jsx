import React from "react";
import TaskFilter from "./TaskFilter";
import TaskContainer from "./TaskContainer";
import { getBrowseTask } from "@/lib/api/getBrowseTask";

export default async function BrowseTasksPage({searchParams}) {
  const{search,category,budget}=await searchParams
  const tasks=await getBrowseTask(search, category, budget)
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Browse Available{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent">
              Micro-Tasks
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
            Find the perfect task, apply with your strategy, and start earning
            instantly.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/*Search and Filter*/}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <TaskFilter />
          </div>

          {/* Card */}
          <div className="lg:col-span-3">
            <TaskContainer tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
