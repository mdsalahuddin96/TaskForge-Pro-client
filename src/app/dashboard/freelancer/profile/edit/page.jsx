// src/app/dashboard/freelancer/profile/edit/page.jsx
import React from "react";
import EditProfile from "./EditProfile";
import { getUser } from "@/lib/api/getUser";
import { getUserSession } from "@/lib/core/session";

export default async function EditProfilePage() {
  // Initial current profile data loaded from database
  const user=await getUserSession()
  const currentProfile=await getUser(user?.id)
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 w-full space-y-8">
      <div className="text-left">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Edit Profile
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-0.5">
          Freelancers can change their public details here anytime.
        </p>
      </div>

      <EditProfile initialProfile={currentProfile} />
    </div>
  );
}