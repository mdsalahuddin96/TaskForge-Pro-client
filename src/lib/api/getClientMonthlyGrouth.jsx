import { serverFetch } from "../core/server"
export const getClientMonthlyGrouth=async(id)=>{
    return serverFetch(`/api/monthly-growth/${id}`)
}