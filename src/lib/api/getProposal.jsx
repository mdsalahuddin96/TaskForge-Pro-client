import { serverFetch } from "../core/server"

export const getProposal=async (taskId,freelancerEmail)=>{
    return serverFetch(`/api/proposal?taskId=${taskId}&freelancerEmail=${freelancerEmail}`)
}