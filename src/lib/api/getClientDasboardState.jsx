import { serverFetch } from "../core/server"
export const getClientDashboardState=async(email)=>{
    return serverFetch(`/api/client-dashboard-stats?clientEmail=${email}`)
}