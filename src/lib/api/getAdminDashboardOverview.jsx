import { serverFetch } from "../core/server"
export const getAdminDashboardOverview=async()=>{
    return serverFetch(`/api/admin/overview`)
}