import ClientDashboardOverview from "@/components/dashboard/client/ClientDashboardOverview";
import { getClientDashboardState } from "@/lib/api/getClientDasboardState";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const ClientOverview = async () => {
  const client = await getUserSession();
  const statData = await getClientDashboardState(client?.email);
  return <ClientDashboardOverview statData={statData}/>;
};

export default ClientOverview;
