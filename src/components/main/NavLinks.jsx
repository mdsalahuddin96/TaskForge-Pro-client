"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {
  const { href, text } = item;
  const pathName = usePathname();
  return (
    <li
      className={`relative pb-1 cursor-pointer font-semibold transition-all duration-200
    ${
      pathName === href
        ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-indigo-600 after:via-purple-600 after:to-violet-500"
        : "text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
    }`}
    >
      <Link href={href}>{text}</Link>
    </li>
  );
};

export default NavLink;
