"use client";

import { DeviceDto } from "@/types/device";
import { CountDocumentsDto } from "@/types/documents";
import React, { useState } from "react";
import { KeyedMutator } from "swr";
import TabItem from "../Tabs/TabItem";
import { UserDto } from "@/types/user";
import UserSensorInfo from "./UserSensorInfo";
import UserReadingsInfo from "./UserReadingsInfo";
import UserAlertsInfo from "./UserAlertsInfo";
import UserLogsInfo from "./UserLogsInfo";
import UserDeviceInfo from "./UserDeviceInfo";

const sectionArray = [
  "Devices",
  "Sensors",
  "Readings",
  "Alerts",
  "Logs",
];

type UserMainInfoProps = {
  user_username: string;
  userDevicesInfo: DeviceDto[];
  userInfo: UserDto;
  mutateUserInfo: KeyedMutator<UserDto>;
  mutateUserDeviceCountDocuments: KeyedMutator<CountDocumentsDto>;
  mutateUserDevicesInfo: KeyedMutator<DeviceDto[]>;
};

export default function UserMainInfo({
  user_username,
  userInfo,
  userDevicesInfo,
  mutateUserInfo,
  mutateUserDeviceCountDocuments,
  mutateUserDevicesInfo,
}: UserMainInfoProps) {
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
          {selectedSection === "Devices" ? (
            <UserDeviceInfo  userInfo={userInfo} userDevicesInfo={userDevicesInfo} mutateUserInfo={mutateUserInfo} mutateUserDeviceCountDocuments={mutateUserDeviceCountDocuments} mutateUserDevicesInfo={mutateUserDevicesInfo}/>
          ) :selectedSection === "Sensors" ? (
            <UserSensorInfo  user_username={user_username} userDevicesInfo={userDevicesInfo}/>
          ) : selectedSection === "Readings" ? (
            <UserReadingsInfo user_username={user_username} />
          ) : selectedSection === "Alerts" ? (
            <UserAlertsInfo user_username={user_username} />
          ) : selectedSection === "Logs" ? (
            <UserLogsInfo user_username={user_username} />
          ) : (
            <div>Em Construção...</div>
          )}
        </div>
      </div>
    </div>
  );
}
