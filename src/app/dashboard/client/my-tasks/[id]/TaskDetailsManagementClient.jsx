"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Table, Chip, Button, Modal, Avatar } from "@heroui/react";
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
import { getFreelancerProfile } from "@/lib/api/getFreelancerProfile";
import { updateProposalStatus } from "@/lib/api/updateProposalStatus";
import { revalidateRoute } from "@/lib/actions/revalidateRoute";

export default function TaskDetailsManagementClient({ taskData }) {
  const router = useRouter();
  const pathName = usePathname();
  const task=taskData;
  const proposals=taskData?.proposals||[];

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState({ name: "", message: "" });
  const [profile, setProfile] = useState(null);
 
  // Task already complete or Inprogress?
  const isTaskLocked = task?.status.toLowerCase() !== "open";

  // স্ট্যাটাস চিপ জেনারেটর
  const getStatusChip = (status) => {
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

  const handleFreelancerProfile = async (email) => {
    const freelancerProfile = await getFreelancerProfile(email);
    setProfile(freelancerProfile);
    setIsProfileModalOpen(true);
    console.log(freelancerProfile);
  };
  const handleReadMessage = (name, message) => {
    setActiveMessage({ name, message });
    setIsModalOpen(true);
  };

  const handleRejectProposal = async (proposalId) => {
    const result = await updateProposalStatus(proposalId, {
      status: "rejected",
    });
    if (result.modifiedCount > 0) {
      await revalidateRoute(pathName)
      router.refresh()
      toast.error("Proposal marked as rejected");
    }
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
          <div className="flex items-center gap-3">
            {task?.status !== "complete" ? (
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950/40 p-2 rounded-xl border border-slate-100 dark:border-slate-800/60">
                {/* Checking submitted url present or not*/}
                {task?.submittedUrl ? (
                  <Button
                    as="a"
                    href={task.submittedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    variant="flat"
                    color="primary"
                    className="font-bold text-xs rounded-lg"
                    onPress={() =>
                      toast.success("Opening submission link to review...")
                    }
                  >
                    <FiEye className="w-3.5 h-3.5" /> Review Submitted Work
                  </Button>
                ) : (
                  <span className="text-xs text-slate-400 px-2 font-medium">
                    Waiting for submission...
                  </span>
                )}

                {/* Button for mark complete the task */}
                <Button
                  size="sm"
                  color="success"
                  className="font-black text-xs text-white bg-emerald-600 rounded-lg shadow-sm"
                  isDisabled={!task?.submittedUrl}
                  onPress={() => {
                    // এখানে API কল হয়ে টাস্ক স্ট্যাটাস 'complete' হবে
                    toast.success("Work approved! Task marked as completed.");
                  }}
                >
                  <FiCheckCircle className="w-3.5 h-3.5" /> Approve & Complete
                </Button>
              </div>
            ) : (
              // Task already complete and now give rating
              <Button
                size="sm"
                color="warning"
                className="font-black text-xs text-white bg-amber-500 rounded-xl shadow-md"
                onPress={() => setIsRatingModalOpen(true)}
              >
                ⭐ Rate Freelancer
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Proposal Management Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FiMessageSquare className="text-purple-600" /> Incoming Bids (
            {proposals.length})
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Review applicant profiles, notes, and hire the perfect match.
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
            <Table
              aria-label="Tasks dashboard configuration table"
              className="w-full"
            >
              <Table.ResizableContainer>
                <Table.Content>
                  <Table.Header>
                    <Table.Column isRowHeader id="title" minWidth={140}>
                      Freelancer Name
                    </Table.Column>
                    <Table.Column id="profile" minWidth={100} align="center">
                      Profile
                    </Table.Column>
                    <Table.Column id="budget" minWidth={90} align="center">
                      Budget Bid
                    </Table.Column>
                    <Table.Column id="deadline" minWidth={90} align="center">
                      Delivery
                    </Table.Column>
                    <Table.Column id="note" minWidth={70} align="center">
                      Pitch Note
                    </Table.Column>
                    <Table.Column id="status" minWidth={100} align="center">
                      Status
                    </Table.Column>
                    <Table.Column id="actions" minWidth={100} align="center">
                      Actions
                    </Table.Column>
                  </Table.Header>

                  <Table.Body>
                    {proposals.map((proposal) => {
                      const isPending = proposal.status === "pending";

                      return (
                        <Table.Row
                          key={proposal._id}
                          className="border-b last:border-0 border-slate-50 dark:border-slate-800/40 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
                        >
                          {/* Freelancer Name */}
                          <Table.Cell className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                            {proposal?.freelancerName || "Freelancer"}
                          </Table.Cell>

                          {/* Profile Trigger Button */}
                          <Table.Cell>
                            <Button
                              size="sm"
                              variant="light"
                              className="font-extrabold text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 gap-1 bg-indigo-50/50 hover:bg-indigo-50 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/40 rounded-xl px-3 py-1.5"
                              onPress={() =>
                                handleFreelancerProfile(
                                  proposal?.freelancerEmail,
                                )
                              }
                            >
                              <FiUser className="w-3.5 h-3.5" /> View
                            </Button>
                          </Table.Cell>

                          {/* Budget Bid */}
                          <Table.Cell className="font-black text-slate-900 dark:text-slate-100 text-sm">
                            ${proposal.proposedBudget}
                          </Table.Cell>

                          {/* Delivery Days */}
                          <Table.Cell className="text-slate-600 dark:text-slate-300 text-xs font-semibold">
                            {proposal?.estimatedDays} Days
                          </Table.Cell>

                          {/* Message Note (Fully Moved to Icon Triggered Modal) */}
                          <Table.Cell>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              color="secondary"
                              className="text-purple-600 dark:text-purple-400 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/30 dark:hover:bg-purple-950/60 rounded-xl"
                              onPress={() =>
                                handleReadMessage(
                                  proposal?.freelancerName || "Freelancer",
                                  proposal?.coverLetter ||
                                    "No pitch message provided.",
                                )
                              }
                              aria-label="Read full proposal note"
                            >
                              <FiEye className="w-4 h-4" />
                            </Button>
                          </Table.Cell>

                          {/* Status Chip */}
                          <Table.Cell>
                            {getStatusChip(proposal?.status)}
                          </Table.Cell>

                          {/* Redesigned Premium Action Buttons */}
                          <Table.Cell>
                            <div className="flex items-center justify-center gap-2">
                              {isPending ? (
                                <>
                                  {/* Modern Accept Button */}
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    className="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/30 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white rounded-xl transition-all duration-200 shadow-sm border border-emerald-200/20"
                                    onClick={() =>
                                      handleAcceptProposal(proposal)
                                    }
                                    title="Accept Proposal"
                                  >
                                    <FiCheckCircle className="w-4 h-4" />
                                  </Button>

                                  {/* Modern Reject Button */}
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    className="bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white rounded-xl transition-all duration-200 shadow-sm border border-rose-200/20"
                                    onClick={() =>
                                      handleRejectProposal(proposal._id)
                                    }
                                    title="Reject Proposal"
                                  >
                                    <FiXCircle className="w-4 h-4" />
                                  </Button>
                                </>
                              ) : (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                  Locked
                                </span>
                              )}
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

      {/* MODAL 2: Freelancer Information Display */}
      <Modal isOpen={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="center">
            <Modal.Dialog className="sm:max-w-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-xl">
              <Modal.CloseTrigger
                onClick={() => setIsProfileModalOpen(false)}
              />

              <Modal.Header className="flex flex-col items-center justify-center pt-8 pb-4 bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800/60">
                <Avatar className="h-20 w-20 rounded-2xl">
                  <Avatar.Image
                    imgprops={{
                      referrerPolicy: "no-referrer",
                    }}
                    alt={profile?.name}
                    src={profile?.image}
                    height={200}
                    width={200}
                    className="w-20 h-20 object-cover rounded-2xl text-large border-3 border-indigo-500 shadow-md mb-3"
                  />
                  <Avatar.Fallback delayMs={600}>
                    {profile?.name
                      ? profile.name.slice(0, 2).toUpperCase()
                      : "JD"}
                  </Avatar.Fallback>
                </Avatar>
                <Modal.Heading className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  {profile?.name}
                </Modal.Heading>
                <span className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-wider flex items-center gap-1">
                  <FiBriefcase className="text-indigo-500" /> {profile?.role}
                </span>
              </Modal.Header>

              <Modal.Body className="p-6 space-y-4">
                {/* Contact Email */}
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/40">
                  <FiMail className="text-slate-400 w-4 h-4 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">
                      Contact Email
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate block">
                      {profile?.email}
                    </span>
                  </div>
                </div>

                {/* Bio Section */}
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    About & Bio
                  </span>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-950/10 p-3 rounded-xl border border-slate-100 dark:border-slate-800/20">
                    &ldquo;{profile?.bio}&rdquo;
                  </p>
                </div>

                {/* Skills Chips */}
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Expertise / Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile?.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-extrabold px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-100/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hourly Rate Footer Summary */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">
                      Hourly Rate
                    </span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      ${profile?.hourlyRate}/hr
                    </span>
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
      {/* MODAL 3: Rating & Review for Freelancer */}
      <Modal isOpen={isRatingModalOpen} onOpenChange={setIsRatingModalOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="center">
            <Modal.Dialog className="sm:max-w-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-xl">
              <Modal.CloseTrigger onClick={() => setIsRatingModalOpen(false)} />

              <Modal.Header className="flex flex-col items-center justify-center pt-6 pb-2">
                <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-full text-amber-500 mb-2">
                  ⭐
                </div>
                <Modal.Heading className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                  Rate Freelancer&apos;s Work
                </Modal.Heading>
                <p className="text-xs text-slate-400 font-medium text-center px-6 mt-1">
                  Share your experience with{" "}
                  <span className="font-bold text-slate-600 dark:text-slate-300">
                    Freelancer Name
                  </span>{" "}
                  to help the community.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6 space-y-5">
                {/* ১. স্টার সিলেক্টর সেকশন */}
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Stars
                  </span>
                  <div className="flex items-center gap-2 text-2xl cursor-pointer">
                    {/* এখানে আপনার সুবিধামতো ১-৫ লুপ বা react-stars/react-rating কম্পোনেন্ট বসাতে পারেন */}
                    {["⭐", "⭐", "⭐", "⭐", "⭐"].map((star, idx) => (
                      <span
                        key={idx}
                        className="hover:scale-110 transition-transform"
                      >
                        {star}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ২. শর্ট রিভিউ টেক্সট এরিয়া */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Short Review / Feedback
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write a brief note about their communication, speed, and quality of work..."
                    className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none placeholder:text-slate-400"
                  />
                </div>

                {/* অ্যাকশন বাটন */}
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    variant="light"
                    className="w-1/2 rounded-xl font-bold text-xs"
                    onClick={() => setIsRatingModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    className="w-1/2 bg-indigo-600 text-white rounded-xl font-black text-xs shadow-md shadow-indigo-600/10"
                    onClick={() => {
                      // এখানে আপনার রিভিউ সাবমিট করার API ট্রিগার হবে
                      toast.success("Thank you for your feedback!");
                      setIsRatingModalOpen(false);
                    }}
                  >
                    Submit Review
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
