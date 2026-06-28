"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLinks";
import { Button, Spinner } from "@heroui/react";
import { FiCpu } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";

const navItems = [
  { href: "/", text: "Home" },
  { href: "/browse-tasks", text: "Browse Tasks" },
  { href: "/browse-freelancers", text: "Browse Freelancers" },
];
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, isPending } = useSession();
  const user = data?.user;
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50 dark:bg-slate-900/75 dark:border-slate-800/50">
      <header className="flex h-16 items-center justify-between px-6 container mx-auto">
        {/* Hamburger for mobile */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* logo */}
        <Link href={"/"} className="cursor-pointer">
          <div className="flex items-center gap-2.5 select-none group cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 p-[1.5px] shadow-md shadow-indigo-500/10 dark:shadow-indigo-950/30 transition-transform duration-300 group-hover:scale-105">
              <div className="flex items-center justify-center w-full h-full rounded-[10px] bg-white dark:bg-slate-900 transition-colors">
                <FiCpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>

            {/* Logo Text */}
            <div className="flex flex-col justify-center">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400">
                TaskForge
                <span className="text-slate-800 dark:text-slate-200 font-medium text-lg font-bold ml-0.5">
                  Pro
                </span>
              </span>
            </div>
          </div>
        </Link>

        {/* Navlinks */}
        <ul className="hidden items-center gap-4 md:flex">
          {navItems.map((item, ind) => (
            <NavLink key={ind} item={item}></NavLink>
          ))}
        </ul>
        {/* login & logout */}
        <div className="flex items-center gap-1.5 md:gap-4">
          {/* <ThemeSwitch /> */}
          {isPending ? (
            <div className="flex gap-2 items-center">
              <Spinner color="success" size="sm" />
              <span className="text-primary text-sm">User...</span>
            </div>
          ) : user ? (
            <>
              <UserDropdown user={user} />
            </>
          ) : (
            <>
            <Link href={"/login"} className="font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">Sign In</Link>
              <Link href={"#"} className="hidden md:block">
                <Button className="sm:w-auto px-4 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white font-bold rounded-md shadow-lg shadow-indigo-600/15 hover:from-indigo-700 hover:to-violet-700 hover:scale-105 transition duration-300 flex items-center justify-center gap-2">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>
      {/* Mobile menu */}
      {isMenuOpen && (
        <>
          {/* Overlay  */}
          <div
            className="fixed min-h-screen inset-0 top-16 z-40 bg-slate-900/10 backdrop-blur-sm md:hidden transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu*/}
          <div className="absolute top-16 left-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 shadow-xl md:hidden">
            <ul className="flex flex-col gap-1.5 p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navItems.map((item, ind) => (
                <li
                  key={ind}
                  className="w-full list-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <NavLink item={item} isMobile={true} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
