import { protectedFetch, serverFetch } from "../core/server"

export const getPaymentHistory=async ()=>{
    return protectedFetch(`/api/payments`)
}