import { protectedFetch, serverFetch } from "../core/server"

export const getFreelancerProposals=async(freelancerEmail)=>{
    return protectedFetch(`/api/freelancer/proposals?freelancerEmail=${freelancerEmail}`)
}