"use client"

import DeviceMainInfo from "@/components/Device/DeviceMainInfo";
import DeviceTopInfoGrid from "@/components/Device/TopInfoGrid";
import { NoData } from "@/components/Error/NoData";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import { DeviceDto } from "@/types/device";
import { CountDocumentsDto } from "@/types/documents";
import { useQuery } from "@/utils/requests/getSwr";

export default function DevicePidPage({params}: any) {
  const device_pid = params.device_pid;

  const urlGetDeviceInfo = `devices/${device_pid}`;
  const {
    data: deviceInfo,
    isLoading: deviceInfoLoading,
    error: deviceInfoError,
    mutate: mutateDeviceInfo,
  } = useQuery<DeviceDto>(urlGetDeviceInfo);

  const urlGetDeviceCountDocuments = `devices/${device_pid}/count_documents`;
  const {
    data: deviceCountDocuments,
    isLoading: deviceCountDocumentsLoading,
    error: deviceCountDocumentsError,
    mutate: mutateDeviceCountDocuments,
  } = useQuery<CountDocumentsDto>(urlGetDeviceCountDocuments);

  //Ocorreu um erro
  if (deviceInfoError || deviceCountDocumentsError) {
    return <NoData text="Error fetching data!!"/>;
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
      <DeviceMainInfo device_pid={device_pid} deviceInfo={deviceInfo} mutateDeviceInfo={mutateDeviceInfo} mutateDeviceCountDocuments={mutateDeviceCountDocuments}/>
    </div>
  );
}