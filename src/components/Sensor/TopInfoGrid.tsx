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

type SensorTopInfoGrid = {
  sensorInfo: any;
  sensorCountDocuments: any;
};

export default function SensorTopInfoGrid({
  sensorInfo,
  sensorCountDocuments,
}: SensorTopInfoGrid) {
  const { status, unit, unit_name } = sensorInfo;
  const { readings, logs, alerts } = sensorCountDocuments;

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 mx-auto">
      <SimpleInfoCard
        title="Status"
        text={status}
        Icon={
          status === "active"
            ? MdSignalWifiStatusbar4Bar
            : status === "inactive"
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
      <SimpleInfoCard title="Unit" text={unit_name} description={`(${unit})`} Icon={IoMdText} />
    </div>
  );
}
