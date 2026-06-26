import { serverFetch } from "../core/server"

export const getPaymentHistory=async ()=>{
    return serverFetch(`/api/payments`)
}