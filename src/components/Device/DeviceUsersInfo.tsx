"use client";

import { UserDto } from "@/types/user";
import { useQuery } from "@/utils/requests/getSwr";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { NoData } from "../Error/NoData";
import { LoadingData } from "../Loading/LoadingData";
import Table from "../Table/Table";
import ViewButton from "../Button/ViewButton";

type DeviceUsersInfoProps = {
  device_pid: string;
};

export default function DeviceUsersInfo({ device_pid }: DeviceUsersInfoProps) {
  const { push } = useRouter();
  const urlGetDeviceUsers = `devices/${device_pid}/users`;
  const {
    data: deviceUsers,
    isLoading: deviceUsersLoading,
    error: deviceUsersError,
  } = useQuery<UserDto[]>(urlGetDeviceUsers);

  const columns: GridColDef[] = useMemo(() =>  [
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      headerAlign: "left",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "left",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "left",
    },
    {
      field: "view",
      headerName: "View",
      // minWidth: 350,
      flex: 1,
      // filterable: false,
      // resizable: true,
      headerAlign: "left",
      // align: 'center',
      renderCell: (params) => {
        const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation(); // don't select this row after clicking
  
          push(`/users/${params.row.username}`);
        };
  
        return <ViewButton onClick={onClick} />;
      },
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ],[]);

  //Ocorreu um erro
  if (deviceUsersError) {
    return <NoData text="Error fetching data!!" />;
  }

  //A carregar os dados
  if (deviceUsersLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={deviceUsers} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
