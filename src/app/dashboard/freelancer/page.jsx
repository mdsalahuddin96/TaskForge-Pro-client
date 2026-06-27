import DashboardOverview from "@/components/dashboard/freelancer/DashboardOverview";
import { getFreelancerDashboardOverview } from "@/lib/api/getFreelancerDashboardOverview";
import { getUserSession } from "@/lib/core/session";

const FreelancerOverview =async () => {
  const freelancer=await getUserSession()
   const data = await getFreelancerDashboardOverview(freelancer?.email)
   console.log('data',data)
   console.log("freelancer",freelancer)
  return (
    <DashboardOverview data={data}/>
  );
};

export default FreelancerOverview;