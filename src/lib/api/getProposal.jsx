import { serverFetch } from "../core/server"

export const getProposal=async (pathName,taskId,freelancerEmail)=>{
    return serverFetch(`/api/proposal?taskId=${taskId}&freelancerEmail=${freelancerEmail}`)
}