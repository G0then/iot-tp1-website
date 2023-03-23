"use client";

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
    headerAlign: "center",
  },
  {
    field: "description",
    headerName: "Message",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "timestamp",
    headerName: "Date",
    flex: 1,
    headerAlign: "center",
    //Para mostrar o valor da propriedade de objetos nested
    valueGetter: (params) => {
      return DateTime.fromISO(params.row.timestamp.$date).toFormat("FF");
    },
  },
];

type DeviceAlertsInfoProps = {
  device_pid: string;
};

export default function DeviceAlertsInfo({ device_pid }: DeviceAlertsInfoProps) {
  const urlGetDeviceLogs = `devices/${device_pid}/logs`;
  const {
    data: deviceLogs,
    isLoading: deviceLogsLoading,
    error: deviceLogsError,
  } = useQuery<any>(urlGetDeviceLogs);

  //Ocorreu um erro
  if (deviceLogsError) {
    return <NoData text="Erro ao carregar os dados!" />;
  }

  //A carregar os dados
  if (deviceLogsLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={deviceLogs} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
