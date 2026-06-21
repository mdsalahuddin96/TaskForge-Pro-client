"use client";

import React, { useState } from "react";
import { Table, Chip, Button, AlertDialog } from "@heroui/react";
import { FiEdit2, FiTrash2, FiAlertCircle } from "react-icons/fi";
import toast from "react-hot-toast";

export default function MyTasksView() {
  // আপনার রিয়াল MongoDB টাস্ক ডাটা ফরম্যাট অনুযায়ী ডেমো স্টেট ডাটা
  const [tasks, setTasks] = useState([
    {
      _id: { $oid: "6a36d7a92030b4929328067b" },
      title: "Design a landing page",
      category: "Web Development",
      description: "The a creative landing page with brand logo",
      budget: 10,
      deadline: "2026-06-25",
      status: "open", // open, in-progress, completed
      clientId: "6a33c4170529fee811864128",
      clientEmail: "salauddin@gmail.com",
      createdAt: { $date: "2026-06-20T18:10:49.074Z" },
      hasApprovedProposal: false // ডিলিট পারমিশন ট্র্যাকিং লজিক
    },
    {
      _id: { $oid: "7b45e8b13041c5930439178c" },
      title: "Fix Responsive Layout Bug on Dashboard",
      category: "Web Development",
      description: "Fix layout breakage on mobile view for modern sidebar setup",
      budget: 45,
      deadline: "2026-07-01",
      status: "in-progress",
      clientId: "6a33c4170529fee811864128",
      clientEmail: "salauddin@gmail.com",
      createdAt: { $date: "2026-06-21T05:00:00.000Z" },
      hasApprovedProposal: true
    }
  ]);

  // মডাল এবং ডিলিট ট্র্যাক করার জন্য স্টেট
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // লাইভ স্ট্যাটাস ব্যাজ কালার ডাইনামিক কারী ফাংশন
  const getStatusChip = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return <Chip color="primary" size="sm" variant="soft" className="capitalize">Open</Chip>;
      case "in-progress":
        return <Chip color="warning" size="sm" variant="soft" className="capitalize">In Progress</Chip>;
      case "completed":
        return <Chip color="success" size="sm" variant="soft" className="capitalize">Completed</Chip>;
      default:
        return <Chip color="default" size="sm" variant="soft" className="capitalize">{status}</Chip>;
    }
  };

  // এডিট বাটন হ্যান্ডলার (লজিক: শুধুমাত্র "open" স্ট্যাটাস হলে কাজ করবে)
  const handleEditTask = (task) => {
    if (task.status !== "open") {
      toast.error(`Cannot edit this task. It is already "${task.status}".`);
      return;
    }
    toast.success(`Opening editor for: "${task.title}"`);
  };

  // ডিলিট বাটন ক্লিক ট্র্রিগার মডাল ওপেন
  const triggerDeleteModal = (task) => {
    if (task.hasApprovedProposal) {
      toast.error("Cannot delete task! A freelancer proposal has already been approved.");
      return;
    }
    setSelectedTask(task);
    setIsAlertOpen(true);
  };

  // মডালে নিশ্চিত করার পর কনফার্ম ডিলিট এক্সিকিউশন
  const handleConfirmDelete = () => {
    if (!selectedTask) return;

    // টাস্ক ডিলিট ফিল্টারিং (MongoDB _id.$oid ফরম্যাট ট্র্যাক করে)
    setTasks(tasks.filter((t) => t._id.$oid !== selectedTask._id.$oid));
    toast.success("Task deleted permanently.");
    
    setIsAlertOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-xl">
      
      {/* Title */}
      <div className="flex flex-col mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent">
          My Posted Tasks
        </h1>
        <p className="mt-1 text-xs text-slate-400 font-medium">
          Manage your live jobs, trace budgets, deadlines, and view realtime task states.
        </p>
      </div>

      {/* HeroUI Resizable Columns Table */}
      <div className="w-full overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800/80">
        <Table aria-label="Tasks dashboard configuration table">
          <Table.ResizableContainer>
            <Table.Content className="min-w-[750px]">
              <Table.Header>
                <Table.Column isRowHeader defaultWidth="2fr" id="title" minWidth={250}>
                  Task Title
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="category" minWidth={140}>
                  Category
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="0.8fr" id="budget" minWidth={100}>
                  Budget
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="deadline" minWidth={130}>
                  Deadline
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="0.8fr" id="status" minWidth={110}>
                  Status
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="actions" minWidth={120}>
                  Actions
                </Table.Column>
              </Table.Header>
              
              <Table.Body>
                {tasks.map((task) => (
                  <Table.Row key={task._id.$oid} className="border-b last:border-0 border-slate-50 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    
                    <Table.Cell className="font-semibold text-slate-800 dark:text-slate-200">
                      {task.title}
                    </Table.Cell>
                    
                    <Table.Cell className="text-slate-500 text-sm font-medium">
                      {task.category}
                    </Table.Cell>
                    
                    <Table.Cell className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      ${task.budget}
                    </Table.Cell>

                    <Table.Cell className="text-slate-500 text-sm font-medium">
                      {task.deadline}
                    </Table.Cell>
                    
                    <Table.Cell>
                      {getStatusChip(task.status)}
                    </Table.Cell>
                    
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        
                        {/* এডিট বাটন */}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          color={task.status === "open" ? "primary" : "default"}
                          disabled={task.status !== "open"}
                          className={`rounded-lg ${task.status !== "open" ? "opacity-40 cursor-not-allowed" : ""}`}
                          onPress={() => handleEditTask(task)}
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Button>

                        {/* ডিলিট বাটন - যা অ্যালার্ট মডাল পপআপ ট্র্রিগার করে */}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          color={!task.hasApprovedProposal ? "danger" : "default"}
                          disabled={task.hasApprovedProposal}
                          className={`rounded-lg ${task.hasApprovedProposal ? "opacity-40 cursor-not-allowed" : ""}`}
                          onPress={() => triggerDeleteModal(task)}
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </Button>

                      </div>
                    </Table.Cell>

                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
      </div>

      {/* নোট বার */}
      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-xl border border-slate-100 dark:border-slate-800/40">
        <FiAlertCircle className="w-4 h-4 text-indigo-500" />
        <span>Info: Edits are only permitted on 'open' status tasks. Project row deletion locks once a proposal becomes active.</span>
      </div>

      {/* ================= HEROUI CONFIRMATION DELETE MODAL ================= */}
      <AlertDialog isOpen={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger onClick={() => setIsAlertOpen(false)} />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Delete task permanently?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-slate-500 text-sm leading-relaxed">
                  This will permanently delete <strong>{selectedTask?.title}</strong> and all of its data. This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary" onClick={() => setIsAlertOpen(false)}>
                  Cancel
                </Button>
                <Button slot="close" variant="danger" onClick={handleConfirmDelete}>
                  Delete Task
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>

    </div>
  );
}