import { protectedFetch, serverFetch } from "../core/server"
export const getFreelancerDashboardOverview=async(email)=>{
    return protectedFetch(`/api/freelancer-overview/${email}`)
}