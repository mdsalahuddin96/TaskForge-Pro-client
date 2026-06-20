"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item, isMobile = false }) => {
  const { href, text } = item;
  const pathName = usePathname();
  const isActive = pathName === href;

  // ====== For Mobile Mode ======
  if (isMobile) {
    return (
      <Link 
        href={href}
        className={`relative flex items-center w-full px-4 py-3 rounded-xl font-bold text-base transition-all duration-150 select-none
          ${isActive 
            ? "bg-indigo-50/60 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400" 
            : "text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          }`}
      >
        {/* Vertical Gradient Bar when active */}
        {isActive && (
          <span className="absolute left-0 top-1/4 w-[4px] h-1/2 rounded-r-md bg-gradient-to-b from-indigo-600 via-purple-600 to-violet-500" />
        )}
        <span className={isActive ? "translate-x-1 transition-transform" : ""}>
          {text}
        </span>
      </Link>
    );
  }

  // ====== For Desktop mode ======
  return (
    <li
      className={`relative pb-1 cursor-pointer font-semibold transition-all duration-200
        ${isActive
          ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-indigo-600 after:via-purple-600 after:to-violet-500"
          : "text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
        }`}
    >
      <Link href={href}>{text}</Link>
    </li>
  );
};

export default NavLink;