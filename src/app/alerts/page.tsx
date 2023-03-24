"use client";

import AlertMainInfo from "@/components/Alert/AlertMainInfo";
import { NoData } from "@/components/Error/NoData";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import ReadingMainInfo from "@/components/Reading/ReadingMainInfo";
import { AlertDto } from "@/types/alert";
import { useQuery } from "@/utils/requests/getSwr";
import { useState } from "react";

export default function AlertsPage() {
  const [nameFilter, setNameFilter] = useState<string>("");
  const urlGetAlerts = `/alerts?sort=-1`;

  const {
    data: alerts,
    isLoading: alertsLoading,
    error: alertsError,
  } = useQuery<AlertDto[]>(urlGetAlerts);

  if (alertsError) {
    return <NoData text="Error fetching data!!" />;
  }

  if (alertsLoading) {
    return <LoadingData />;
  }

  return (
    <div className="flex flex-col space-y-10 justify-center items-center">
      <PageTitle
        title="Alerts"
        description="All alerts registered in system"
      />

      {alerts && alerts.length === 0 ? 
      <p className="my-4 text-lg font-semibold">No alerts!</p>
      : <AlertMainInfo alerts={alerts}/>}
    </div>
  );
}
