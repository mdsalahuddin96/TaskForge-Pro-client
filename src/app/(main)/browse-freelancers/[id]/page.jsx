import React from "react";
import DetailsInfo from "./DetailsInfo";
import { getUser } from "@/lib/api/getUser";

const FreelancerDetailsProfile = async ({ params }) => {
  const { id } = await params;
  const freelancer = await getUser(id);
  console.log(freelancer);
  return (
    <div>
      <DetailsInfo freelancer={freelancer} />
    </div>
  );
};

export default FreelancerDetailsProfile;
