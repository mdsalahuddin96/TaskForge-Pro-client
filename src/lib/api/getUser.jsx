import { serverFetch } from "../core/server"

export const getUser=async(id)=>{
    const path=`/api/user/${id}`
    return serverFetch(path)
}