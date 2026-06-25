// src/app/dashboard/freelancer/profile/edit/page.jsx
import React from "react";
import { getUser } from "@/lib/api/getUser";
import { getUserSession } from "@/lib/core/session";
import EditClientProfile from "./EditClientProfile";

export default async function EditProfilePage() {
  // Initial current profile data loaded from database
  const user = await getUserSession();
  const currentProfile = await getUser(user?.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 w-full space-y-8">
      <EditClientProfile initialProfile={currentProfile} />
    </div>
  );
}
