"use client";
import { redirectTo } from "@/lib/actions/redirectTo";
import { signOut } from "@/lib/auth-client";
import { HamburgerContext } from "@/providers/HamburgerContextProvider";
import { Button } from "@heroui/react";

import React, { useContext } from "react";
import { FiBell, FiLogOut, FiMenu } from "react-icons/fi";

const DashboardHeader = ({user}) => {
  const { setIsSidebarOpen } = useContext(HamburgerContext);
  const handleLogout=async()=>{
    await signOut()
    redirectTo("/")
  }
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/70 backdrop-blur-md border-b border-slate-200/50 dark:bg-slate-900/75 dark:border-slate-800/50 flex items-center justify-between px-6">
      {/* লেফট সাইড: হ্যামবার্গার (মোবাইলের জন্য) এবং টাইটেল */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FiMenu className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-200 hidden sm:block">
         {user?.role} Dashboard
        </h2>
      </div>

      {/*Notification and logout */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <Button
          isIconOnly
          variant="light"
          className="text-slate-500 dark:text-slate-400 rounded-xl"
        >
          <div className="relative">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </div>
        </Button>

        {/* Divider */}
        <span className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

        {/* Logout button */}
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-danger cursor-pointer hover:bg-danger-50 dark:hover:bg-danger-950/20 rounded-xl transition-colors group">
          <FiLogOut className="w-5 h-5 text-danger transition-transform group-hover:-translate-x-0.5" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
