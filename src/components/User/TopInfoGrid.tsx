import React from "react";
import SimpleInfoCard from "../Card/SimpleInfoCard";
import {
  MdSensors,
} from "react-icons/md";
import { IoMdAlert, IoMdText } from "react-icons/io";
import { IoReader } from "react-icons/io5";
import { CountDocumentsDto } from "@/types/documents";
import { BiDevices } from "react-icons/bi";

type UserTopInfoGrid = {
  userCountDocuments: CountDocumentsDto;
};

export default function UserTopInfoGrid({
  userCountDocuments,
}: UserTopInfoGrid) {
  const { devices, readings, logs, sensors, alerts } = userCountDocuments;

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 mx-auto">
      <SimpleInfoCard title="Devices" text={devices} Icon={BiDevices} />
      <SimpleInfoCard title="Sensors" text={sensors} Icon={MdSensors} />
      <SimpleInfoCard title="Readings" text={readings} Icon={IoReader} />
      <SimpleInfoCard
        title="Alerts"
        text={alerts.total}
        description={`(${alerts.total_cleared} cleared)`}
        Icon={IoMdAlert}
      />
      <SimpleInfoCard title="Logs" text={logs} Icon={IoMdText} />
    </div>
  );
}
