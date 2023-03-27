"use client";

import { CreateDeviceDto, DeviceDto } from "@/types/device";
import { CountDocumentsDto } from "@/types/documents";
import { useRequest } from "@/utils/requests/useRequest";
import {
  FormAddDeviceError,
  validateFormAddDevice,
} from "@/utils/validateForms/validateAddDevice";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { KeyedMutator } from "swr";
import Button from "../Button/Button";
import AddDeviceForm from "../Form/AddDeviceForm";
import RemoveForm from "../Form/RemoveForm";
import CustomModal from "../Modal/CustomModal";
import { showToastMessage } from "../Notification/Notification";

type DeviceBottomInfoProps = {
  deviceInfo: DeviceDto;
  mutateDeviceInfo: KeyedMutator<DeviceDto>;
  mutateDeviceCountDocuments: KeyedMutator<CountDocumentsDto>;
};

export default function DeviceBottomInfo({
  deviceInfo,
  mutateDeviceInfo,
  mutateDeviceCountDocuments,
}: DeviceBottomInfoProps) {
  const { push } = useRouter();
  const [openRemoveDeviceModal, setOpenRemoveDeviceModal] =
    useState<boolean>(false);
  const [openEditDeviceModal, setOpenEditDeviceModal] =
    useState<boolean>(false);
  const [errorForm, setErrorForm] = useState<FormAddDeviceError | undefined>(
    undefined
  );

  const defaultFormFields: CreateDeviceDto = useMemo(() => {
    return {
      pid: deviceInfo.pid,
      status: deviceInfo.status,
      description: deviceInfo.description,
      name: deviceInfo.name,
      location: deviceInfo.location,
      sensors: deviceInfo.sensors,
    };
  }, [deviceInfo]);

  const [formFields, setFormFields] = useState(defaultFormFields);

  const {
    request: requestRemoveDevice,
    isLoadingRequest: isLoadingRemoveDevice,
    errorRequest: errorRemoveDevice,
  } = useRequest<undefined, DeviceDto>({
    method: "DELETE",
  });
  const {
    request: requestEditDevice,
    isLoadingRequest: isLoadingEditDevice,
    errorRequest: errorEditDevice,
  } = useRequest<CreateDeviceDto, DeviceDto>({
    method: "PUT",
  });

  const handleRemoveButton = () => {
    setOpenRemoveDeviceModal(true);
  };

  const handleEditButton = () => {
    setOpenEditDeviceModal(true);
  };

  const handleCloseRemoveDeviceModal = () => {
    setOpenRemoveDeviceModal(false);
  };

  const handleCloseEditDeviceModal = () => {
    setOpenEditDeviceModal(false);
  };

  //Hook para alterar os dados do state. Mantém os dados passados e altera os novos enviados. O Partial permite receber nulls
  const handleChange = (newState: Partial<CreateDeviceDto>) => {
    setFormFields((currentState) => ({
      ...currentState,
      ...newState,
    }));
  };

  const handleRemoveDevice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // don't select this row after clicking
    try {
      await requestRemoveDevice(`/devices/${deviceInfo.pid}`);
      handleCloseRemoveDeviceModal();
      push(`/devices`);
      showToastMessage("Device removed with sucess"); //Notificação
    } catch (error) {
      console.log(error);
      showToastMessage("Error remove device!", "error"); //Notificação
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //Verifica se existe algum erro no formulario
      const errorObj = validateFormAddDevice(formFields);

      if (errorObj) {
        setErrorForm(errorObj); //Define que existem erros na criação do device
        showToastMessage("Form contains errors!", "warning"); //Notificação de erro no formulário
      } else {
        await requestEditDevice(`devices/${deviceInfo.pid}`, formFields);
        setErrorForm(undefined); //Define que não existem erros
        mutateDeviceInfo(); //Atualiza dados do device
        mutateDeviceCountDocuments(); //Atualiza dados do device
        handleCloseEditDeviceModal(); //Fecha o modal
        showToastMessage("Device edited!");
      }
    } catch (error) {
      console.log(error);
      showToastMessage("Error editing device!", "error"); //Mostra notificação do erro ao fazer
    }
  };

  return (
    <>
      <div className="text-right md:text-center w-auto md:w-full flex flex-col justify-end md:flex-row space-y-2 md:space-x-2 md:space-y-0">
        <Button
          onClick={handleEditButton}
          aditionalClassName="bg-orange-600 hover:bg-orange-700"
        >
          Edit Device
        </Button>
        <Button
          onClick={handleRemoveButton}
          aditionalClassName="bg-red-600 hover:bg-red-700"
        >
          Delete Device
        </Button>
      </div>
      <CustomModal
        title="Delete Device"
        description="Are you sure that you want to delete the device?"
        open={openRemoveDeviceModal}
        handleClose={handleCloseRemoveDeviceModal}
      >
        <RemoveForm
          handleSubmit={handleRemoveDevice}
          handleClose={handleCloseRemoveDeviceModal}
        />
      </CustomModal>

      <CustomModal
        title="Edit Device"
        description="Please fill all form correctly"
        open={openEditDeviceModal}
        handleClose={handleCloseEditDeviceModal}
      >
        <AddDeviceForm
          formFields={formFields}
          errorForm={errorForm}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleClose={handleCloseEditDeviceModal}
        />
      </CustomModal>
    </>
  );
}
