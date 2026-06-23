"use server"

import { serverMutation } from "../core/server"
import { getUserSession, requiredRole } from "../core/session"

export const savePayment=async(data)=>{
    const user=await getUserSession()
    await requiredRole("Client")
    const paymentData={
        ...data,
        clientEmail:user?.email
    }
    return serverMutation("/api/save/payment",paymentData)
}