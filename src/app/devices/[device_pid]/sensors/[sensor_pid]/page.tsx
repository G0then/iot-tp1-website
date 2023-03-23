"use client"

import { NoData } from "@/components/Error/NoData";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import SensorMainInfo from "@/components/Sensor/SensorMainInfo";
import SensorTopInfoGrid from "@/components/Sensor/TopInfoGrid";
import { useQuery } from "@/utils/requests/getSwr";

export default function SensorPidPage({params}) {
  const sensor_pid = params.sensor_pid;
  const device_pid = params.device_pid;

  const urlGetSensorInfo = `/sensors/${sensor_pid}`;
  const {
    data: sensorInfo,
    isLoading: sensorInfoLoading,
    error: sensorInfoError,
  } = useQuery<any>(urlGetSensorInfo);

  const urlGetSensorCountDocuments = `devices/${device_pid}/sensors/${sensor_pid}/count_documents`;
  const {
    data: sensorCountDocuments,
    isLoading: sensorCountDocumentsLoading,
    error: sensorCountDocumentsError,
  } = useQuery<any>(urlGetSensorCountDocuments);

  //Ocorreu um erro
  if (sensorInfoError || sensorCountDocumentsError) {
    return <NoData text="Erro ao carregar os dados!"/>;
  }

  //A carregar os dados
  if (sensorInfoLoading || sensorCountDocumentsLoading) {
    return <LoadingData/>;
  }

  const { name, description } = sensorInfo;

  return (
    <div className="flex flex-col space-y-10 justify-center items-center">
      <PageTitle
        title={name}
        description={description}
      />
      
      <SensorTopInfoGrid sensorInfo={sensorInfo} sensorCountDocuments={sensorCountDocuments}/>
      <SensorMainInfo device_pid={device_pid} sensor_pid={sensor_pid} sensorInfo={sensorInfo}/>
    </div>
  );
}
