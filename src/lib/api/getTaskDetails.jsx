import { serverFetch } from "../core/server"

export const getTaskDetails=async (id)=>{
    return serverFetch(`/api/taskDetails/${id}`)
}