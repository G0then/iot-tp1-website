"use client"

import { NoData } from "@/components/Error/NoData";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import SensorMainInfo from "@/components/Sensor/SensorMainInfo";
import SensorTopInfoGrid from "@/components/Sensor/TopInfoGrid";
import { CountDocumentsDto } from "@/types/documents";
import { SensorDto } from "@/types/sensor";
import { useQuery } from "@/utils/requests/getSwr";

export default function SensorPidPage({ params }: any) {
  const sensor_pid = params.sensor_pid;
  const device_pid = params.device_pid;

  const urlGetSensorInfo = `/sensors/${sensor_pid}`;
  const {
    data: sensorInfo,
    isLoading: sensorInfoLoading,
    error: sensorInfoError,
  } = useQuery<SensorDto>(urlGetSensorInfo);

  const urlGetSensorCountDocuments = `devices/${device_pid}/sensors/${sensor_pid}/count_documents`;
  const {
    data: sensorCountDocuments,
    isLoading: sensorCountDocumentsLoading,
    error: sensorCountDocumentsError,
  } = useQuery<CountDocumentsDto>(urlGetSensorCountDocuments);

  //Ocorreu um erro
  if (sensorInfoError || sensorCountDocumentsError) {
    return <NoData text="Error fetching data!!" isAbsolute/>;
  }

  //A carregar os dados
  if (sensorInfoLoading || sensorCountDocumentsLoading) {
    return <LoadingData isAbsolute/>;
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
