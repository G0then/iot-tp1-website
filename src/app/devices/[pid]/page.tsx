"use client"

import DeviceMainInfo from "@/components/Device/DeviceMainInfo";
import DeviceTopInfoGrid from "@/components/Device/TopInfoGrid";
import { NoData } from "@/components/Error/NoData";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import { useQuery } from "@/utils/requests/getSwr";

export default function DevicesPage({params}) {
  const pid = params.pid;

  const urlGetDeviceInfo = `devices/${pid}`;
  const {
    data: deviceInfo,
    isLoading: deviceInfoLoading,
    error: deviceInfoError,
  } = useQuery<any>(urlGetDeviceInfo);

  const urlGetDeviceCountDocuments = `devices/${pid}/count_documents`;
  const {
    data: deviceCountDocuments,
    isLoading: deviceCountDocumentsLoading,
    error: deviceCountDocumentsError,
  } = useQuery<any>(urlGetDeviceCountDocuments);

  //Ocorreu um erro
  if (deviceInfoError || deviceCountDocumentsError) {
    return <NoData text="Erro ao carregar os dados!"/>;
  }

  //A carregar os dados
  if (deviceInfoLoading || deviceCountDocumentsLoading) {
    return <LoadingData/>;
  }

  const { name, description } = deviceInfo;

  return (
    <div className="flex flex-col space-y-10 justify-center items-center">
      <PageTitle
        title={name}
        description={description}
      />
      
      <DeviceTopInfoGrid deviceInfo={deviceInfo} deviceCountDocuments={deviceCountDocuments}/>
      <DeviceMainInfo pid={pid} deviceInfo={deviceInfo}/>
    </div>
  );
}
