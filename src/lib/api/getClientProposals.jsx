import { protectedFetch, serverFetch } from "../core/server"

export const getClientProposals=async()=>{
    return protectedFetch(`/api/client/proposals`)
}