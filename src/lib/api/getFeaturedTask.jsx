import { serverFetch } from "../core/server"

export const getFeaturedTask=async()=>{
    return serverFetch(`/api/featured/tasks`)
}