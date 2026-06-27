import { protectedFetch, serverFetch } from "../core/server"

export const getProposalById=async (proposalId)=>{
    return protectedFetch(`/api/proposalById?proposalId=${proposalId}`)
}