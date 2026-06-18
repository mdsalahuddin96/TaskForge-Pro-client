"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLinks";
import { Button, Spinner } from "@heroui/react";
import { IoLogInOutline } from "react-icons/io5";
const navItems = [
  { href: "/", text: "Home" },
  { href: "/browse-tasks", text: "Browse Tasks" },
  { href: "/browse-freelancers", text: "Browse Freelancers" },
];
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //   const { data, isPending } = useSession();
  //   const user = data?.user;
  const isPending = false;
  const user = false;
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
          <div className="flex gap-2 items-center">
            {/* <Image
              src={logo}
              alt="logo"
              height={50}
              width={50}
              className="rounded-full hidden md:block"
            /> */}
            <h1 className="gradient-text heading-font text-2xl md:text-3xl font-semibold">
              TaskForge Pro
            </h1>
          </div>
        </Link>

        {/* Navlinks */}
        <ul className="hidden items-center gap-4 md:flex">
          {navItems.map((item, ind) => (
            <NavLink key={ind} item={item}></NavLink>
          ))}
        </ul>
        {/* login & logout */}
        <div className="flex items-center gap-1.5 md:gap-3">
          {/* <ThemeSwitch /> */}
          {isPending ? (
            <div className="flex flex-col items-center">
              <Spinner color="success" size="lg" />
              <span className="text-primary text-sm">User...</span>
            </div>
          ) : user ? (
            <>
              {/* <ProfileDropdown user={user} /> */} <span>User</span>
            </>
          ) : (
            <>
              <Link href={"/signin"}>
                <Button
                  variant="primary"
                  className="btn-secondary cursor-pointer"
                >
                  <IoLogInOutline /> Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>
      {/* Mobile menu */}
      {isMenuOpen && (
        <>
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-2 p-4">
              {navItems.map((item, ind) => (
                <button
                  className="text-left max-w-40"
                  key={ind}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <NavLink item={item}></NavLink>
                </button>
              ))}
            </ul>
          </div>
          <div className="min-h-screen" onClick={()=>setIsMenuOpen(false)}>

          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
