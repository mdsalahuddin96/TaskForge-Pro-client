import { serverFetch } from "../core/server"

export const getActiveProjects=async(email)=>{
    return serverFetch(`/api/active/projects?freelancerEmail=${email}`)
}