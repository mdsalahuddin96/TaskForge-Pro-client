import { protectedFetch, serverFetch } from "../core/server"

export const getUser=async(id)=>{
    const path=`/api/user/${id}`
    return protectedFetch(path)
}