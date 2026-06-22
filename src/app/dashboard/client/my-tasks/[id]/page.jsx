import React from "react";
import TaskDetailsManagementClient from "./TaskDetailsManagementClient";
import { getTaskDetails } from "@/lib/api/getTaskDetails";

// ডাটাবেজ থেকে টাস্ক এবং তার আন্ডারে আসা প্রোপোজালগুলো ফেচ করার ফাংশন
async function getTaskWithProposals(id) {
  // বাস্তব প্রজেক্টে আপনার MongoDB কোড বা fetch API এখানে হবে:
  // const res = await fetch(`https://your-api.com/tasks/${id}`);
  // return res.json();

  // রিয়েলস্টিক মক ডাটা (আপনার প্রোভাইড করা ডাটা স্ট্রাকচার অনুযায়ী)
  return {
    _id: id,
    title: "Design a Modern Logo for Startup",
    category: "Design",
    description: "Need a clean and professional logo design for a technology startup company. The logo must be minimalist, modern, and perfectly scalable for web and mobile applications.",
    budget: 60,
    deadline: "2026-06-30",
    status: "open", // open, in-progress, closed
    clientEmail: "salauddincse96@gmail.com",
    createdAt: "2026-06-21T08:20:00.000Z",
    // এই টাস্কে আসা ফ্রিল্যান্সারদের প্রোপোজাল লিস্ট
    proposals: [
      {
        _id: "p001",
        freelancerName: "Anik Rahman",
        budgetPrice: 55,
        completionDays: 3,
        messageNote: "Hi! I have 4+ years of experience in brand identity. I can design a modern, scalable geometric logo for your technology startup. Check my portfolio for similar clean works.",
        status: "pending" // pending, accepted, rejected
      },
      {
        _id: "p002",
        freelancerName: "Zahid Hasan",
        budgetPrice: 60,
        completionDays: 4,
        messageNote: "Hello, I specialize in minimalist vector designs. I will provide 3 unique concepts and unlimited revisions until you are 100% satisfied with your startup logo.",
        status: "pending"
      },
      {
        _id: "p003",
        freelancerName: "Tasnim Alam",
        budgetPrice: 50,
        completionDays: 5,
        messageNote: "I would love to help you build your startup identity. I have worked with multiple tech firms before and understand the clean aesthetics you are looking for.",
        status: "rejected"
      }
    ]
  };
}

export default async function TaskDetailsPage({ params }) {
  const { id } = await params;
  const taskData=await getTaskDetails(id)

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TaskDetailsManagementClient taskData={taskData} />
      </div>
    </div>
  );
}