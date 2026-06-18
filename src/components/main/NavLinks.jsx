'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({item}) => {
    const {href,text}=item;
    const pathName=usePathname();
  return (
    <li className={`${pathName===href&&'border-b-2'} cursor-pointer`}>
      <Link href={href}>{text}</Link>
    </li>
  );
};

export default NavLink;
