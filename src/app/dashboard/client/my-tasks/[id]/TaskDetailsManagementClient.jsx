"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Table, Chip, Button, Modal, Card } from "@heroui/react";
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiLayers,
  FiCheckCircle,
  FiXCircle,
  FiMessageSquare,
  FiEye,
  FiCheck,
  FiX,
  FiTrash,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";

export default function TaskDetailsManagementClient({ taskData }) {
  const router = useRouter();
  const [task] = useState(taskData);
  const [proposals, setProposals] = useState(taskData.proposals || []);

  // Modal control state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState({ name: "", message: "" });

  // Task already complete or Inprogress?
  const isTaskLocked = task.status === "in-progress" || task.status === "completed";

  // স্ট্যাটাস চিপ জেনারেটর
  const getStatusChip = (status, type = "task") => {
    const isPending = status === "pending";
    const isAccepted =
      status === "accepted" || status === "open" || status === "in-progress";

    return (
      <Chip
        color={
          isAccepted
            ? status === "in-progress"
              ? "warning"
              : "success"
            : isPending
              ? "warning"
              : "danger"
        }
        size="sm"
        variant="soft"
        className="font-bold capitalize border border-slate-200/10"
      >
        <span className="flex items-center gap-1">
          {isAccepted ? (
            status === "in-progress" ? (
              <FiClock />
            ) : (
              <FiCheckCircle />
            )
          ) : isPending ? (
            <FiClock />
          ) : (
            <FiXCircle />
          )}
          {status === "in-progress" ? "In Progress" : status}
        </span>
      </Chip>
    );
  };

  // Handle Cover letter modal
  const handleReadMessage = (name, message) => {
    setActiveMessage({ name, message });
    setIsModalOpen(true);
  };

  // Handle Proposal Reject
  const handleRejectProposal = (proposalId) => {
    setProposals((prev) =>
      prev.map((p) =>
        p._id === proposalId ? { ...p, status: "rejected" } : p,
      ),
    );
    toast.error("Proposal marked as rejected");
    // এখানে আপনার ব্যাকএন্ড API প্যাচ কল হবে:
    // await axios.patch(`/api/proposals/${proposalId}`, { status: "rejected" });
  };

  // Proposal Accept and handle strip redirect
  const handleAcceptProposal = (proposal) => {
    toast.loading("Redirecting to secure Stripe checkout...");

    setTimeout(() => {
      toast.dismiss();
      router.push(`/checkout?proposalId=${proposal._id}`,);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Back to my task  */}
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
          {getStatusChip(task?.status, "task")}
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
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Est. Budget
            </span>
            <span className="text-base font-black text-slate-900 dark:text-white flex items-center mt-0.5">
              <FiDollarSign className="text-indigo-500 text-sm" />
              {task?.budget} USD
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Deadline
            </span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 mt-1">
              <FiCalendar className="text-slate-400 text-xs" />
              {task?.deadline}
            </span>
          </div>
        </div>
        {/* Edit & Delete Button */}
        {!isTaskLocked && (
          <div className="mt-5 flex items-center gap-4">
            <Button variant="secondary">
              <BiEdit /> Edit
            </Button>
            <Button variant="danger-soft">
              <FiTrash /> Delete
            </Button>
          </div>
        )}
      </div>

      {/* Proposal Management table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FiMessageSquare className="text-purple-600" /> Incoming Bids (
            {proposals.length})
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Review applicant profiles, notes, and hire the perfect match. Only
            one freelancer can be accepted.
          </p>
        </div>

        {proposals.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
            <p className="text-xs font-bold text-slate-400">
              No proposals submitted for this task yet.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800/80">
            <Table aria-label="Tasks dashboard configuration table">
              <Table.ResizableContainer>
                <Table.Content className="min-w-[750px]">
                  <Table.Header>
                    <Table.Column
                      isRowHeader
                      defaultWidth="1.5fr"
                      id="title"
                      minWidth={180}
                    >
                      Freelancer Name
                      <Table.ColumnResizer />
                    </Table.Column>
                    <Table.Column
                      defaultWidth="0.8fr"
                      id="budget"
                      minWidth={110}
                    >
                      Budget Bid
                      <Table.ColumnResizer />
                    </Table.Column>
                    <Table.Column
                      defaultWidth="0.8fr"
                      id="deadline"
                      minWidth={110}
                    >
                      Delivery
                      <Table.ColumnResizer />
                    </Table.Column>
                    <Table.Column
                      defaultWidth="2fr"
                      id="category"
                      minWidth={220}
                    >
                      Message Note
                      <Table.ColumnResizer />
                    </Table.Column>
                    <Table.Column
                      defaultWidth="0.8fr"
                      id="status"
                      minWidth={110}
                    >
                      Status
                      <Table.ColumnResizer />
                    </Table.Column>
                    <Table.Column
                      defaultWidth="1.2fr"
                      id="actions"
                      minWidth={140}
                    >
                      Actions
                    </Table.Column>
                  </Table.Header>

                  <Table.Body>
                    {proposals.map((proposal) => {
                      const isRejected = proposal.status === "rejected";
                      const isAccepted = proposal.status === "accepted";
                      const disableActions = isTaskLocked || isRejected || isAccepted;

                      return (
                        <Table.Row
                          key={proposal._id}
                          className={`border-b last:border-0 border-slate-50 dark:border-slate-800/40 transition-colors ${isAccepted ? "bg-emerald-50/20 dark:bg-emerald-950/10" : ""}`}
                        >
                          {/* Freelancer Name */}
                          <Table.Cell className="font-bold text-slate-800 dark:text-slate-200">
                            {proposal?.freelancerName || "Freelancer"}
                          </Table.Cell>

                          {/* Proposed Budget*/}
                          <Table.Cell className="font-black text-slate-900 dark:text-slate-100 text-sm">
                            ${proposal.proposedBudget}
                          </Table.Cell>

                          {/* Completion Days */}
                          <Table.Cell className="text-slate-600 dark:text-slate-300 text-xs font-semibold">
                            {proposal?.estimatedDays} Days
                          </Table.Cell>

                          {/* Message Note */}
                          <Table.Cell className="text-slate-400 text-xs font-medium">
                            <div className="flex items-center gap-2 max-w-[240px]">
                              <span className="truncate">
                                {proposal?.coverLetter || ""}
                              </span>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="text-indigo-500 shrink-0"
                                onPress={() =>
                                  handleReadMessage(
                                    proposal?.freelancerName || "Freelancer",
                                    proposal?.coverLetter,
                                  )
                                }
                              >
                                <FiEye className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </Table.Cell>

                          {/* Status */}
                          <Table.Cell>
                            {getStatusChip(proposal?.status, "proposal")}
                          </Table.Cell>

                          {/* Accept / Reject */}
                          <Table.Cell>
                            <div className="flex items-center gap-2">
                              {/* Accept Button -> Stripe Redirect */}
                              <Button
                                size="sm"
                                variant="flat"
                                color="success"
                                className={`font-bold rounded-lg ${disableActions ? "opacity-30 cursor-not-allowed" : ""}`}
                                disabled={disableActions}
                                onClick={() => handleAcceptProposal(proposal)}
                              >
                                Accept
                              </Button>

                              {/* Reject Button */}
                              <Button
                                isIconOnly
                                size="sm"
                                variant="flat"
                                color="danger"
                                className={`rounded-lg ${disableActions ? "opacity-30 cursor-not-allowed" : ""}`}
                                disabled={disableActions}
                                onClick={() =>handleRejectProposal(proposal._id) }
                              >
                                Reject
                                {/* <FiX className="w-4 h-4" /> */}
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

      {/* Modal for cover letter */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <Modal.CloseTrigger onClick={() => setIsModalOpen(false)} />
              <Modal.Header>
                <Modal.Icon className="bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                  <FiMessageSquare className="size-5" />
                </Modal.Icon>
                <Modal.Heading>
                  {activeMessage.name}&apos;s Proposal Pitch
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {activeMessage.message}
                </p>
                <div className="mt-6 flex justify-end border-t border-slate-50 dark:border-slate-800/60 pt-4">
                  <Button
                    slot="close"
                    variant="secondary"
                    className="rounded-xl font-bold"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close View
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
