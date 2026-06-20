"use client";

import React from "react";
import Link from "next/link";
import { 
  FiCpu, 
  FiMail, 
  FiGithub, 
  FiLinkedin, 
  FiGlobe 
} from "react-icons/fi";
import { BsTwitterX } from "react-icons/bs";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  // নেভিগেশন লিঙ্কসমূহ
  const quickLinks = [
    { text: "Home", href: "/" },
    { text: "Browse Tasks", href: "/tasks" },
    { text: "Post a Task", href: "/post-task" },
    { text: "About Us", href: "/about" },
  ];

  const supportLinks = [
    { text: "Terms of Service", href: "/terms" },
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Help & Support", href: "/support" },
  ];

  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-900 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        {/* ================= TOP FOOTER: 4 COLUMN GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
        {/* Logo & Intro */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 select-none font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent text-xl">
              <FiCpu className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
              <span>TaskForge<span className="text-slate-800 dark:text-slate-200 font-medium text-base ml-0.5">Pro</span></span>
            </div>
            <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              The simplified micro-task marketplace. Connect instantly with top talent for fast, secure, and one-time task execution.
            </p>
          </div>

          {/* Quick Links*/}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {quickLinks.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support and Legal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {supportLinks.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-1">
              Contact Us
            </h3>
            <div className="flex items-center gap-2.5 text-sm font-medium">
              <FiMail className="w-4 h-4 text-slate-400" />
              <a href="mailto:salauddincse96@email.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                salauddincse96@email.com
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-sm font-medium">
              <FiGlobe className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500">Dhaka, Bangladesh</span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-slate-200/60 dark:bg-slate-900 mb-8" />

        {/* ================= BOTTOM FOOTER: COPYRIGHT & SOCIALS ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright Text */}
          <p className="text-sm font-medium text-slate-400 dark:text-slate-500 text-center sm:text-left">
            © {currentYear} TaskForge Pro. All rights reserved.
          </p>

          {/* Social media link */}
          <div className="flex items-center gap-4">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 dark:bg-slate-900 rounded-xl hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-100 dark:border-slate-800/50 transition shadow-sm" aria-label="X (Twitter)">
              <BsTwitterX className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 dark:bg-slate-900 rounded-xl hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-100 dark:border-slate-800/50 transition shadow-sm" aria-label="LinkedIn">
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 dark:bg-slate-900 rounded-xl hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-100 dark:border-slate-800/50 transition shadow-sm" aria-label="GitHub">
              <FiGithub className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}