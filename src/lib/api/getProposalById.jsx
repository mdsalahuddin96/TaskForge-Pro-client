import { serverFetch } from "../core/server"

export const getProposalById=async (proposalId)=>{
    return serverFetch(`/api/proposalById?proposalId=${proposalId}`)
}