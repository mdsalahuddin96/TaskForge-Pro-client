
"use client";

import React, { useState } from "react";
import { Tabs } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { updateTask } from "@/lib/api/updateTask";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { revalidateRoute } from "@/lib/actions/revalidateRoute";


export default function ActiveProjectsClient({ initialProjects, user }) {
  const pathName = usePathname();
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [filter, setFilter] = useState("all");

  // Filter projects based on selected active tab id
  const filteredProjects = projects.filter((project) => {
    const { tasks } = project;
    if (filter === "all") return true;
    return tasks?.status.toLowerCase() === filter.toLowerCase();
  });

  const handleDeliverableSubmit = async (projectId, url) => {
    const result = await updateTask(projectId, { deliverable_url: url, freelancerName:user?.name, freelancerEmail:user?.email });
    if (result.modifiedCount > 0) {
      await revalidateRoute(pathName);
      router.refresh();
      toast.success("Project Submitted Successfully!");
    } else {
      toast.error("Something wrong!");
    }
  };

  return (
    <div className="space-y-8 w-full">
      {/* Full-width HeroUI Tabs using your exact specified structure */}
      <Tabs
        className="w-full"
        variant="secondary"
        selectedKey={filter}
        onSelectionChange={(key) => setFilter(key)}
      >
        <Tabs.ListContainer className="w-full bg-slate-100 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200/60 dark:border-slate-800/40">
          <Tabs.List
            aria-label="Project Status Filters"
            className="grid grid-cols-3 w-full gap-1"
          >
            <Tabs.Tab
              id="all"
              className="font-bold text-xs py-2.5 rounded-lg text-center cursor-pointer transition-all"
            >
              All Projects
              <Tabs.Indicator />
            </Tabs.Tab>

            <Tabs.Tab
              id="in-progress"
              className="font-bold text-xs py-2.5 rounded-lg text-center cursor-pointer transition-all"
            >
              In Progress
              <Tabs.Indicator />
            </Tabs.Tab>

            <Tabs.Tab
              id="completed"
              className="font-bold text-xs py-2.5 rounded-lg text-center cursor-pointer transition-all"
            >
              Completed
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        {/* Dynamic Panel structures to sync perfectly with active view */}
        <Tabs.Panel id="all" className="pt-2" />
        <Tabs.Panel id="in-progress" className="pt-2" />
        <Tabs.Panel id="completed" className="pt-2" />
      </Tabs>

      {/* Grid container with Framer Motion layout animation */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onUpdate={handleDeliverableSubmit}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State handler */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl w-full"
        >
          <p className="text-sm font-medium text-slate-400">
            No projects found in this criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
}
