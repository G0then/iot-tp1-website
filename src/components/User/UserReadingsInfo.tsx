"use client";

import { ReadingDto } from "@/types/reading";
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
    field: "value",
    headerName: "Value",
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

type UserReadingsInfoProps = {
  user_username: string;
};

export default function UserReadingsInfo({ user_username }: UserReadingsInfoProps) {
  const urlGetUserReadings = `users/${user_username}/readings`;
  const {
    data: userReadings,
    isLoading: userReadingsLoading,
    error: userReadingsError,
  } = useQuery<ReadingDto[]>(urlGetUserReadings);

  //Ocorreu um erro
  if (userReadingsError) {
    return <NoData text="Error fetching data!!" />;
  }

  //A carregar os dados
  if (userReadingsLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={userReadings} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
