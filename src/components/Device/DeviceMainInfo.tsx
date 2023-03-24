"use client";

import { DeviceDto } from "@/types/device";
import React, { useState } from "react";
import TabItem from "../Tabs/TabItem";
import DeviceAlertsInfo from "./DeviceAlertsInfo";
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
};

export default function DeviceMainInfo({
  deviceInfo,
  device_pid,
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

      <div className="flex max-h-[32rem] flex-col justify-center overflow-auto bg-white rounded-lg sm:shadow-md transition-shadow duration-200">
        <div className="flex h-auto flex-col justify-center overflow-auto m-5">
          {selectedSection === "Sensors" ? (
            <DeviceSensorInfo deviceInfo={deviceInfo} device_pid={device_pid}/>
          ) : selectedSection === "Readings" ? (
            <DeviceReadingsInfo device_pid={device_pid} />
          ) : selectedSection === "Alerts" ? (
            <DeviceAlertsInfo device_pid={device_pid} />
          ) : selectedSection === "Logs" ? (
            <DeviceLogsInfo device_pid={device_pid} />
          ) : selectedSection === "Users" ? (
            <DeviceUsersInfo device_pid={device_pid} />
          ) : selectedSection === "Location" ? (
            <DeviceLocationInfo deviceInfo={deviceInfo} />
          ) : (
            <div>Em Construção...</div>
          )}
        </div>
      </div>
    </div>
  );
}
