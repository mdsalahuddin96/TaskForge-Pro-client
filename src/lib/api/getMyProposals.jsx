import { serverFetch } from "../core/server"

export const getMyProposals=async(freelancerEmail)=>{
    return serverFetch(`/api/myproposals?freelancerEmail=${freelancerEmail}`)
}