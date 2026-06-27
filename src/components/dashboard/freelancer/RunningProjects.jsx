// src/app/dashboard/freelancer/components/RunningProjects.jsx
"use client";
import React from "react";
import { Card } from "@heroui/react";
import { FiBriefcase, FiCalendar, FiUser } from "react-icons/fi";

export default function RunningProjects({ projects }) {
  return (
    <Card className="bg-white dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-900 p-5 rounded-2xl shadow-sm h-full flex flex-col justify-between">
      <Card.Header className="p-0 pb-4 border-b border-slate-100 dark:border-zinc-900/60 flex items-center gap-2">
        <FiBriefcase className="text-indigo-500 w-4 h-4" />
        <Card.Title className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-zinc-200">
          Active Projects & Tracker
        </Card.Title>
      </Card.Header>

      <Card.Content className="p-0 pt-4 flex-grow">
        {projects?.length === 0 ? (
          <p className="text-xs font-semibold text-slate-400 py-8 text-center">No active projects found at the moment.</p>
        ) : (
          <div className="space-y-4">
            {projects?.map((project) => (
              <div key={project._id} className="p-3.5 border border-slate-100 dark:border-zinc-900 rounded-xl bg-slate-50/50 dark:bg-zinc-900/20 space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h4 className="text-sm font-black text-slate-800 dark:text-zinc-100 tracking-tight line-clamp-1">{project.title}</h4>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-500 border border-indigo-500/10 mt-1 inline-block">{project.category}</span>
                  </div>
                  <span className="text-sm font-black text-emerald-500 shrink-0">${project.budget}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-semibold text-slate-400">
                  <span className="flex items-center gap-1"><FiUser className="w-3 h-3" /> {project.clientEmail}</span>
                  <span className="flex items-center gap-1 text-rose-500 dark:text-rose-400/90 font-bold"><FiCalendar className="w-3 h-3" /> {project.deadline}</span>
                </div>

                {/* Simulated Dynamic Tracking Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span>Milestone Progress</span>
                    <span className="text-indigo-500">65%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card.Content>
    </Card>
  );
}