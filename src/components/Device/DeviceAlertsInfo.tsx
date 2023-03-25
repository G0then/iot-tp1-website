"use client";

import { AlertDto } from "@/types/alert";
import { useQuery } from "@/utils/requests/getSwr";
import { GridColDef } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import React from "react";
import AlertButton from "../Button/AlertButton";
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
    renderCell: AlertButton,
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

type DeviceAlertsInfoProps = {
  device_pid: string;
};

export default function DeviceAlertsInfo({ device_pid }: DeviceAlertsInfoProps) {
  const urlGetDeviceAlerts = `devices/${device_pid}/alerts`;
  const {
    data: deviceAlerts,
    isLoading: deviceAlertsLoading,
    error: deviceAlertsError,
  } = useQuery<AlertDto[]>(urlGetDeviceAlerts);

  //Ocorreu um erro
  if (deviceAlertsError) {
    return <NoData text="Error fetching data!!" />;
  }

  //A carregar os dados
  if (deviceAlertsLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={deviceAlerts} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
