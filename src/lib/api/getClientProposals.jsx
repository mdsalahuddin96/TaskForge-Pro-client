import { protectedFetch, serverFetch } from "../core/server"

export const getClientProposals=async(email)=>{
    return protectedFetch(`/api/client/proposals/${email}`)
}