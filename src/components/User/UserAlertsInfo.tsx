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

type UserAlertsInfoProps = {
  user_username: string;
};

export default function UserAlertsInfo({ user_username }: UserAlertsInfoProps) {
  const urlGetUserAlerts = `users/${user_username}/alerts`;
  const {
    data: userAlerts,
    isLoading: userAlertsLoading,
    error: userAlertsError,
  } = useQuery<AlertDto[]>(urlGetUserAlerts);

  //Ocorreu um erro
  if (userAlertsError) {
    return <NoData text="Error fetching data!!" />;
  }

  //A carregar os dados
  if (userAlertsLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={userAlerts} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
