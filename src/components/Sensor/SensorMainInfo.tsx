"use client";

import React, { useState } from "react";
import TabItem from "../Tabs/TabItem";
import SensorAlertsInfo from "./SensorAlertsInfo";
import SensorDataStatisticsInfo from "./SensorDataStatisticsInfo";
import SensorLogsInfo from "./SensorLogsInfo";
import SensorReadingsInfo from "./SensorReadingsInfo";

const sectionArray = [
  "Readings",
  "Alerts",
  "Logs",
  "Chart",
  "Data Statistics",
];

type SensorMainInfoProps = {
  sensorInfo: any;
  sensor_pid: string;
  device_pid: string;
};

export default function SensorMainInfo({
  sensorInfo,
  sensor_pid,
  device_pid,
}: SensorMainInfoProps) {
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
          {selectedSection === "Readings" ? (
            <SensorReadingsInfo sensor_pid={sensor_pid} />
          ) : selectedSection === "Alerts" ? (
            <SensorAlertsInfo device_pid={device_pid} sensor_pid={sensor_pid} />
          ) : selectedSection === "Logs" ? (
            <SensorLogsInfo device_pid={device_pid} sensor_pid={sensor_pid} />
          ) : selectedSection === "Data Statistics" ? (
            <SensorDataStatisticsInfo device_pid={device_pid} sensor_pid={sensor_pid}/>
          ) : (
            <div>Em Construção...</div>
          )}
        </div>
      </div>
    </div>
  );
}
