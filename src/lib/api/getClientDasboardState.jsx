import { protectedFetch, serverFetch } from "../core/server"
export const getClientDashboardState=async(email)=>{
    return protectedFetch(`/api/client-dashboard-stats?clientEmail=${email}`)
}