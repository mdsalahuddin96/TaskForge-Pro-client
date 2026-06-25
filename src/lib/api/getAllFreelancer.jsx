import { serverFetch } from "../core/server"

export const getAllFreelancer=async ()=>{
    return serverFetch(`/api/all/freelancer`)
}