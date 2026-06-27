import { protectedFetch, serverFetch } from "../core/server"

export const getActiveProjects=async(email)=>{
    return protectedFetch(`/api/active/projects?freelancerEmail=${email}`)
}