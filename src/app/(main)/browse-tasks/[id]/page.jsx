import React from "react";
import TaskDetails from "./TaskDetails";
import { getTaskDetails } from "@/lib/api/getTaskDetails";
import { getProposal } from "@/lib/api/getProposal";
import { getUserSession } from "@/lib/core/session";

// সিমিলার টাস্ক ফেচ করার ফাংশন
async function getSimilarTasks(category) {
  return [
    { id: "s1", title: "Build modern layout portfolio using Next.js & Tailwind CSS", category: "Web Development", budget: 80, deadline: "2026-06-30" },
    { id: "s2", title: "Fix responsive layout bugs on multi-step checkout form", category: "Web Development", budget: 35, deadline: "2026-07-05" }
  ];
}


export default async function TaskDetailsPage({ params }) {
  const { id } = await params;
  const user=await getUserSession()
  const task = await getTaskDetails(id)
  const similarTasks = await getSimilarTasks(task.category);
  return (
    <TaskDetails 
      task={task} 
      similarTasks={similarTasks} 
      user={user}
    />
  );
}