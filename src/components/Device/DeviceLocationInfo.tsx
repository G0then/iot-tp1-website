import { DeviceDto } from "@/types/device";
import React from "react";
import { GoogleMapEmbed } from "../GoogleMapEmbed/GoogleMapEmbed";

type DeviceAlertsInfoProps = {
  deviceInfo: DeviceDto;
};

export default function DeviceLocationInfo({ deviceInfo }: DeviceAlertsInfoProps) {
  const { location } = deviceInfo;
  return (
    <div className="min-h-full w-full flex flex-col space-y-4">
      <p className="text-lg font-md"><span className="font-medium">Location Name:</span> {location.name}</p>
      {location.latitude !== undefined && location.longitude !== undefined && <GoogleMapEmbed
        latitude={location.latitude}
        longitude={location.longitude}
        customHeight="350px"
      />}
    </div>
  );
}
