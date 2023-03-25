"use client";

import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import Table from "../Table/Table";
import { useRouter } from "next/navigation";
import { DeviceDto } from "@/types/device";
import StatusButton from "../Button/StatusButton";
import TableHeader from "../Table/TableHeader";
import CustomModal from "../Modal/CustomModal";
const columns: GridColDef[] = [
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
];

type DeviceSensorInfoProps = {
  deviceInfo: DeviceDto;
  device_pid: string;
};

export default function DeviceSensorInfo({
  deviceInfo,
  device_pid,
}: DeviceSensorInfoProps) {
  const { sensors } = deviceInfo;
  const { push } = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleAddButton = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <TableHeader
        title="Device Sensors"
        description="Check info about all sensors related to this device"
        textAddButon="+ Add New Sensor"
        onAddButtonClick={handleAddButton}
        disableUpdateButton
      />
      <Table
        rows={sensors}
        columns={columns}
        getRowId={(row) => row.pid}
        onRowClick={(rowData) =>
          push(`/devices/${device_pid}/sensors/${rowData.row.pid}`)
        }
      />
      <CustomModal title="Add New Device" description="Please fill all form correctly" open={open} handleClose={handleClose}>
        Teste
      </CustomModal>
    </div>
  );
}
