"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Table, Chip, Button, Modal, Card, Avatar } from "@heroui/react";
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiMessageSquare,
  FiEye,
  FiTrash,
  FiUser,
  FiMail,
  FiBriefcase,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { CircleFill } from "@gravity-ui/icons";

export default function TaskDetailsManagementClient({ taskData }) {
  const router = useRouter();
  const [task] = useState(taskData);
  const [proposals, setProposals] = useState(taskData.proposals || []);

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState({ name: "", message: "" });
  
  // Freelancer Profile Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Hardcoded Freelancer Info from your data
  const hiredFreelancer = {
    "_id": "6a33c89d0529fee81186412c",
    "name": "MD SALAH UDDIN",
    "email": "sala@freelencer.com",
    "image": "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
    "role": "Freelancer",
    "skills": ["JavaScript", "React", "TailwindCSS", "Next.js"],
    "bio": "I am best web developer",
    "hourlyRate": 15
  };

  // Task already complete or Inprogress?
  const isTaskLocked = task?.status.toLowerCase() !== "open";

  // স্ট্যাটাস চিপ জেনারেটর
  const getStatusChip = (status) => {
    const isPending = status === "pending";
    const isAccepted = status === "accepted" || status === "open" || status === "in-progress";

    return (
      <Chip
        color={isAccepted ? (status === "in-progress" ? "warning" : "success") : isPending ? "warning" : "danger"}
        size="sm"
        variant="soft"
        className="font-bold capitalize border border-slate-200/10"
      >
        <span className="flex items-center gap-1">
          {isAccepted ? (status === "in-progress" ? <FiClock /> : <FiCheckCircle />) : isPending ? <FiClock /> : <FiXCircle />}
          {status === "in-progress" ? "In Progress" : status}
        </span>
      </Chip>
    );
  };

  const handleReadMessage = (name, message) => {
    setActiveMessage({ name, message });
    setIsModalOpen(true);
  };

  const handleRejectProposal = (proposalId) => {
    setProposals((prev) => prev.map((p) => p._id === proposalId ? { ...p, status: "rejected" } : p));
    toast.error("Proposal marked as rejected");
  };

  const handleAcceptProposal = (proposal) => {
    toast.loading("Redirecting to secure Stripe checkout...");
    setTimeout(() => {
      toast.dismiss();
      router.push(`/checkout?proposalId=${proposal?._id}`);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Back to my task */}
      <div>
        <Link
          href="/dashboard/client/my-tasks"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors group"
        >
          <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to My Tasks
        </Link>
      </div>

      {/* Task Details Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
          <span className="text-[10px] font-extrabold tracking-wide uppercase px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-md">
            {task?.category}
          </span>
          {getStatusChip(task?.status)}
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
          {task?.title}
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
          {task?.description}
        </p>

        {/* Budget and Deadline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-50 dark:border-slate-800/60">
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Est. Budget</span>
            <span className="text-base font-black text-slate-900 dark:text-white flex items-center mt-0.5">
              <FiDollarSign className="text-indigo-500 text-sm" />
              {task?.budget} USD
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deadline</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 mt-1">
              <FiCalendar className="text-slate-400 text-xs" />
              {task?.deadline}
            </span>
          </div>
        </div>

        {/* Actions Section Conditional Rendering */}
        {!isTaskLocked ? (
          <div className="mt-5 flex items-center gap-4">
            <Button variant="secondary">
              <BiEdit /> Edit
            </Button>
            <Button variant="danger-soft">
              <FiTrash /> Delete
            </Button>
          </div>
        ) : (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            {/* Paid Chip State */}
            <Chip color="success" variant="flat" className="font-extrabold px-3 py-1.5 rounded-xl">
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                <CircleFill width={6} className="text-emerald-500" />
                Paid
              </span>
            </Chip>

            {/* View Profile Button */}
            <Button
              size="sm"
              variant="solid"
              color="secondary"
              className="font-bold text-xs rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200/20"
              onPress={() => setIsProfileModalOpen(true)}
            >
              <FiUser className="w-3.5 h-3.5" /> View Freelancer Info
            </Button>
          </div>
        )}
      </div>

      {/* Proposal Management Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FiMessageSquare className="text-purple-600" /> Incoming Bids ({proposals.length})
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Review applicant profiles, notes, and hire the perfect match.
          </p>
        </div>

        {proposals.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
            <p className="text-xs font-bold text-slate-400">No proposals submitted for this task yet.</p>
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800/80">
            <Table aria-label="Tasks dashboard configuration table">
              <Table.ResizableContainer>
                <Table.Content className="min-w-[750px]">
                  <Table.Header>
                    <Table.Column isRowHeader defaultWidth="1.5fr" id="title" minWidth={180}>Freelancer Name<Table.ColumnResizer /></Table.Column>
                    <Table.Column defaultWidth="0.8fr" id="budget" minWidth={110}>Budget Bid<Table.ColumnResizer /></Table.Column>
                    <Table.Column defaultWidth="0.8fr" id="deadline" minWidth={110}>Delivery<Table.ColumnResizer /></Table.Column>
                    <Table.Column defaultWidth="2fr" id="category" minWidth={220}>Message Note<Table.ColumnResizer /></Table.Column>
                    <Table.Column defaultWidth="0.8fr" id="status" minWidth={110}>Status<Table.ColumnResizer /></Table.Column>
                    <Table.Column defaultWidth="1.2fr" id="actions" minWidth={140}>Actions</Table.Column>
                  </Table.Header>

                  <Table.Body>
                    {proposals.map((proposal) => {
                      const isRejected = proposal.status === "rejected";
                      const isAccepted = proposal.status === "accepted";
                      const disableActions = isTaskLocked || isRejected || isAccepted;

                      return (
                        <Table.Row key={proposal._id} className={`border-b last:border-0 border-slate-50 dark:border-slate-800/40 transition-colors ${isAccepted ? "bg-emerald-50/20 dark:bg-emerald-950/10" : ""}`}>
                          <Table.Cell className="font-bold text-slate-800 dark:text-slate-200">{proposal?.freelancerName || "Freelancer"}</Table.Cell>
                          <Table.Cell className="font-black text-slate-900 dark:text-slate-100 text-sm">${proposal.proposedBudget}</Table.Cell>
                          <Table.Cell className="text-slate-600 dark:text-slate-300 text-xs font-semibold">{proposal?.estimatedDays} Days</Table.Cell>
                          <Table.Cell className="text-slate-400 text-xs font-medium">
                            <div className="flex items-center gap-2 max-w-[240px]">
                              <span className="truncate">{proposal?.coverLetter || ""}</span>
                              <Button isIconOnly size="sm" variant="light" className="text-indigo-500 shrink-0" onPress={() => handleReadMessage(proposal?.freelancerName || "Freelancer", proposal?.coverLetter)}>
                                <FiEye className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </Table.Cell>
                          <Table.Cell>{getStatusChip(proposal?.status)}</Table.Cell>
                          <Table.Cell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="flat" color="success" className={`font-bold rounded-lg ${disableActions ? "opacity-30 cursor-not-allowed" : ""}`} disabled={disableActions} onClick={() => handleAcceptProposal(proposal)}>
                                Accept
                              </Button>
                              <Button size="sm" variant="flat" color="danger" className={`font-bold rounded-lg ${disableActions ? "opacity-30 cursor-not-allowed" : ""}`} disabled={disableActions} onClick={() => handleRejectProposal(proposal._id)}>
                                Reject
                              </Button>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table.Content>
              </Table.ResizableContainer>
            </Table>
          </div>
        )}
      </div>

      {/* MODAL 1: Cover letter display */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <Modal.CloseTrigger onClick={() => setIsModalOpen(false)} />
              <Modal.Header>
                <Modal.Icon className="bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                  <FiMessageSquare className="size-5" />
                </Modal.Icon>
                <Modal.Heading>{activeMessage.name}&apos;s Proposal Pitch</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{activeMessage.message}</p>
                <div className="mt-6 flex justify-end border-t border-slate-50 dark:border-slate-800/60 pt-4">
                  <Button variant="secondary" className="rounded-xl font-bold" onClick={() => setIsModalOpen(false)}>Close View</Button>
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* MODAL 2: Freelancer Information Display */}
      <Modal isOpen={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="center">
            <Modal.Dialog className="sm:max-w-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-xl">
              <Modal.CloseTrigger onClick={() => setIsProfileModalOpen(false)} />
              
              <Modal.Header className="flex flex-col items-center justify-center pt-8 pb-4 bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800/60">
                <Avatar 
                  src={hiredFreelancer.image} 
                  className="w-20 h-20 text-large border-3 border-indigo-500 shadow-md mb-3" 
                  isBordered
                  color="primary"
                />
                <Modal.Heading className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  {hiredFreelancer.name}
                </Modal.Heading>
                <span className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-wider flex items-center gap-1">
                  <FiBriefcase className="text-indigo-500" /> {hiredFreelancer.role}
                </span>
              </Modal.Header>

              <Modal.Body className="p-6 space-y-4">
                {/* Contact Email */}
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/40">
                  <FiMail className="text-slate-400 w-4 h-4 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Contact Email</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate block">{hiredFreelancer.email}</span>
                  </div>
                </div>

                {/* Bio Section */}
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">About & Bio</span>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-950/10 p-3 rounded-xl border border-slate-100 dark:border-slate-800/20">
                    &ldquo;{hiredFreelancer.bio}&rdquo;
                  </p>
                </div>

                {/* Skills Chips */}
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Expertise / Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {hiredFreelancer.skills.map((skill, i) => (
                      <span key={i} className="text-[11px] font-extrabold px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-100/10">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hourly Rate Footer Summary */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Hourly Rate</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">${hiredFreelancer.hourlyRate}/hr</span>
                  </div>
                  <Button 
                    variant="secondary" 
                    className="rounded-xl font-bold text-xs"
                    onClick={() => setIsProfileModalOpen(false)}
                  >
                    Close Profile
                  </Button>
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}