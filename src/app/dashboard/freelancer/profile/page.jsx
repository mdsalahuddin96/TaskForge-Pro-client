// src/app/dashboard/freelancer/profile/page.jsx
import React from "react";
import FreelancerProfileClient from "./FreelancerProfileClient";
import { getUserSession } from "@/lib/core/session";
import { getUser } from "@/lib/api/getUser";

export default async function FreelancerProfilePage() {
  const user=await getUserSession()
  console.log(user)
  const freelancerData=await getUser(user?.id)
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 w-full">
      <FreelancerProfileClient profile={freelancerData} />
    </div>
  );
}