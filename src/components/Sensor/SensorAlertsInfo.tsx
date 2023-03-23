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
    field: "type",
    headerName: "Alert Type",
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
    field: "value",
    headerName: "Value",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "cleared",
    headerName: "State",
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
  } = useQuery<any>(urlGetSensorAlerts);

  //Ocorreu um erro
  if (sensorAlertsError) {
    return <NoData text="Erro ao carregar os dados!" />;
  }

  //A carregar os dados
  if (sensorAlertsLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={sensorAlerts} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
