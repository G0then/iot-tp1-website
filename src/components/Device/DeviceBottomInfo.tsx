"use client";

import { DeviceDto } from "@/types/device";
import { useRequest } from "@/utils/requests/useRequest";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "../Button/Button";
import RemoveForm from "../Form/RemoveForm";
import CustomModal from "../Modal/CustomModal";
import { showToastMessage } from "../Notification/Notification";

type DeviceBottomInfoProps = {
  device_pid: string;
};

export default function DeviceBottomInfo({
  device_pid,
}: DeviceBottomInfoProps) {
  const { push } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const {
    request: requestRemoveDevice,
    isLoadingRequest: isLoadingRemoveDevice,
    errorRequest: errorRemoveDevice,
  } = useRequest<undefined, DeviceDto>({
    method: "DELETE",
  });

  const handleRemoveButton = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // don't select this row after clicking
    try {
      await requestRemoveDevice(`/devices/${device_pid}`);
      handleClose();
      push(`/devices`);
      showToastMessage("Device removed with sucess"); //Notificação
    } catch (error) {
      console.log(error);
      showToastMessage("Error remove device!", "error"); //Notificação
    }
  };

  return (
    <>
      <div className="w-full text-right">
        <Button
          onClick={handleRemoveButton}
          aditionalClassName="bg-red-600 hover:bg-red-700"
        >
          Click To Delete Device
        </Button>
      </div>
      <CustomModal
        title="Delete Device"
        description="Are you sure that you want to delete the device?"
        open={open}
        handleClose={handleClose}
      >
        <RemoveForm handleSubmit={handleRemove} handleClose={handleClose} />
      </CustomModal>
    </>
  );
}
