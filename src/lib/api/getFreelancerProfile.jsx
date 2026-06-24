import { serverFetch } from "../core/server"
export const getFreelancerProfile=async(email)=>{
    return serverFetch(`/api/freelancerProfile?freelancerEmail=${email}`)
}