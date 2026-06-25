// src/app/dashboard/client/overview/RecentTasks.jsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";
import { getTasks } from "@/lib/api/getTasks";
import { useSession } from "@/lib/auth-client";

export default function ClientRecentTasks() {
    const {data}=useSession()
    const user=data?.user;
  const recentTasks = [
    {
      id: "TSK-9021",
      title: "Landing Page Redesign",
      freelancer: "Rahat Karim",
      status: "In Progress",
      budget: "$400",
    },
    {
      id: "TSK-8843",
      title: "API Integration (Node.js)",
      freelancer: "Siddikur Rahman",
      status: "Under Review",
      budget: "$250",
    },
    {
      id: "TSK-7611",
      title: "MongoDB Schema Optimization",
      freelancer: "Asif Iqbal",
      status: "Open",
      budget: "$150",
    },
  ];
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTask = async () => {
      const tasks = await getTasks(user?.id);
      setTasks(tasks.slice(0,5))
    };
     fetchTask()
  }, [user]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2">
        <FiActivity className="text-indigo-500 w-4 h-4" />
        <h2 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Recent Active Tasks
        </h2>
      </div>

      <div className="w-full border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden bg-transparent">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20">
                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Task Title
                </th>
                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Budget
                </th>
                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 dark:divide-slate-800/50 text-sm">
              {tasks.map((task) => (
                <tr
                  key={task?._id}
                  className="hover:bg-slate-50/30 dark:hover:bg-slate-950/10 transition-colors"
                >
                  <td className="p-4 font-bold text-slate-800 dark:text-slate-200 truncate">
                    {task?.title}
                  </td>
                  <td className="p-4 font-black text-slate-900 dark:text-white">
                    {task?.budget}
                  </td>
                  <td className="p-4 text-right">
                    <span
                      className={`inline-block text-[10px] font-black px-2.5 py-1 rounded-lg border ${
                        task?.status.toLowerCase() === "open"
                          ? "bg-sky-50 text-sky-600 border-sky-200/30 dark:bg-sky-950/20 dark:text-sky-400"
                          : task.status.toLowerCase() === "in-progress"
                            ? "bg-amber-50 text-amber-600 border-amber-200/30 dark:bg-amber-950/20 dark:text-amber-400"
                            : "bg-slate-50 text-green-600 border-slate-200/30 dark:bg-slate-950/20 dark:text-slate-400"
                      }`}
                    >
                      {task?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
