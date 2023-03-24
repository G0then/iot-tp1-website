"use client";

import { AlertDto } from "@/types/alert";
import { useQuery } from "@/utils/requests/getSwr";
import { GridColDef } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import React from "react";
import { NoData } from "../Error/NoData";
import { LoadingData } from "../Loading/LoadingData";
import Table from "../Table/Table";

const columns: GridColDef[] = [
  {
    field: "type",
    headerName: "Alert Type",
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
    field: "value",
    headerName: "Value",
    flex: 1,
    headerAlign: "left",
  },
  {
    field: "cleared",
    headerName: "State",
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

type SensorAlertsInfoProps = {
  sensor_pid: string;
  device_pid: string;
};

export default function SensorAlertsInfo({ sensor_pid, device_pid }: SensorAlertsInfoProps) {
  const urlGetSensorAlerts = `devices/${device_pid}/sensors/${sensor_pid}/alerts`;
  const {
    data: sensorAlerts,
    isLoading: sensorAlertsLoading,
    error: sensorAlertsError,
  } = useQuery<AlertDto[]>(urlGetSensorAlerts);

  //Ocorreu um erro
  if (sensorAlertsError) {
    return <NoData text="Error fetching data!!" />;
  }

  //A carregar os dados
  if (sensorAlertsLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={sensorAlerts} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
