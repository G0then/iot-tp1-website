import React from "react";
import SimpleInfoCard from "../Card/SimpleInfoCard";
import {
  MdSensors,
  MdSignalWifiStatusbar4Bar,
  MdSignalWifiStatusbarConnectedNoInternet,
  MdSignalWifiStatusbarNotConnected,
} from "react-icons/md";
import { IoMdAlert, IoMdText } from "react-icons/io";
import { IoReader } from "react-icons/io5";

type DeviceTopInfoGrid = {
  deviceInfo: any;
  deviceCountDocuments: any;
};

export default function DeviceTopInfoGrid({
  deviceInfo,
  deviceCountDocuments,
}: DeviceTopInfoGrid) {
  const { status } = deviceInfo;
  const { readings, logs, sensors, alerts } = deviceCountDocuments;

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 mx-auto">
      <SimpleInfoCard title="Sensors" text={sensors} Icon={MdSensors} />
      <SimpleInfoCard
        title="Status"
        text={status}
        Icon={
          status === "online"
            ? MdSignalWifiStatusbar4Bar
            : status === "offline"
            ? MdSignalWifiStatusbarConnectedNoInternet
            : MdSignalWifiStatusbarNotConnected
        }
      />
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
