"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiFileText,
  FiLayers,
  FiLogOut,
  FiX,
  FiCpu,
  FiCheckCircle,
  FiDollarSign,
  FiUser,
  FiUsers,
  FiCreditCard,
} from "react-icons/fi";
import { HamburgerContext } from "@/providers/HamburgerContextProvider";
import { BiHome } from "react-icons/bi";
import { GrTasks } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { Avatar } from "@heroui/react";
import { MdDashboard } from "react-icons/md";
const DashboardSidebar = ({ user }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(HamburgerContext);
  const pathname = usePathname();

  // Dashboard Menu Item
  const menuItem = {
    Client: [
      { text: "Overview", href: "/dashboard/client", icon: MdDashboard },
      {
        text: "Post Task",
        href: "/dashboard/client/post-task",
        icon: FiFileText,
      },
      { text: "My Tasks", href: "/dashboard/client/my-tasks", icon: GrTasks },
      {
        text: "Proposals",
        href: "/dashboard/client/proposals",
        icon: FiLayers,
      },
      { text: "Profile", href: "/dashboard/client/profile", icon: CgProfile },
    ],
    Freelancer: [
      { text: "Overview", href: "/dashboard/freelancer", icon: MdDashboard },
      {
        text: "Proposals",
        href: "/dashboard/freelancer/proposals",
        icon: FiLayers,
      },
      {
        text: "Projects",
        href: "/dashboard/freelancer/projects",
        icon: FiCheckCircle,
      },
      {
        text: "Earnings",
        href: "/dashboard/freelancer/earnings",
        icon: FiDollarSign,
      },
      { text: "Profile", href: "/dashboard/freelancer/profile", icon: FiUser },
    ],
    Admin: [
      { text: "Overview", href: "/dashboard/admin", icon: MdDashboard },
      { text: "Users", href: "/dashboard/admin/users", icon: FiUsers },
      { text: "Tasks", href: "/dashboard/admin/tasks", icon: FiFileText },
      {
        text: "Transactions",
        href: "/dashboard/admin/transactions",
        icon: FiCreditCard,
      },
    ],
  };

  const menuItems = menuItem[user?.role || "Client"];
  return (
    <div className="h-screen sticky top-0 z-40 flex">
      {/* Backdrop Overlay for mobile device */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/60 
        flex flex-col justify-between p-5 transition-transform duration-300 lg:static lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Sidebar top: Logo and close button */}
        <div>
          <div className="flex items-center justify-between mb-8 px-2">
            <Link href={"/"}>
              <div className="flex items-center gap-2 select-none font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent text-xl">
                <FiCpu className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
                <span>
                  TaskForge
                  <span className="text-slate-800 dark:text-slate-200 font-medium text-base ml-0.5">
                    Pro
                  </span>
                </span>
              </div>
            </Link>

            {/* close button */}
            <button
              className="lg:hidden p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.text}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30 shadow-sm"
                        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`}
                  />
                  {item.text}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar bottom: Logout button */}
        <div className=" border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <Avatar>
              <Avatar.Image
                imgprops={{
                  referrerPolicy: "no-referrer",
                }}
                alt={user?.name}
                src={user?.image}
                width={200}
                height={200}
              />
              <Avatar.Fallback delayMs={600}>
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "JD"}
              </Avatar.Fallback>
            </Avatar>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold leading-tight">
                {user?.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DashboardSidebar;
