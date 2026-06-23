import { serverFetch } from "../core/server"

export const getFreelancerProposals=async(freelancerEmail)=>{
    return serverFetch(`/api/freelancer/proposals?freelancerEmail=${freelancerEmail}`)
}