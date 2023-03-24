"use client";

import { LogDto } from "@/types/log";
import { useQuery } from "@/utils/requests/getSwr";
import { GridColDef } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import React from "react";
import { NoData } from "../Error/NoData";
import { LoadingData } from "../Loading/LoadingData";
import Table from "../Table/Table";

const columns: GridColDef[] = [
  {
    field: "message",
    headerName: "Message",
    flex: 1,
    headerAlign: "left",
  },
  {
    field: "timestamp",
    headerName: "Date",
    flex: 1,
    headerAlign: "left",
    //Para mostrar o valor da propriedade de objetos nested
    valueGetter: (params) => {
      return DateTime.fromISO(params.row.timestamp.$date).toFormat("FF");
    },
  },
];

type SensorLogsInfoProps = {
  sensor_pid: string;
  device_pid: string;
};

export default function SensorLogsInfo({ sensor_pid, device_pid }: SensorLogsInfoProps) {
  const urlGetSensorLogs = `devices/${device_pid}/sensors/${sensor_pid}/logs`;
  const {
    data: sensorLogs,
    isLoading: sensorLogsLoading,
    error: sensorLogsError,
  } = useQuery<LogDto[]>(urlGetSensorLogs);

  //Ocorreu um erro
  if (sensorLogsError) {
    return <NoData text="Error fetching data!!" />;
  }

  //A carregar os dados
  if (sensorLogsLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={sensorLogs} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
