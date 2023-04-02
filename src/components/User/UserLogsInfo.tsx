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
    field: "device_pid",
    headerName: "Device PID",
    flex: 1,
    headerAlign: "left",
  },
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

type UserLogsInfoProps = {
  user_username: string;
};

export default function UserLogsInfo({ user_username }: UserLogsInfoProps) {
  const urlGetUserLogs = `users/${user_username}/logs`;
  const {
    data: userLogs,
    isLoading: userLogsLoading,
    error: userLogsError,
  } = useQuery<LogDto[]>(urlGetUserLogs);

  //Ocorreu um erro
  if (userLogsError) {
    return <NoData text="Error fetching data!!" />;
  }

  //A carregar os dados
  if (userLogsLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={userLogs} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
