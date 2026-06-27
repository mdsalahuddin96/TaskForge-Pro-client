import { redirectTo } from "@/lib/actions/redirectTo";
import { signOut } from "@/lib/auth-client";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { BiSolidDashboard, BiUser } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";

export function UserDropdown({ user }) {
  const roleBaseURL = {
    Client: "/dashboard/client",
    Freelancer: "/dashboard/freelancer",
    Admin: "/dashboard/admin",
  };
  const roleBaseProfile = {
    Client: "/dashboard/client/profile",
    Freelancer: "/dashboard/freelancer/profile",
    Admin: "/dashboard/admin/profile",
  };
  const handleSignout = async () => {
    await signOut();
    redirectTo("/")
  };
  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full focus:outline-none">
        <div className="px-3 py-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95">
          <div className="flex items-center gap-2">
            <Avatar size="md">
              <Avatar.Image
                referrerPolicy="no-referrer"
                alt={user?.name}
                src={user?.image}
                width={200}
                height={200}
              />
              <Avatar.Fallback delayMs={600}>
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "JD"}
              </Avatar.Fallback>
            </Avatar>
            <div>
              <p className="text-[16px] leading-5 font-medium text-slate-700 dark:text-slate-200">
                {user?.name}
              </p>
            </div>
            <RiArrowDropDownLine size={30} className="text-slate-700"/>
          </div>
        </div>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item id="dashboard" textValue="Dashboard">
            <Link
              href={roleBaseURL[user?.role]}
              className="inline-block w-full"
            >
              <div className="flex w-full items-center justify-between gap-2">
                <Label>Dashboard</Label>
                <BiSolidDashboard className="size-3.5 text-muted" />
              </div>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item id="profile" textValue="Profile">
            <Link
              href={roleBaseProfile[user?.role]}
              className="inline-block w-full"
            >
              <div className="flex w-full items-center justify-between gap-2">
                <Label>Profile</Label>
                <BiUser className="size-3.5 text-muted" />
              </div>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item
            id="logout"
            textValue="Logout"
            variant="danger"
            onClick={handleSignout}
          >
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Log Out</Label>
              <ArrowRightFromSquare className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
