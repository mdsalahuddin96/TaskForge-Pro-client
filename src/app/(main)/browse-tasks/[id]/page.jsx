import React from "react";
import TaskDetails from "./TaskDetails";

// সরাসরি ডাটাবেজ বা ব্যাকএন্ড API থেকে টাস্কের ডেটা ফেচ করার ফাংশন
async function getTaskDetails(id) {
  // বাস্তব প্রজেক্টে আপনার MongoDB কোড বা fetch API এখানে হবে:
  // const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) });
  
  // ডেমো সার্ভার রেসপন্স (আপনার ফরম্যাট অনুযায়ী)
  return {
    _id: 1,
    title: "Design a luxury landing page with brand identity for SaaS automation",
    category: "Web Development",
    description: "We are seeking a highly talented UI/UX engineer to craft a premium landing page template for our new SaaS automation platform...",
    budget: 125,
    deadline: "2026-07-15",
    status: "open",
    clientName: "Salauddin Ahmed",
    clientEmail: "salauddin@gmail.com",
    clientPostedTasks: 18,
    clientJoinedDate: "March 2025"
  };
}

// সিমিলার টাস্ক ফেচ করার ফাংশন
async function getSimilarTasks(category) {
  return [
    { id: "s1", title: "Build modern layout portfolio using Next.js & Tailwind CSS", category: "Web Development", budget: 80, deadline: "2026-06-30" },
    { id: "s2", title: "Fix responsive layout bugs on multi-step checkout form", category: "Web Development", budget: 35, deadline: "2026-07-05" }
  ];
}

// Next.js Dynamic Route Params (Next.js 15+ এ params একটি Promise)
export default async function TaskDetailsPage({ params }) {
  const { id } = await params;
  
  // প্যারালাল ডেটা ফেচিং (Fast Performance-এর জন্য)
  const taskData = getTaskDetails(id);
  const task = await taskData;
  const similarTasks = await getSimilarTasks(task.category);

  return (
    <TaskDetails 
      task={task} 
      similarTasks={similarTasks} 
    />
  );
}