"use client";

import React, { useState, useEffect } from "react";
import { Table, Spinner, Button, AlertDialog } from "@heroui/react";
import { FiTrash2, FiBriefcase, FiAlertTriangle, FiEye } from "react-icons/fi";
import Link from "next/link";
import { getTasks } from "@/lib/api/getTasks";
import { deleteTask } from "@/lib/api/deleteTask";

export default function ManageTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const tasksData = await getTasks();
        if (tasksData.allTasks) {
          setTasks(tasksData.allTasks);
        }
      } catch (error) {
        console.error("Failed to load platform tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    setActionLoadingId(taskId);
    try {
      const result = await deleteTask(taskId);
      if (result.deletedCount > 0) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId),
        );
      }
      //
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const getStatusLabel = (status) => {
    const statusStyles = {
      open: "bg-indigo-500/5 border-indigo-500/20 text-indigo-500 dark:text-indigo-400",
      active:
        "bg-emerald-500/5 border-emerald-500/20 text-emerald-500 dark:text-emerald-400",
      completed: "bg-slate-500/10 border-slate-500/20 text-slate-500",
      "in-progress":"bg-rose-500/5 border-rose-500/20 text-rose-500 animate-pulse",
    };

    return (
      <span
        className={`inline-flex items-center text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${statusStyles[status] || "bg-slate-100 text-slate-600"}`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner
          color="indigo"
          size="lg"
          label="Syncing Task Forge Marketplace..."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ─── HEADER SECTION ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-slate-200/60 dark:border-zinc-900 shadow-sm">
        <div>
          <h1 className="text-xl font-black tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
            <FiBriefcase className="text-indigo-500" /> Manage Tasks
          </h1>
          <p className="text-xs font-medium text-slate-400 dark:text-zinc-500 mt-1">
            Review live job items, moderate content bad-text, and enforce
            marketplace safety policies.
          </p>
        </div>
        <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 w-fit">
          Live Listings: {tasks.length} Jobs
        </div>
      </div>

      {/* ─── HEROUI DATA TABLE ─── */}
      <div className="bg-white dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-900 shadow-sm rounded-2xl overflow-hidden">
        <Table aria-label="Task Management Moderation Matrix">
          <Table.ResizableContainer>
            <Table.Content className="min-w-187.5">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  defaultWidth="2fr"
                  id="title"
                  minWidth={250}
                >
                  Task Title & Client
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1fr" id="category" minWidth={130}>
                  Category
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="0.8fr" id="budget" minWidth={110}>
                  Budget
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1fr" id="status" minWidth={120}>
                  Live Status
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1fr" id="actions" minWidth={120}>
                  Moderation
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {tasks.map((task) => (
                  <Table.Row
                    key={task?._id}
                    className="border-b last:border-0 border-slate-100 dark:border-zinc-900/60 hover:bg-slate-50/50 dark:hover:bg-zinc-900/40 transition-colors"
                  >
                    {/* Task Title & Client Email */}
                    <Table.Cell>
                      <div className="flex flex-col py-1">
                        <span className="font-black text-slate-800 dark:text-zinc-200 tracking-tight text-sm line-clamp-1">
                          {task?.title}
                        </span>
                        <span className="text-xs font-medium text-slate-400 dark:text-zinc-500 mt-0.5">
                          By: {task?.clientEmail}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Category */}
                    <Table.Cell>
                      <span className="text-xs font-bold text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-900 px-2 py-1 rounded-md border border-slate-200/40 dark:border-zinc-800/60">
                        {task?.category}
                      </span>
                    </Table.Cell>

                    {/* Budget */}
                    <Table.Cell>
                      <span className="font-extrabold text-slate-900 dark:text-zinc-100 text-sm">
                        ${task?.budget}
                      </span>
                    </Table.Cell>

                    {/* Status Label */}
                    <Table.Cell>
                      {getStatusLabel(task?.status.toLowerCase())}
                    </Table.Cell>

                    {/* Actions Panel */}
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        {/* View Task Client Link */}
                        <Link
                          href={`/browse-tasks/${task?._id}`}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-500 hover:text-indigo-500 hover:bg-indigo-500/10 transition-colors"
                          title="View live task page"
                        >
                          <FiEye className="w-4 h-4" />
                        </Link>

                        {/* HEROUI ALERT DIALOG INTEGRATION */}
                        <AlertDialog>
                          <Button
                            size="sm"
                            variant="flat"
                            isLoading={actionLoadingId === task?._id}
                            className="p-2 min-w-0 h-auto rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-600 hover:text-white dark:bg-rose-500/5 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white transition-all"
                            title="Delete Task Permanently"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </Button>

                          <AlertDialog.Backdrop>
                            <AlertDialog.Container>
                              <AlertDialog.Dialog className="sm:max-w-[400px] bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-900 rounded-2xl shadow-xl">
                                <AlertDialog.CloseTrigger />

                                <AlertDialog.Header className="flex gap-3 items-center">
                                  <AlertDialog.Icon status="danger" />
                                  <AlertDialog.Heading className="text-base font-black text-slate-900 dark:text-zinc-100">
                                    Delete task permanently?
                                  </AlertDialog.Heading>
                                </AlertDialog.Header>

                                <AlertDialog.Body className="py-2 text-sm text-slate-500 dark:text-zinc-400 font-medium">
                                  <p>
                                    This will permanently delete{" "}
                                    <strong className="text-slate-800 dark:text-zinc-200">
                                      {task?.title}
                                    </strong>{" "}
                                    and remove all of its live data fields from
                                    the platform ecosystem. This action cannot
                                    be undone.
                                  </p>
                                </AlertDialog.Body>

                                <AlertDialog.Footer className="gap-2">
                                  <Button
                                    slot="close"
                                    variant="tertiary"
                                    className="text-xs font-bold rounded-xl"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    slot="close"
                                    variant="danger"
                                    onClick={() => handleDeleteTask(task?._id)}
                                    className="text-xs font-black uppercase tracking-wider bg-rose-600 text-white rounded-xl"
                                  >
                                    Confirm Delete
                                  </Button>
                                </AlertDialog.Footer>
                              </AlertDialog.Dialog>
                            </AlertDialog.Container>
                          </AlertDialog.Backdrop>
                        </AlertDialog>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>

        {/* Empty Guard Row */}
        {tasks.length === 0 && (
          <div className="w-full text-center py-16 border-t border-slate-100 dark:border-zinc-900/60">
            <p className="text-xs font-bold text-slate-400 dark:text-zinc-500">
              No live marketplace tasks currently require moderation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
