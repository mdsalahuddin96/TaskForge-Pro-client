import { serverFetch } from "../core/server"

export const getTaskByClientId=async(clientId)=>{
    const path=`/api/tasks?clientId=${clientId}`
    return serverFetch(path)
}