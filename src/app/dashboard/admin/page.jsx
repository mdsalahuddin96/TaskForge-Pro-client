
import StatsCards from "../../../components/dashboard/admin/StatsCards";
import TrendChart from "../../../components/dashboard/admin/TreandChart";
import CategoryChart from "../../../components/dashboard/admin/CategoryChart";
import { getAdminDashboardOverview } from "@/lib/api/getAdminDashboardOverview";

export default async function AdminOverview() {
  const data = await getAdminDashboardOverview();
  return (
    <div className="space-y-6">
      {/* ─── TOP ROW: STATS ─── */}
      <StatsCards stats={data?.stats} />

      {/* ─── MIDDLE ROW: CHARTS MATRIX ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-7">
          <TrendChart data={data?.trendData} />
        </div>
        <div className="lg:col-span-3">
          <CategoryChart data={data?.categoryData} />
        </div>
      </div>
    </div>
  );
}
