import { serverFetch } from "../core/server"

export const getTasks=async(clientId)=>{
    
    const path=clientId?`/api/tasks?clientId=${clientId}`:`/api/tasks`
    return serverFetch(path)
}