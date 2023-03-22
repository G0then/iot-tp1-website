import React from "react";
import { GoogleMapEmbed } from "../GoogleMapEmbed/GoogleMapEmbed";

type DeviceAlertsInfoProps = {
  deviceInfo: any;
};

export default function DeviceLocationInfo({ deviceInfo }: DeviceAlertsInfoProps) {
  const { location } = deviceInfo;
  return (
    <div className="min-h-full w-full flex flex-col space-y-4">
      <p className="text-lg font-md"><span className="font-medium">Location Name:</span> {location}</p>
      <GoogleMapEmbed
        latitude={37.03886560891789}
        longitude={-7.842739303863979}
        customHeight="350px"
      />
    </div>
  );
}
