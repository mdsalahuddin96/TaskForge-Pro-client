"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Form, TextField, Label, Input, Button } from "@heroui/react";
import {
  FiBriefcase,
  FiFolder,
  FiDollarSign,
  FiCalendar,
  FiLock,
  FiMail,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { FormSubmitBtn } from "./FormSubmitBtn";
import { updateTask } from "@/lib/api/updateTask";
import { usePathname, useRouter } from "next/navigation";
import { revalidateRoute } from "@/lib/actions/revalidateRoute";

export default function EditTaskFormWide({ task, openEditFun }) {
    const router=useRouter()
    const pathName=usePathname()
  const taskData = {
    title: task.title,
    category: task.category,
    description: task.description,
    budget: task.budget,
    deadline: task.deadline,
    clientId: task.clientId,
    clientEmail: task.clientEmail,
  };
  const [formData, setFormData] = useState(taskData);

  // Handle text input changes safely
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await updateTask(task?._id, formData);
    console.log(result)
    if (result.modifiedCount > 0) {
      toast.success("Task changes saved successfully!");
      await revalidateRoute(pathName)
      router.refresh()
      openEditFun(false);
    }
    else{
        toast.error("Task update failed!")
    }
  };

  // Framer motion smooth entrance animation variants
  const formEntranceVariants = {
    hidden: {
      opacity: 0,
      scale: 0.96,
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1], // Custom smooth cubic-bezier curve
      },
    },
  };

  return (
    // Framer motion wrapper with max-w-4xl for wide layout
    <motion.div
      variants={formEntranceVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 sm:p-8 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
          Modify Project/Task Details
        </h2>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          Update your project details. Read-only values are protected by system
          security rules.
        </p>
      </div>

      {/* HeroUI Form Layout Wrapper */}
      <Form className="flex w-full flex-col gap-6" onSubmit={onSubmit}>
        {/* Title and Category Row (2 Columns Layout for Wide Screen) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Task Title Input */}
          <TextField isRequired name="title">
            <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <FiBriefcase className="text-indigo-500" /> Project Title
            </Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Design a landing page"
              className="w-full text-sm font-medium mt-1"
            />
          </TextField>

          {/* Task Category Input */}
          <TextField isRequired name="category">
            <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <FiFolder className="text-indigo-500" /> Category
            </Label>
            <Input
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="e.g. Web Development"
              className="w-full text-sm font-medium mt-1"
            />
          </TextField>
        </div>

        {/* Task Description Textarea Row (Full Width) */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Write project brief details..."
            className="w-full text-sm font-medium p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          />
        </div>

        {/* Budget and Deadline Split Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Estimated Budget Input */}
          <TextField isRequired name="budget" type="number">
            <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <FiDollarSign className="text-indigo-500" /> Budget (USD)
            </Label>
            <Input
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="10"
              className="w-full text-sm font-medium mt-1"
            />
          </TextField>

          {/* Delivery Deadline Input */}
          <TextField isRequired name="deadline" type="date">
            <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <FiCalendar className="text-indigo-500" /> Deadline Date
            </Label>
            <Input
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="w-full text-sm font-medium mt-1"
            />
          </TextField>
        </div>

        {/* Read-Only System Security Divider */}
        <div className="border-t border-dashed border-slate-100 dark:border-slate-800/60 my-1" />

        {/* Non-Editable Client Information Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 opacity-75">
          {/* Client ID (Non-Editable) */}
          <TextField name="clientId">
            <Label className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <FiLock className="text-slate-400" /> Client ID Reference
            </Label>
            <Input
              value={formData.clientId}
              readOnly
              className="w-full text-xs font-mono font-medium bg-slate-50/50 dark:bg-slate-950/20 text-slate-400 mt-1 cursor-not-allowed"
            />
          </TextField>

          {/* Client Email (Non-Editable) */}
          <TextField name="clientEmail">
            <Label className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <FiMail className="text-slate-400" /> Associated Email
            </Label>
            <Input
              value={formData.clientEmail}
              readOnly
              className="w-full text-xs font-medium bg-slate-50/50 dark:bg-slate-950/20 text-slate-400 mt-1 cursor-not-allowed"
            />
          </TextField>
        </div>

        {/* Full-width Action Button Segment */}
        <div className="pt-2 w-full">
          <FormSubmitBtn text="Save Changes" />
        </div>
      </Form>
    </motion.div>
  );
}
