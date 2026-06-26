"use client";

import React, { useState, useEffect } from "react";
import { Table, Spinner, Button, Avatar } from "@heroui/react";
import { FiShieldOff, FiShield, FiUsers } from "react-icons/fi";
import Image from "next/image";
import { updateUser } from "../../../../lib/api/updateUser";
import toast from "react-hot-toast";
import { getAllUsers } from "@/lib/api/getAllUsers";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null); // স্পেসিফিক বাটনে স্পিনার দেখানোর জন্য

  // ১. ডামি ডেটা ফেচিং বা এপিআই কল স্ট্রাকচার
  useEffect(() => {
    const fetchAllAccounts = async () => {
      try {
        const data = await getAllUsers();
        if (data) {
          setUsers(data);
        }
      } catch (error) {
        console.error("Failed to load platform accounts:", error);

        // এপিআই রেডি না থাকলে টেস্ট করার জন্য ডামি ডাটা সেট করে রাখতে পারেন
        // setUsers([
        //   {
        //     _id: "1",
        //     name: "Salah uddin",
        //     email: "salauddin@gmail.com",
        //     image:
        //       "https://images.unsplash.com/photo-1605568427561-40dd23c2acea",
        //     role: "Client",
        //     isBlocked: false,
        //   },
        //   {
        //     _id: "2",
        //     name: "John Doe",
        //     email: "john@freelancer.com",
        //     image:
        //       "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        //     role: "Freelancer",
        //     isBlocked: true,
        //   },
        // ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAccounts();
  }, []);

  const handleToggleBlock = async (userId, currentBlockStatus) => {
    setActionLoadingId(userId);
    try {
      const result = await updateUser(userId, {
        isBlocked: !currentBlockStatus,
      });
      console.log("currentBlockStatus", currentBlockStatus);
      if (result.modifiedCount > 0) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId
              ? { ...user, isBlocked: !currentBlockStatus }
              : user,
          ),
        );
      }
    } catch (error) {
      console.error("Action error on account handler:", error);
    } finally {
      setTimeout(() => setActionLoadingId(null), 400);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner
          color="indigo"
          size="lg"
          label="Fetching Account Profiles..."
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
            <FiUsers className="text-indigo-500" /> Manage Users
          </h1>
          <p className="text-xs font-medium text-slate-400 dark:text-zinc-500 mt-1">
            Monitor identities, system authorization, client-freelancer roles
            and access permissions.
          </p>
        </div>
        <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 w-fit">
          Total Base: {users.length} Users
        </div>
      </div>

      {/* ─── HEROUI DATA TABLE ─── */}
      <div className="bg-white dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-900 shadow-sm rounded-2xl overflow-hidden">
        <Table aria-label="System Users Configuration Matrix Framework">
          <Table.ResizableContainer>
            <Table.Content className="min-w-187.5">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  defaultWidth="2fr"
                  id="identity"
                  minWidth={260}
                >
                  Identity Profile
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1fr" id="role" minWidth={140}>
                  Platform Role
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1fr" id="status" minWidth={140}>
                  Access Status
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1fr" id="actions" minWidth={130}>
                  Security Actions
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {users.map((user) => (
                  <Table.Row
                    key={user?._id}
                    className="border-b last:border-0 border-slate-100 dark:border-zinc-900/60 hover:bg-slate-50/50 dark:hover:bg-zinc-900/40 transition-colors"
                  >
                    {/* Identity Profile (Avatar + Name + Email) */}
                    <Table.Cell>
                      <div className="flex items-center gap-3 py-1">
                        <Avatar>
                          <Avatar.Image
                            referrerPolicy="no-referrer"
                            alt={user?.name}
                            src={user?.image}
                            width={200}
                            height={200}
                          />
                          <Avatar.Fallback delayMs={600}>
                            {user?.name
                              ? user.name.slice(0, 2).toUpperCase()
                              : "JD"}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-black text-slate-800 dark:text-zinc-200 tracking-tight text-sm">
                            {user?.name}
                          </span>
                          <span className="text-xs font-medium text-slate-400 dark:text-zinc-500">
                            {user?.email}
                          </span>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* Platform Role Badge */}
                    <Table.Cell>
                      <span
                        className={`inline-flex items-center text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          user?.role === "Client"
                            ? "bg-indigo-500/5 border-indigo-500/20 text-indigo-500 dark:text-indigo-400"
                            : "bg-emerald-500/5 border-emerald-500/20 text-emerald-500 dark:text-emerald-400"
                        }`}
                      >
                        {user?.role}
                      </span>
                    </Table.Cell>

                    {/* Access Status Badge */}
                    <Table.Cell>
                      {user?.isBlocked ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-rose-500/5 border border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-wide">
                          Suspended
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-wide">
                          Active Line
                        </span>
                      )}
                    </Table.Cell>

                    {/* Security Actions Trigger Button */}
                    <Table.Cell>
                      <Button
                        size="sm"
                        variant="flat"
                        isLoading={actionLoadingId === user?._id}
                        onClick={() =>
                          handleToggleBlock(user?._id, user?.isBlocked)
                        }
                        className={`text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-all ${
                          user?.isBlocked
                            ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:bg-emerald-500/5 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white"
                            : "bg-rose-500/10 text-rose-600 hover:bg-rose-600 hover:text-white dark:bg-rose-500/5 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white"
                        }`}
                      >
                        {user?.isBlocked ? (
                          <>
                            <FiShield className="w-3.5 h-3.5 mr-1" /> Unblock
                          </>
                        ) : (
                          <>
                            <FiShieldOff className="w-3.5 h-3.5 mr-1" /> Block
                          </>
                        )}
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>

        {/* Empty State Account Guard */}
        {users.length === 0 && (
          <div className="w-full text-center py-16 border-t border-slate-100 dark:border-zinc-900/60">
            <p className="text-xs font-bold text-slate-400 dark:text-zinc-500">
              No registered user matrices found in system records.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
