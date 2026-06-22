"use server"

import { redirect } from "next/navigation"

export const redirectTo=async(path)=>{
    redirect(path)
}