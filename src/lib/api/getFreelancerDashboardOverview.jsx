import { serverFetch } from "../core/server"
export const getFreelancerDashboardOverview=async(email)=>{
    return serverFetch(`/api/freelancer-overview/${email}`)
}