"use client";

import React, { useState } from "react";
import TabItem from "../Tabs/TabItem";
import DeviceAlertsInfo from "./DeviceAlertsInfo";
import DeviceLocationInfo from "./DeviceLocationInfo";
import DeviceLogsInfo from "./DeviceLogsInfo";
import DeviceReadingsInfo from "./DeviceReadingsInfo";
import DeviceSensorInfo from "./DeviceSensorInfo";

const sectionArray = [
  "Sensors",
  "Readings",
  "Alerts",
  "Logs",
  "Chart",
  "Location",
];

type DeviceMainInfoProps = {
  deviceInfo: any;
  pid: string;
};

export default function DeviceMainInfo({
  deviceInfo,
  pid,
}: DeviceMainInfoProps) {
  const [selectedSection, setSelectedSection] = useState(sectionArray[0]);

  return (
    <div className="flex w-full flex-col space-y-2">
      <div className="flex space-x-16 justify-start">
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
            <DeviceSensorInfo deviceInfo={deviceInfo} />
          ) : selectedSection === "Readings" ? (
            <DeviceReadingsInfo pid={pid} />
          ) : selectedSection === "Alerts" ? (
            <DeviceAlertsInfo pid={pid} />
          ) : selectedSection === "Logs" ? (
            <DeviceLogsInfo pid={pid} />
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
