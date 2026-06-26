import { serverFetch } from "../core/server"

export const getBrowseTask=async(search="",category="",budget="")=>{
    return serverFetch(`/api/browse-tasks?search=${search}&category=${category}&budget=${budget}`)
}