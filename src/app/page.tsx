"use client"

import HomeTopInfoGrid from "@/components/Home/TopInfoGrid";
import HomeMainInfoGrid from "@/components/Home/MainInfoGrid"
import { LoadingData } from "@/components/Loading/LoadingData";
import { NoData } from "@/components/Error/NoData";
import { useQuery } from "@/utils/requests/getSwr";
import { LogDto } from "@/types/log";
import { AlertDto } from "@/types/alert";
import { ReadingDto } from "@/types/reading";
import { SystemNumDocumentsDto } from "@/types/system";

export default function Home() {
  const urlGetSystemCount = "system/count_documents";
  const {
    data: systemCounts,
    isLoading: systemCountsLoading,
    error: systemCountsError,
  } = useQuery<SystemNumDocumentsDto>(urlGetSystemCount);

  const urlGetReadings = "readings?limit=5&sort=-1";
  const {
    data: readings,
    isLoading: readingsLoading,
    error: readingsError,
  } = useQuery<ReadingDto[]>(urlGetReadings);

  const urlGetAlerts = "alerts?limit=5&sort=-1";
  const {
    data: alerts,
    isLoading: alertsLoading,
    error: alertsError,
  } = useQuery<AlertDto[]>(urlGetAlerts);

  const urlGetLogs = "logs?limit=5&sort=-1";
  const {
    data: logs,
    isLoading: logsLoading,
    error: logsError,
  } = useQuery<LogDto[]>(urlGetLogs);

  //Ocorreu um erro
  if (readingsError || alertsError || logsError || systemCountsError) {
    return <NoData text="Error fetching data!!"/>;
  }

  //A carregar os dados
  if (readingsLoading || alertsLoading || logsLoading || systemCountsLoading) {
    return <LoadingData/>;
  }

  return (
    <main className="flex flex-col items-center justify-center space-y-10">
      <HomeTopInfoGrid systemCounts={systemCounts}/>
      <HomeMainInfoGrid alerts={alerts} logs={logs} readings={readings}/>
    </main>
  );
}
