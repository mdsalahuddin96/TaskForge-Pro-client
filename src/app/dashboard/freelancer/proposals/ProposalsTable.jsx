"use client";

import { Table, Chip, Button, AlertDialog } from "@heroui/react";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiLayers,
  FiTrash2,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { Eye } from "@gravity-ui/icons";
import Link from "next/link";
import { deleteProposal } from "@/lib/api/deleteProposal";
import { usePathname, useRouter } from "next/navigation";
import { revalidateRoute } from "@/lib/actions/revalidateRoute";


export default function ProposalsTable({ proposals }) {
  const pathName=usePathname()
  const router=useRouter()
  // Generate chip according to status
  const getStatusChip = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
      case "open":
        return (
          <Chip
            color="success"
            size="sm"
            variant="soft"
            className="font-bold border border-success-200/30 capitalize"
          >
            <span className="flex items-center gap-1">
              <FiCheckCircle className="text-xs" />
              {status}
            </span>
          </Chip>
        );
      case "pending":
        return (
          <Chip
            color="warning"
            size="sm"
            variant="soft"
            className="font-bold border border-warning-200/30 capitalize"
          >
            <span className="flex items-center gap-1">
              <FiClock className="text-xs" />
              Pending
            </span>
          </Chip>
        );
      case "rejected":
        return (
          <Chip
            color="danger"
            size="sm"
            variant="soft"
            className="font-bold border border-danger-200/30 capitalize"
          >
            <span className="flex items-center gap-1">
              <FiXCircle className="text-xs" />
              Rejected
            </span>
          </Chip>
        );
      default:
        return (
          <Chip color="default" size="sm" variant="soft" className="capitalize">
            {status}
          </Chip>
        );
    }
  };


  const handleProposalDelete =async (id) => {
    const result=await deleteProposal(id)
    if(result.deletedCount>0){
      toast.error("Proposal Deleted!")
      await revalidateRoute(pathName)
      router.refresh()
    }else{
      toast.error("Proposal not deleted!")
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm">
      {/* Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FiLayers className="text-indigo-600 w-5 h-5" />
            My Submitted Proposals
          </h1>
          <p className="mt-1 text-xs text-slate-400 font-medium">
            Track all your pitched bids, job applications, and real-time review
            statuses.
          </p>
        </div>

        {/* Counter Badge*/}
        <div className="self-start sm:self-center text-xs font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
          Total Applications:{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            {proposals.length}
          </span>
        </div>
      </div>

      {/* HeroUI Resizable Grid Table Layout */}
      <div className="w-full overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800/80">
        <Table aria-label="Tasks dashboard configuration table">
          <Table.ResizableContainer>
            <Table.Content className="min-w-187.5">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  defaultWidth="2fr"
                  id="title"
                  minWidth={250}
                >
                  Task Title
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="0.8fr" id="budget" minWidth={100}>
                  Budget Bid
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1fr" id="dateSent" minWidth={130}>
                  Date Sent
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
                {proposals.map((proposal) => (
                  <Table.Row
                    key={proposal?._id}
                    className="border-b last:border-0 border-slate-50 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <Table.Cell className="font-semibold text-slate-800 dark:text-slate-200">
                      {proposal?.taskTitle}
                    </Table.Cell>

                    <Table.Cell className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      ${proposal?.proposedBudget}
                    </Table.Cell>

                    <Table.Cell className="text-slate-500 text-sm font-medium">
                      {new Date(proposal?.submittedAt).toLocaleDateString()}
                    </Table.Cell>

                    <Table.Cell>{getStatusChip(proposal?.status)}</Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        {/* View Button */}
                        <Link
                          size="sm"
                          variant="flat"
                          href={`/browse-tasks/${proposal?.taskId}`}
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        {/* Delete Button */}
                        <AlertDialog>
                          <Button
                            size="sm"
                            variant="flat"
                            isDisabled={proposal?.status === "accepted"}
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </Button>
                          <AlertDialog.Backdrop>
                            <AlertDialog.Container>
                              <AlertDialog.Dialog className="sm:max-w-[400px]">
                                <AlertDialog.CloseTrigger />
                                <AlertDialog.Header>
                                  <AlertDialog.Icon status="danger" />
                                  <AlertDialog.Heading>
                                    Delete Proposal permanently?
                                  </AlertDialog.Heading>
                                </AlertDialog.Header>
                                <AlertDialog.Body>
                                  <p>
                                    This will permanently delete the proposal for {" "} 
                                    <strong>{proposal?.taskTitle}</strong> and all
                                    of its data. This action cannot be undone.
                                  </p>
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                  <Button slot="close" variant="tertiary">
                                    Cancel
                                  </Button>
                                  <Button
                                    slot="close"
                                    variant="danger"
                                    onClick={()=>handleProposalDelete(proposal?._id)}
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
      </div>
    </div>
  );
}
