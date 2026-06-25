"use server"

import { serverMutation } from "../core/server"

export const saveReview=async(data)=>{
    return serverMutation("/api/save/review",data)
}