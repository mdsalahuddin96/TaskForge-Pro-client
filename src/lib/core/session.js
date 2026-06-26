import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const getUserSession=async()=>{
    const session=await auth.api.getSession({
        headers:await headers()
    })
    
    return session?.user||null
}

export const requiredRole=async(role)=>{
    const user=await getUserSession()
    if(!user){
        redirect("/unauthorized")
    }
    if(user.role.toLowerCase()!==role.toLowerCase()){
        redirect("/forbidden")
    }
}