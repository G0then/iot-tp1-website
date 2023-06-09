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
    field: "sensor_pid",
    headerName: "Sensor PID",
    flex: 1,
    headerAlign: "left",
  },
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

type DeviceLogsInfoProps = {
  device_pid: string;
};

export default function DeviceLogsInfo({ device_pid }: DeviceLogsInfoProps) {
  const urlGetDeviceLogs = `devices/${device_pid}/logs`;
  const {
    data: deviceLogs,
    isLoading: deviceLogsLoading,
    error: deviceLogsError,
  } = useQuery<LogDto[]>(urlGetDeviceLogs);

  //Ocorreu um erro
  if (deviceLogsError) {
    return <NoData text="Error fetching data!!" />;
  }

  //A carregar os dados
  if (deviceLogsLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={deviceLogs} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
