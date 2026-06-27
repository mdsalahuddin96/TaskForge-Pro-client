import { protectedFetch, serverFetch } from "../core/server"
export const getClientMonthlyGrouth=async(id)=>{
    return protectedFetch(`/api/monthly-growth/${id}`)
}