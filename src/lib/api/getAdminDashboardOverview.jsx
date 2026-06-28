import { protectedFetch, serverFetch } from "../core/server"
export const getAdminDashboardOverview=async()=>{
    return protectedFetch(`/api/admin/overview`)
}