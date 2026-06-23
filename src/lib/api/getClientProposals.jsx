import { serverFetch } from "../core/server"

export const getClientProposals=async()=>{
    return serverFetch(`/api/client/proposals`)
}