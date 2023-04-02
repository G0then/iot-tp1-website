"use client";

import React, { useMemo, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import Table from "../Table/Table";
import { useRouter } from "next/navigation";
import { DeviceDto } from "@/types/device";
import StatusButton from "../Button/StatusButton";
import TableHeader from "../Table/TableHeader";
import ViewButton from "../Button/ViewButton";
import DeleteButton from "../Button/DeleteButton";
import { useRequest } from "@/utils/requests/useRequest";
import { UserDto } from "@/types/user";
import { showToastMessage } from "../Notification/Notification";
import { KeyedMutator } from "swr";
import { CountDocumentsDto } from "@/types/documents";
import CustomModal from "../Modal/CustomModal";
import RemoveForm from "../Form/RemoveForm";


type UserDeviceInfoProps = {
  userInfo: UserDto;
  userDevicesInfo: DeviceDto[];
  mutateUserInfo: KeyedMutator<UserDto>;
  mutateUserDeviceCountDocuments: KeyedMutator<CountDocumentsDto>;
  mutateUserDevicesInfo: KeyedMutator<DeviceDto[]>;
};

export default function UserDeviceInfo({
  userInfo,
  userDevicesInfo,
  mutateUserInfo,
  mutateUserDeviceCountDocuments,
  mutateUserDevicesInfo,
}: UserDeviceInfoProps) {
  const { push } = useRouter();
  const [openRemoveSensorModal, setOpenRemoveSensorModal] = useState<string>("");
  const {
    request: requestRemoveUserDevice,
    isLoadingRequest: isLoadingRemoveUserDevice,
    errorRequest: errorRemoveUserDevice,
  } = useRequest<UserDto, UserDto>({
    method: "PUT",
  });

  const handleCloseRemoveSensorModal = () => {
    setOpenRemoveSensorModal("");
  };

  const handleRemove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // don't select this row after clicking
    try {
      let userEdited: UserDto = {...userInfo}; // make a separate copy of the array
      const index = userEdited.devices.indexOf(openRemoveSensorModal)
      if (index !== -1) {
        userEdited.devices.splice(index, 1);
      }

      // userEdited.devices
      await requestRemoveUserDevice(`/users/${userInfo.username}`, userEdited);
      mutateUserInfo(); //Atualiza informações do utilizador
      mutateUserDeviceCountDocuments(); //Atualiza dados da contagem dos documentos
      mutateUserDevicesInfo(); //Atualiza informações dos devices do utilizador
      handleCloseRemoveSensorModal();
      showToastMessage("Device removed with sucess"); //Notificação
    } catch (error) {
      console.log(error);
      showToastMessage("Error remove device!", "error"); //Notificação
    }
  };

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
      {
        field: "remove",
        headerName: "Remove",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
        renderCell: (params) => {
          return <DeleteButton onClick={() => setOpenRemoveSensorModal(params.row.pid)} />;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userDevicesInfo]
  );

  return (
    <div className="flex flex-col space-y-4 w-full">
      <TableHeader
        title="User Devices"
        description="Check info about all devices related to this user"
        textAddButon="+ Add New Device"
        disableAddButton
        disableUpdateButton
      />
      <Table
        rows={userDevicesInfo}
        columns={columns}
        getRowId={(row) => row.pid}
      />

        <CustomModal
          title="Remove Device"
          description="Are you sure that you want to remove the device?"
          open={openRemoveSensorModal ? true : false}
          handleClose={handleCloseRemoveSensorModal}
        >
          <RemoveForm
            handleSubmit={handleRemove}
            handleClose={handleCloseRemoveSensorModal}
          />
        </CustomModal>
    </div>
  );
}
