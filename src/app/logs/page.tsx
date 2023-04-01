"use client";

import AlertMainInfo from "@/components/Alert/AlertMainInfo";
import { NoData } from "@/components/Error/NoData";
import { LoadingData } from "@/components/Loading/LoadingData";
import LogMainInfo from "@/components/Log/LogMainInfo";
import PageTitle from "@/components/PageTitle/PageTitle";
import ReadingMainInfo from "@/components/Reading/ReadingMainInfo";
import { LogDto } from "@/types/log";
import { useQuery } from "@/utils/requests/getSwr";
import { useState } from "react";

export default function LogsPage() {
  const [nameFilter, setNameFilter] = useState<string>("");
  const urlGetLogs = `/logs?sort=-1`;

  const {
    data: logs,
    isLoading: logsLoading,
    error: logsError,
  } = useQuery<LogDto[]>(urlGetLogs);

  if (logsError) {
    return <NoData text="Error fetching data!" isAbsolute/>;
  }

  if (logsLoading) {
    return <LoadingData isAbsolute/>;
  }

  return (
    <div className="flex flex-col space-y-10 justify-center items-center">
      <PageTitle
        title="Alerts"
        description="All logs registered in system"
      />

      {logs && logs.length === 0 ? 
      <p className="my-4 text-lg font-semibold">No logs!</p>
      : <LogMainInfo logs={logs}/>}
    </div>
  );
}
