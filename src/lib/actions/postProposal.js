'use server'

import { serverMutation } from "../core/server"

export const postProposal=async(data)=>{
    return serverMutation("/api/post/proposal",data)
}