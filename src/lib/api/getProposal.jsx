import { protectedFetch, serverFetch } from "../core/server"

export const getProposal=async (taskId="",freelancerEmail="")=>{
    return protectedFetch(`/api/proposal?taskId=${taskId}&freelancerEmail=${freelancerEmail}`)
}