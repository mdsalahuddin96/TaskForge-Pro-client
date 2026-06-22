
import React from "react";
import MyTasksClient from "./MyTasksClient";
import { getUserSession } from "@/lib/core/session";
import { getTasks } from "@/lib/api/getTasks";


export default async function MyTasksPage() {
  const user=await getUserSession()
  const tasks=await getTasks(user?.id)

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <MyTasksClient tasks={tasks} />
      </div>
    </div>
  );
}