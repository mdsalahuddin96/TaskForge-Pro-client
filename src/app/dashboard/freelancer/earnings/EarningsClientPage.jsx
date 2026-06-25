// src/app/dashboard/freelancer/earnings/EarningsClientPage.jsx
"use client";

import React from "react";
import { Table, Card } from "@heroui/react";
import { motion } from "framer-motion";
import { FiDollarSign, FiTrendingUp, FiCheckCircle } from "react-icons/fi";

export default function EarningsClientPage({ initialData, totalEarnings }) {
  // Date format utility helper (e.g., June 25, 2026)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8 w-full">
      {/* Overview Highlight Card Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl flex flex-row items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                Total Revenue Made
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                ${totalEarnings}
              </h2>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 p-3 rounded-xl">
              <FiTrendingUp className="w-6 h-6" />
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl flex flex-row items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                Completed Contracts
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {initialData.length} Tasks
              </h2>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 p-3 rounded-xl">
              <FiCheckCircle className="w-6 h-6" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Table Structure */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <Table className="w-full" shadow="none">
          <Table.ScrollContainer className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-sm overflow-hidden">
            <Table.Content aria-label="Freelancer Earnings Ledger Table">
              <Table.Header className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                <Table.Column
                  isRowHeader
                  className="text-xs font-black text-slate-400 uppercase py-4 pl-6 text-left"
                >
                  Task Title
                </Table.Column>
                <Table.Column className="text-xs font-black text-slate-400 uppercase py-4 text-left">
                  Client Name
                </Table.Column>
                <Table.Column className="text-xs font-black text-slate-400 uppercase py-4 text-left">
                  Amount Made
                </Table.Column>
                <Table.Column className="text-xs font-black text-slate-400 uppercase py-4 pr-6 text-right">
                  Completion Date
                </Table.Column>
              </Table.Header>

              <Table.Body className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {initialData.map((row) => (
                  <Table.Row
                    key={row._id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-950/40 transition-colors group cursor-default"
                  >
                    <Table.Cell className="py-4 pl-6 text-sm font-black tracking-tight text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-left">
                      {row?.taskTitle}
                      <span className="block text-[9px] font-bold text-slate-400 uppercase font-mono mt-0.5 tracking-normal">
                        TXID: {row?.transaction_id}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="py-4 text-xs font-bold text-slate-600 dark:text-slate-300 text-left">
                      {row?.clientName}
                    </Table.Cell>

                    <Table.Cell className="py-4 text-left">
                      <span className="inline-flex items-center gap-0.5 text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-lg border border-emerald-100/20">
                        <FiDollarSign className="w-3.5 h-3.5" />
                        {row?.amount}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="py-4 pr-6 text-xs font-extrabold text-slate-400 dark:text-slate-500 text-right">
                      {formatDate(row?.payedAt)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>

        {/* Empty state conditional view handler */}
        {initialData.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 w-full mt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              No earnings recorded yet.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
