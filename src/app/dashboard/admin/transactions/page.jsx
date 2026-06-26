"use client";

import React, { useState, useEffect } from "react";
import { Table, Spinner } from "@heroui/react";
import { FiDollarSign, FiCalendar, FiUser } from "react-icons/fi";
import { FaStripe } from "react-icons/fa";
import { getPaymentHistory } from "@/lib/api/getPaymentHistory";

export default function TransactionsHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const payments=await getPaymentHistory()
        if (payments) {
          setTransactions(payments);
        }
        console.log("payments",payments)
      } catch (error) {
        console.error("Failed to sync transactions database:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner color="indigo" size="lg" label="Syncing Stripe Ledger Pipelines..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ─── HEADER SECTION ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-slate-200/60 dark:border-zinc-900 shadow-sm">
        <div>
          <h1 className="text-xl font-black tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
            <FiDollarSign className="text-indigo-500" /> Transactions History
          </h1>
          <p className="text-xs font-medium text-slate-400 dark:text-zinc-500 mt-1">
            Real-time balance settlement monitoring, platform revenue pipelines, and Stripe gateway logs.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 w-fit">
          Powered by <FaStripe className="text-[28px] text-[#635BFF] mt-0.5" />
        </div>
      </div>

      {/* ─── HEROUI DATA TABLE ─── */}
      <div className="bg-white dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-900 shadow-sm rounded-2xl overflow-hidden">
        <Table aria-label="Stripe Payments Ledger Moderation Matrix">
          <Table.ResizableContainer>
            <Table.Content className="min-w-187.5">
              <Table.Header>
                <Table.Column isRowHeader defaultWidth="1.5fr" id="client" minWidth={220}>
                  Client Email
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1.5fr" id="freelancer" minWidth={220}>
                  Freelancer Email
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="0.8fr" id="payout" minWidth={110}>
                  Payout Size
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1fr" id="date" minWidth={140}>
                  Payment Date
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="0.8fr" id="status" minWidth={110}>
                  Status
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {transactions.map((tx) => (
                  <Table.Row
                    key={tx?._id}
                    className="border-b last:border-0 border-slate-100 dark:border-zinc-900/60 hover:bg-slate-50/50 dark:hover:bg-zinc-900/40 transition-colors"
                  >
                    {/* Client Email Column */}
                    <Table.Cell>
                      <div className="flex items-center gap-2 py-1 text-slate-800 dark:text-zinc-200 font-black tracking-tight text-sm">
                        <FiUser className="text-indigo-500 flex-shrink-0 w-3.5 h-3.5" />
                        {tx?.clientEmail}
                      </div>
                    </Table.Cell>

                    {/* Freelancer Email Column */}
                    <Table.Cell>
                      <div className="flex items-center gap-2 py-1 text-slate-700 dark:text-zinc-300 font-bold text-sm">
                        <FiUser className="text-emerald-500 flex-shrink-0 w-3.5 h-3.5" />
                        {tx?.freelancerEmail}
                      </div>
                    </Table.Cell>

                    {/* Payout Size Column */}
                    <Table.Cell>
                      <span className="font-black text-slate-900 dark:text-zinc-100 text-base tracking-tight">
                        ${tx?.amount}
                      </span>
                    </Table.Cell>

                    {/* Payment Date Column */}
                    <Table.Cell>
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 text-xs font-semibold">
                        <FiCalendar className="text-slate-400" />
                        {new Date(tx?.payedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </Table.Cell>

                    {/* Payment Status Column */}
                    <Table.Cell>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {tx?.payment_status}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>

        {/* Empty State Fallback Guard */}
        {transactions.length === 0 && (
          <div className="w-full text-center py-16 border-t border-slate-100 dark:border-zinc-900/60">
            <p className="text-xs font-bold text-slate-400 dark:text-zinc-500">
              No verified Stripe transactions ledger accounts detected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}