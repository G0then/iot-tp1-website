"use client";

import React, { useMemo, useState } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
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
import AddUserDevicesForm from "../Form/User/AddUserDevices";


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
  const [userDevicesState, setUserDevicesState] = useState<GridRowId[]>(userInfo.devices);
  const [openRemoveDeviceModal, setOpenRemoveDeviceModal] = useState<string>("");
  const [openAddDeviceModal, setOpenAddDeviceModal] = useState<boolean>(false);
  const {
    request: resquestAddUserDevices,
    isLoadingRequest: isLoadingAddUserDevices,
    errorRequest: errorAddUserDevices,
  } = useRequest<any, UserDto>({
    method: "PUT",
  });
  const {
    request: requestRemoveUserDevice,
    isLoadingRequest: isLoadingRemoveUserDevice,
    errorRequest: errorRemoveUserDevice,
  } = useRequest<UserDto, UserDto>({
    method: "PUT",
  });

  const handleAddButton = () => {
    setOpenAddDeviceModal(true);
  };

  const handleCloseAddDeviceModal = () => {
    setOpenAddDeviceModal(false);
    setUserDevicesState(userInfo.devices)
  };

  const handleCloseRemoveDeviceModal = () => {
    setOpenRemoveDeviceModal("");
  };

  const handleRemove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // don't select this row after clicking
    try {
      let userEdited: UserDto = {...userInfo}; // make a separate copy of the array
      const index = userEdited.devices.indexOf(openRemoveDeviceModal)
      if (index !== -1) {
        userEdited.devices.splice(index, 1);
      }

      // userEdited.devices
      await requestRemoveUserDevice(`/users/${userInfo.username}`, userEdited);
      setUserDevicesState(userInfo.devices)
      mutateUserInfo(); //Atualiza informações do utilizador
      mutateUserDeviceCountDocuments(); //Atualiza dados da contagem dos documentos
      mutateUserDevicesInfo(); //Atualiza informações dos devices do utilizador
      handleCloseRemoveDeviceModal();
      showToastMessage("Device removed with sucess"); //Notificação
    } catch (error) {
      console.log(error);
      showToastMessage("Error remove device!", "error"); //Notificação
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //TODO Verificar se os dois arrays são iguais
      // if (userInfo.devices.equals(userDevicesState) === false) {
        await resquestAddUserDevices(
          `/users/${userInfo.username}`,
          {"devices": userDevicesState}
        );
        mutateUserInfo(); //Atualiza dados do device
        mutateUserDeviceCountDocuments(); //Atualiza dados do device
        mutateUserDevicesInfo(); //
        setOpenAddDeviceModal(false); //Fecha o modal
        showToastMessage("User devices edited!");
      // }
    } catch (error) {
      console.log(error);
      showToastMessage("Error editing user devices!", "error"); //Mostra notificação do erro
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
          return <DeleteButton onClick={() => setOpenRemoveDeviceModal(params.row.pid)} />;
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
        textAddButon="+ Edit User Devices"
        onAddButtonClick={handleAddButton}
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
          open={openRemoveDeviceModal ? true : false}
          handleClose={handleCloseRemoveDeviceModal}
        >
          <RemoveForm
            handleSubmit={handleRemove}
            handleClose={handleCloseRemoveDeviceModal}
          />
        </CustomModal>

        <CustomModal
          title="Edit Devices"
          description="Select the devices for this user"
          open={openAddDeviceModal}
          handleClose={handleCloseAddDeviceModal}
        >
          <AddUserDevicesForm
            handleSubmit={handleSubmit}
            activeDevices={userDevicesState}
            onSelectItem={(pids) => setUserDevicesState(pids)}
            handleClose={handleCloseAddDeviceModal}
          />
        </CustomModal>
    </div>
  );
}
