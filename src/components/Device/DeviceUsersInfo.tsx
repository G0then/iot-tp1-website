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
    field: "username",
    headerName: "Username",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    headerAlign: "center",
  },
];

type DeviceUsersInfoProps = {
  device_pid: string;
};

export default function DeviceUsersInfo({ device_pid }: DeviceUsersInfoProps) {
  const urlGetDeviceUsers = `devices/${device_pid}/users`;
  const {
    data: deviceUsers,
    isLoading: deviceUsersLoading,
    error: deviceUsersError,
  } = useQuery<any>(urlGetDeviceUsers);

  //Ocorreu um erro
  if (deviceUsersError) {
    return <NoData text="Erro ao carregar os dados!" />;
  }

  //A carregar os dados
  if (deviceUsersLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={deviceUsers} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
