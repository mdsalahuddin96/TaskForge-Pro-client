"use server"

import { serverMutation } from "../core/server"

export const createTask=async(data)=>{
    return serverMutation("/api/create/task",data)
}