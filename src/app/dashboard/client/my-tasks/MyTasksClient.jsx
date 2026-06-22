"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Select,
  Chip,
  ListBox,
  SearchField,
  Label,
} from "@heroui/react";
import {
  FiDollarSign,
  FiCalendar,
  FiLayers,
  FiMessageSquare,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

export default function MyTasksClient({ tasks }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusChip = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return (
          <Chip
            color="success"
            size="sm"
            variant="soft"
            className="font-bold border border-success-200/20 capitalize"
          >
            <span className="flex items-center gap-1">
              <FiCheckCircle className="text-xs" /> Open
            </span>
          </Chip>
        );
      case "in-progress":
        return (
          <Chip
            color="warning"
            size="sm"
            variant="soft"
            className="font-bold border border-warning-200/20 capitalize"
          >
            <span className="flex items-center gap-1">
              <FiClock className="text-xs" /> In Progress
            </span>
          </Chip>
        );
      case "closed":
        return (
          <Chip
            color="default"
            size="sm"
            variant="soft"
            className="font-bold border border-slate-200/20 capitalize"
          >
            <span className="flex items-center gap-1">
              <FiXCircle className="text-xs" /> Closed
            </span>
          </Chip>
        );
      default:
        return (
          <Chip size="sm" variant="flat" className="capitalize">
            {status}
          </Chip>
        );
    }
  };

  // Search and Filter (Performance optimized via useMemo)
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        task.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, tasks]);

  return (
    <div className="space-y-8">
      {/* HEADER SECTION: Title, Search, and Filter */}
      <div className="flex flex-col gap-5 border-b border-slate-100 dark:border-slate-900 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FiLayers className="text-indigo-600 w-5 h-5" />
            My Posted Tasks
          </h1>
          <p className="mt-1 text-xs text-slate-400 font-medium">
            Manage, track performance, and view incoming proposals for your
            posted projects.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Search  */}
          <div className="md:col-span-2">
            <SearchField name="search" value={searchQuery} onChange={setSearchQuery}>
              <Label>Search</Label>
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input
                  className="w-full font-medium"
                  placeholder="Search by task title or category..."
                />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
          </div>
          {/* Filter*/}
          <Select className="w-full" placeholder="Filter by status" defaultValue="all" onChange={setStatusFilter}>
            <Label>Status</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="open" textValue="Open">
                  Open
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="in-progress" textValue="In Progress">
                  In Progress
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="completed" textValue="Completed">
                  Completed
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="all" textValue="All">
                  All
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
          
        </div>
      </div>

      {/* TASKS GRID SECTION */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-sm font-bold text-slate-400">
            No tasks found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTasks.map((task) => (
            <Link
              key={task._id}
              href={`/dashboard/client/my-tasks/${task?._id}`} 
              className="group block bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-500/40 dark:hover:border-indigo-500/30 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top Badge Rows */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-extrabold tracking-wide uppercase px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-md">
                    {task.category}
                  </span>
                  {getStatusChip(task.status)}
                </div>

                {/* Title */}
                <h3 className="text-base font-black tracking-tight text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">
                  {task.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs font-medium text-slate-400 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {task.description ||
                    "No description provided for this job request."}
                </p>
              </div>

              {/* Bottom Metadata & Stats */}
              <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800/60 grid grid-cols-3 gap-2 text-center">
                {/* Budget Column */}
                <div className="text-left">
                  <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                    Budget
                  </span>
                  <span className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center mt-0.5">
                    <FiDollarSign className="text-indigo-500 text-xs shrink-0" />
                    {task.budget}
                  </span>
                </div>

                {/* Deadline Column */}
                <div className="text-left sm:text-center">
                  <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                    Deadline
                  </span>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center justify-start sm:justify-center gap-1 mt-0.5">
                    <FiCalendar className="text-slate-400 shrink-0 text-xs" />
                    {task.deadline?.slice(5)}{" "}
                  </span>
                </div>

                {/* Proposals Count Column */}
                <div className="text-right">
                  <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                    Proposals
                  </span>
                  <span className="text-xs font-black text-purple-600 dark:text-purple-400 flex items-center justify-end gap-1 mt-0.5">
                    <FiMessageSquare className="text-purple-500 shrink-0 text-xs" />
                    {task?.proposalCount || 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
