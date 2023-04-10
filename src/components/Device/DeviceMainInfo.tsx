"use client";

import { DeviceDto } from "@/types/device";
import { CountDocumentsDto } from "@/types/documents";
import React, { useState } from "react";
import { KeyedMutator } from "swr";
import TabItem from "../Tabs/TabItem";
import DeviceAlertsInfo from "./DeviceAlertsInfo";
import DeviceChartInfo from "./DeviceChartInfo";
import DeviceLocationInfo from "./DeviceLocationInfo";
import DeviceLogsInfo from "./DeviceLogsInfo";
import DeviceReadingsInfo from "./DeviceReadingsInfo";
import DeviceSensorInfo from "./DeviceSensorInfo";
import DeviceUsersInfo from "./DeviceUsersInfo";

const sectionArray = [
  "Sensors",
  "Readings",
  "Alerts",
  "Logs",
  "Chart",
  "Users",
  "Location",
];

type DeviceMainInfoProps = {
  deviceInfo: DeviceDto;
  device_pid: string;
  mutateDeviceInfo: KeyedMutator<DeviceDto>;
  mutateDeviceCountDocuments: KeyedMutator<CountDocumentsDto>;
};

export default function DeviceMainInfo({
  deviceInfo,
  device_pid,
  mutateDeviceInfo,
  mutateDeviceCountDocuments,
}: DeviceMainInfoProps) {
  const [selectedSection, setSelectedSection] = useState(sectionArray[0]);

  return (
    <div className="flex w-full flex-col space-y-2">
      <div className="flex flex-wrap sm:space-x-16 justify-star sm:flex-row flex-col">
        {sectionArray.map((section) => (
          <TabItem
            key={section}
            text={section}
            selected={section === selectedSection}
            handleOnClick={() => setSelectedSection(section)}
          />
        ))}
      </div>

      <div className="flex max-h-[38rem] flex-col justify-center overflow-auto bg-white rounded-lg sm:shadow-md transition-shadow duration-200">
        <div className="flex h-auto flex-col justify-center overflow-auto m-5">
          {selectedSection === "Sensors" ? (
            <DeviceSensorInfo deviceInfo={deviceInfo} device_pid={device_pid} mutateDeviceInfo={mutateDeviceInfo} mutateDeviceCountDocuments={mutateDeviceCountDocuments}/>
          ) : selectedSection === "Readings" ? (
            <DeviceReadingsInfo device_pid={device_pid} />
          ) : selectedSection === "Alerts" ? (
            <DeviceAlertsInfo device_pid={device_pid} />
          ) : selectedSection === "Logs" ? (
            <DeviceLogsInfo device_pid={device_pid} />
          )  : selectedSection === "Chart" ? (
            <DeviceChartInfo deviceInfo={deviceInfo} />
          ) : selectedSection === "Users" ? (
            <DeviceUsersInfo device_pid={device_pid} />
          ) : selectedSection === "Location" ? (
            <DeviceLocationInfo deviceInfo={deviceInfo} />
          ) : (
            <div>To be implemented in future...</div>
          )}
        </div>
      </div>
    </div>
  );
}
