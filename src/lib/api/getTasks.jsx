import { protectedFetch, serverFetch } from "../core/server"

export const getTasks=async(clientId)=>{
    
    const path=clientId?`/api/tasks?clientId=${clientId}`:`/api/tasks`
    return protectedFetch(path)
}