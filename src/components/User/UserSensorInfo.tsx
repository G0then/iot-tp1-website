"use client";

import React, { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import Table from "../Table/Table";
import { useRouter } from "next/navigation";
import { DeviceDto } from "@/types/device";
import StatusButton from "../Button/StatusButton";
import TableHeader from "../Table/TableHeader";
import { SensorDto } from "@/types/sensor";
import ViewButton from "../Button/ViewButton";
import { NoData } from "../Error/NoData";
import { LoadingData } from "../Loading/LoadingData";
import { useQuery } from "@/utils/requests/getSwr";


type UserSensorInfoProps = {
  user_username: string;
  userDevicesInfo: DeviceDto[];
};

export default function UserSensorInfo({
  user_username,
  userDevicesInfo,
}: UserSensorInfoProps) {
  const { push } = useRouter();
  const urlGetUserSensors = `users/${user_username}/sensors`;
  const {
    data: userSensors,
    isLoading: userSensorsLoading,
    error: userSensorsError,
  } = useQuery<SensorDto[]>(urlGetUserSensors);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "pid",
        headerName: "Sensor Pid",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
      },
      {
        field: "name",
        headerName: "Sensor Name",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
      },
      {
        field: "description",
        headerName: "Description",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
      },
      {
        field: "unit_name",
        headerName: "Unit",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
        valueGetter: (params) => {
          return `${params.row.unit_name} (${params.row.unit})`;
        },
      },
      {
        field: "status",
        headerName: "State",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
        renderCell: StatusButton,
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

            const device = userDevicesInfo && userDevicesInfo.find((device) => {
              return device.sensors.some(sensor => sensor.pid === params.row.pid);
            });

            device && push(`/devices/${device.pid}/sensors/${params.row.pid}`);
          };

          return <ViewButton onClick={onClick} />;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userDevicesInfo]
  );

  //Ocorreu um erro
  if (userSensorsError) {
    return <NoData text="Error fetching data!!" />;
  }

  //A carregar os dados
  if (userSensorsLoading) {
    return <LoadingData />;
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Table
        rows={userSensors}
        columns={columns}
        getRowId={(row) => row.pid}
      />
    </div>
  );
}
