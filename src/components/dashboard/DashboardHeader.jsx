'use client'
import { HamburgerContext } from "@/providers/HamburgerContextProvider";
import { Avatar, Button } from "@heroui/react";
import React, { useContext } from "react";
import { FiBell, FiMenu } from "react-icons/fi";

const DashboardHeader = () => {
    const {setIsSidebarOpen}=useContext(HamburgerContext)
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
          Dashboard Workspace
        </h2>
      </div>

      {/* রাইট সাইড: নোটিফিকেশন ও ইউজার প্রোফাইল */}
      <div className="flex items-center gap-4">
        {/* নোটিফিকেশন বাটন */}
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

        {/* ডিভাইডার */}
        <span className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800" />

        {/* প্রোফাইল অবতার */}
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
            size="sm"
            isBordered
            className="border-indigo-600"
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold leading-tight">
              Sarah Connor
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Freelancer
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
