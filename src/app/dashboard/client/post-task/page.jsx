"use client";

import React, { useState } from "react";
import { 
  FieldError, 
  Form, 
  Input, 
  Label, 
  TextField,
  Spinner
} from "@heroui/react";
import { FiPlusCircle, FiDollarSign, FiCalendar, FiTag } from "react-icons/fi";
import toast from "react-hot-toast";

export default function PostTaskForm() {
  const [pending, setPending] = useState(false);

  // জনপ্রিয় কিছু ক্যাটাগরির লিস্ট (সিলেক্ট বা সাজেশনের জন্য)
  const categories = [
    "Web Development",
    "UI/UX Design",
    "Content Writing",
    "Graphics Design",
    "Digital Marketing",
    "Bug Fixing"
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    try {
      const formData = new FormData(e.currentTarget);
      const taskData = Object.fromEntries(formData.entries());

      // ডাটা টাইপ কনভার্সন এবং ডিফল্ট স্টেট অ্যাসাইন করা
      taskData.budget = Number(taskData.budget);
      taskData.status = "open"; // আপনার রিকোয়ারমেন্ট অনুযায়ী Default State: open

      console.log("Submitting Task Data:", taskData);

      // এখানে আপনার MongoDB বা ব্যাকএন্ড API এন্ডপয়েন্ট কল করবেন:
      // const res = await fetch("/api/tasks/create", {
      //   method: "POST",
      //   body: JSON.stringify(taskData)
      // });

      // ডেমো সাকসেস রেসপন্স
      await new Promise((resolve) => setTimeout(resolve, 1500)); // কৃত্রিম লোডিং টাইম
      
      toast.success("Task published successfully! It is now open for proposals.");
      e.currentTarget.reset(); // ফর্মের ডাটা ক্লিয়ার করার জন্য

    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to publish task. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent">
          Publish a New Task
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Fill in the details below to instantly connect with skilled freelancers.
        </p>
      </div>

      {/* Main Form */}
      <Form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
        
        {/* Task Title */}
        <TextField isRequired name="title" type="text">
          <Label className="font-semibold text-slate-700 dark:text-slate-300"> Task Title</Label>
          <Input placeholder="e.g., Fix CSS responsiveness bug on login page" />
          <FieldError className="text-xs text-danger" />
        </TextField>

        {/* Category */}
        <TextField isRequired name="category" type="text">
          <Label className="font-semibold text-slate-700 dark:text-slate-300">Category</Label>
          <div className="relative flex items-center">
            <Input 
              placeholder="Select or type a category" 
              list="task-categories"
            />
            {/* <FiTag className="absolute right-3 text-slate-400 w-4 h-4 pointer-events-none" /> */}
          </div>
          <datalist id="task-categories">
            {categories.map((cat, i) => (
              <option key={i} value={cat} />
            ))}
          </datalist>
          <FieldError className="text-xs text-danger" />
        </TextField>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <Label className="font-semibold text-slate-700 dark:text-slate-300">Description</Label>
          <textarea
            required
            name="description"
            rows={5}
            placeholder="Describe the task clearly. Include specific technical requirements, deliverables, and expectations..."
            className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 dark:focus:ring-indigo-400/50 dark:focus:border-indigo-400 transition"
          />
        </div>

        {/* Budget  Deadline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          {/* Budget (USD) */}
          <TextField
            isRequired
            name="budget"
            type="number"
            validate={(value) => Number(value) <= 0 ? "Budget must be greater than $0" : null}
          >
            <Label className="font-semibold text-slate-700 dark:text-slate-300">Budget (USD)</Label>
            <div className="relative flex items-center">
              <Input placeholder="e.g., 50" min="1" className="w-full" />
              {/* <FiDollarSign className="absolute left-0 text-slate-400 w-4 h-4 pointer-events-none" /> */}
            </div>
            <FieldError className="text-xs text-danger" />
          </TextField>

          {/*  Deadline Date */}
          <TextField isRequired name="deadline" type="date">
            <Label className="font-semibold text-slate-700 dark:text-slate-300">Deadline Date</Label>
            <div className="relative flex items-center">
              <Input className="w-full" />
              {/* <FiCalendar className="absolute right-3 text-slate-400 w-4 h-4 pointer-events-none" /> */}
            </div>
            <FieldError className="text-xs text-danger" />
          </TextField>

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={pending}
          className="w-full mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white font-bold rounded-xl py-3.5 shadow-md hover:from-indigo-700 hover:to-violet-700 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {pending ? (
            <Spinner color="current" size="sm" />
          ) : (
            <div className="flex items-center gap-2">
              <FiPlusCircle className="w-5 h-5 transition-transform group-hover:rotate-90" />
              <span>Publish Task</span>
            </div>
          )}
        </button>

      </Form>
    </div>
  );
}