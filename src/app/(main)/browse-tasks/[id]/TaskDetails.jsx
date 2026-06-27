"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Chip,
  Button,
  Modal,
  TextField,
  Label,
  Input,
  Avatar,
  Form,
  Spinner,
} from "@heroui/react";
import {
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiBriefcase,
  FiUser,
  FiMail,
  FiLayers,
  FiArrowUpRight,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { postProposal } from "@/lib/actions/postProposal";
import { LuCircleCheckBig } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import { revalidateRoute } from "@/lib/actions/revalidateRoute";
import { redirectTo } from "@/lib/actions/redirectTo";
import { signOut } from "@/lib/auth-client";

export default function TaskDetails({ task, similarTasks, user, applied }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [isApplied, setIsApplied] = useState(applied); //use for check is already applied
  const pathName = usePathname();
  const router = useRouter();

  const getDaysLeft = (deadlineStr) => {
    const diff = new Date(deadlineStr) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const proposedData = Object.fromEntries(formData.entries());
    proposedData.taskId = task?._id;
    proposedData.taskTitle = task?.title;
    proposedData.freelancerEmail = user?.email;
    proposedData.freelancerName = user?.name;
    proposedData.status = "pending";
    const result = await postProposal(proposedData);
    if (result.insertedId) {
      toast.success("Proposal Submitted Successfully");
      setPending(false);
      setIsModalOpen(false);
      setIsApplied(true)
      await revalidateRoute(pathName);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 px-4 py-10 sm:px-6 lg:px-8 text-slate-800 dark:text-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
          {/* LEFT SIDE: Task Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* HEADER CARD */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Chip
                  size="sm"
                  color="secondary"
                  variant="flat"
                  className="font-bold text-xs bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400 border border-purple-100/30"
                >
                  <FiBriefcase className="mx-1 text-xs" /> {task?.category}
                </Chip>
                <Chip
                  size="sm"
                  color="success"
                  variant="soft"
                  className="font-bold text-xs capitalize"
                >
                  <FiCheckCircle className="mx-1 text-xs" /> {task?.status}
                </Chip>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug text-slate-900 dark:text-white mb-5">
                {task?.title}
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-xs font-bold text-slate-400">
                <div className="flex items-center gap-2">
                  <FiUser className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                  <div>
                    <span className="block text-[10px] uppercase text-slate-400/70">
                      Client
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 truncate block max-w-[120px]">
                      {task?.clientName}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                  <div>
                    <span className="block text-[10px] uppercase text-slate-400/70">
                      Deadline
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 block">
                      {task?.deadline}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FiDollarSign className="w-4 h-4 text-indigo-500" />
                  <div>
                    <span className="block text-[10px] uppercase text-slate-400/70">
                      Budget
                    </span>
                    <span className="text-slate-900 dark:text-slate-100 text-sm font-black">
                      ${task?.budget}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="block text-[10px] uppercase text-slate-400/70">
                      Days Left
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 block">
                      {getDaysLeft(task?.deadline)} Days
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* DESCRIPTION CARD */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 sm:p-8 shadow-sm"
            >
              <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FiLayers className="text-indigo-600" /> Task Description
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium">
                {task.description}
              </p>
            </motion.div>

            {/* CLIENT CARD */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-base font-black tracking-tight text-slate-900 dark:text-white mb-4">
                About The Client
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <Avatar.Image
                      referrerPolicy= "no-referrer"
                      alt={task?.clientName}
                      src={task?.clientImage}
                      width={200}
                      height={200}
                    />
                    <Avatar.Fallback delayMs={600}>
                      {task?.clientName
                        ? task?.clientName.slice(0, 2).toUpperCase()
                        : "JD"}
                    </Avatar.Fallback>
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {task?.clientName}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                      <FiMail className="w-3 h-3" /> {task?.clientEmail}
                    </p>
                  </div>
                </div>
                <div className="border-t sm:border-t-0 sm:border-x border-slate-100 dark:border-slate-800 px-0 sm:px-6 py-2 sm:py-0">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Total Posted Tasks
                  </span>
                  <span className="text-base font-black text-slate-800 dark:text-slate-200">
                    {task?.clientPostedJobs} Jobs
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Member Since
                  </span>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                    {new Date(task.clientCreatedAt).toLocaleDateString(
                      "en-GB",
                      {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Sticky Summary Card */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4">
                Job Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm font-medium border-b border-slate-50 dark:border-slate-800/40 pb-2.5">
                  <span className="text-slate-400">Fixed Budget</span>
                  <span className="font-black text-slate-900 dark:text-white text-base">
                    ${task.budget} USD
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium border-b border-slate-50 dark:border-slate-800/40 pb-2.5">
                  <span className="text-slate-400">Duration Limit</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {task.deadline}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-400">Time Counter</span>
                  <span className="font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-md text-xs">
                    {getDaysLeft(task.deadline)} Days Left
                  </span>
                </div>
              </div>
              {user?.role !== "Freelancer" ? (
                <button
                  onClick={async () => {
                    await signOut();
                    redirectTo("/login");
                  }}
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white font-bold rounded-xl py-3.5 shadow-md hover:from-indigo-700 hover:to-violet-700 transition flex items-center justify-center gap-2 group"
                  disabled={isApplied}
                >
                  For Apply Login as Freelancer
                </button>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white font-bold rounded-xl py-3.5 shadow-md hover:from-indigo-700 hover:to-violet-700 transition flex items-center justify-center gap-2 group"
                  disabled={isApplied}
                >
                  {isApplied ? (
                    <>
                      <LuCircleCheckBig className="w-4 h-4" />
                      <span>Already Applied</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      <span>Submit Proposal</span>
                    </>
                  )}
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {/* SIMILAR TASKS SECTION */}
        <div className="mt-16 pt-10 border-t border-slate-200/60 dark:border-slate-800/60">
          <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            Similar Tasks You May Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {similarTasks.map((simTask, idx) => (
              <motion.div
                key={simTask.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/20 px-2 py-0.5 rounded-md">
                    {simTask.category}
                  </span>
                  <h3 className="mt-3 text-sm font-extrabold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">
                    {simTask.title}
                  </h3>
                </div>
                <div className="mt-6 pt-3.5 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] uppercase font-semibold text-slate-400">
                      Budget
                    </span>
                    <span className="text-sm font-black text-slate-900 dark:text-slate-100">
                      ${simTask.budget}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    className="rounded-lg font-bold text-xs"
                    endContent={<FiArrowUpRight />}
                  >
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* HEROUI PROPOSAL SUBMISSION MODAL */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <Modal.CloseTrigger onClick={() => setIsModalOpen(false)} />
              <Modal.Header>
                <Modal.Icon className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                  <FiSend className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Submit Your Proposal</Modal.Heading>
                <p className="mt-1.5 text-xs text-slate-400 font-medium">
                  Pitch your strategy for:{" "}
                  <span className="font-bold text-slate-600 dark:text-slate-300">
                    {task.title.slice(0, 40)}...
                  </span>
                </p>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Form
                  onSubmit={handleProposalSubmit}
                  className="flex flex-col gap-4"
                >
                  <TextField
                    className="w-full"
                    name="proposedBudget"
                    type="number"
                    isRequired
                  >
                    <Label className="text-slate-700 dark:text-slate-300 font-bold text-xs">
                      Proposed Budget (USD)
                    </Label>
                    <Input placeholder="Enter amount" min="1" />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="estimatedDays"
                    type="number"
                    isRequired
                  >
                    <Label className="text-slate-700 dark:text-slate-300 font-bold text-xs">
                      Estimated Days to Deliver
                    </Label>
                    <Input placeholder="e.g., 3" min="1" />
                  </TextField>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Cover Letter / Approach Pitch
                    </label>
                    <textarea
                      required
                      name="coverLetter"
                      rows={4}
                      placeholder="Explain your approach..."
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition font-medium"
                    />
                  </div>
                  <div className="mt-4 flex gap-3 justify-end border-t border-slate-50 dark:border-slate-800/60 pt-4">
                    <Button
                      slot="close"
                      variant="secondary"
                      className="rounded-xl font-bold"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <button
                      type="submit"
                      disabled={pending}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition shadow-md"
                    >
                      {pending ? (
                        <span className="flex items-center gap-0.5">
                          Sending
                          <Spinner color="current" size="sm" />
                        </span>
                      ) : (
                        "Send Proposal"
                      )}
                    </button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
