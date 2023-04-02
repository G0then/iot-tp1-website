"use client";

import React, { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import Table from "../Table/Table";
import { useRouter } from "next/navigation";
import { DeviceDto } from "@/types/device";
import StatusButton from "../Button/StatusButton";
import TableHeader from "../Table/TableHeader";
import ViewButton from "../Button/ViewButton";


type UserDeviceInfoProps = {
  user_username: string;
  userDevicesInfo: DeviceDto[];
};

export default function UserDeviceInfo({
  user_username,
  userDevicesInfo,
}: UserDeviceInfoProps) {
  const { push } = useRouter();
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "pid",
        headerName: "Device Pid",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
      },
      {
        field: "name",
        headerName: "Device Name",
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
            
            push(`/devices/${params.row.pid}`);
          };

          return <ViewButton onClick={onClick} />;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userDevicesInfo]
  );

  return (
    <div className="flex flex-col space-y-4 w-full">
      <TableHeader
        title="Device Sensors"
        description="Check info about all sensors related to this device"
        textAddButon="+ Add New Sensor"
        disableAddButton
        disableUpdateButton
      />
      <Table
        rows={userDevicesInfo}
        columns={columns}
        getRowId={(row) => row.pid}
      />
    </div>
  );
}
