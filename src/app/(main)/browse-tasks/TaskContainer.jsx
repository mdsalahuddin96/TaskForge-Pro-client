"use client";

import React from "react";
import { motion } from "framer-motion";
import { Chip } from "@heroui/react";
import { FiDollarSign, FiCalendar, FiUser, FiArrowUpRight, FiBriefcase } from "react-icons/fi";
import toast from "react-hot-toast";

export default function TaskContainer({ tasks }) {
  
  // Container Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // Card Animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  const handleCardClick = (title) => {
    toast.success(`Opening details & Proposal panel for: \n"${title.slice(0, 30)}..."`);
    // এখানে আপনার ডিটেইলস প্যানেল ওপেন করার ফাংশন বা রাউটিং কল হবে
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {tasks.map((task) => (
        <motion.div
          key={task?._id}
          variants={cardVariants}
          whileHover={{ 
            y: -6, 
            boxShadow: "0 12px 30px -10px rgba(99, 102, 241, 0.12)",
          }}
          whileTap={{ scale: 0.99 }}
          onClick={() => handleCardClick(task.title)}
          className="cursor-pointer group relative flex flex-col justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl transition-all duration-200 overflow-hidden"
        >
          {/* Active border on hover */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div>
            {/*Header: Category and button icon */}
            <div className="flex items-center justify-between mb-4">
              <Chip 
                size="sm" 
                variant="flat" 
                color="secondary" 
                className="font-bold text-xs px-2.5 bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400 border border-purple-100/30"
              >
               <FiBriefcase className="mr-1"/> {task.category}
              </Chip>
              <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:bg-indigo-50/50 dark:group-hover:bg-indigo-950/30 transition duration-200">
                <FiArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Task title*/}
            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150 line-clamp-2 leading-snug">
              {task.title}
            </h3>

            {/* Short description */}
            <p className="mt-2.5 text-xs text-slate-400 dark:text-slate-500 font-medium line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          </div>

          {/* Bottom: Budget, deadline, clientName */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 grid grid-cols-3 gap-2 items-center text-[11px] font-bold tracking-tight text-slate-400 dark:text-slate-500">
            
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold text-slate-400/80 uppercase">Est. Budget</span>
              <div className="flex items-center text-slate-900 dark:text-slate-200 text-sm font-black">
                <FiDollarSign className="text-indigo-500 w-3.5 h-3.5 -mr-0.5" />
                <span>{task.budget}</span>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold text-slate-400/80 uppercase">Deadline</span>
              <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold mt-0.5">
                <FiCalendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{task.deadline.split("-").slice(1).join("/")}</span> {/* MM/DD ফরম্যাটে শর্ট করা */}
              </div>
            </div>

            <div className="flex flex-col gap-0.5 text-right">
              <span className="text-[10px] font-semibold text-slate-400/80 uppercase text-right">Posted By</span>
              <div className="flex items-center justify-end gap-1 text-slate-700 dark:text-slate-300 font-semibold mt-0.5">
                <FiUser className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate max-w-[70px]">{task?.clientName||"Salah uddin"}</span>
              </div>
            </div>

          </div>

        </motion.div>
      ))}
    </motion.div>
  );
}