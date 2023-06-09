"use client";

import React from "react";
import SimpleInfoCard from "../Card/SimpleInfoCard";
import { MdSensors } from "react-icons/md";
import { IoMdAlert, IoMdText } from "react-icons/io";
import { IoReader } from "react-icons/io5";
import { BiDevices } from "react-icons/bi";
import { SystemNumDocumentsDto } from "@/types/system";
import { useQuery } from "@/utils/requests/getSwr";
import { NoData } from "../Error/NoData";
import { LoadingData } from "../Loading/LoadingData";

type HomeTopInfoGridProps = {
  systemCounts: SystemNumDocumentsDto;
};

export default function HomeTopInfoGrid({ systemCounts }: HomeTopInfoGridProps) {
  const { devices, sensors, readings, logs, alerts } = systemCounts;
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 mx-auto">
      <SimpleInfoCard
        title="Devices"
        text={devices}
        Icon={BiDevices}
        href="/devices"
      />
      <SimpleInfoCard
        title="Sensors"
        text={sensors}
        Icon={MdSensors}
        href="/sensors"
      />
      <SimpleInfoCard
        title="Readings"
        text={readings}
        Icon={IoReader}
        href="/readings"
      />
      <SimpleInfoCard
        title="Alerts"
        text={alerts.total}
        description={`(${alerts.total_cleared} cleared)`}
        Icon={IoMdAlert}
        href="/alerts"
      />
      <SimpleInfoCard title="Logs" text={logs} Icon={IoMdText} href="/logs" />
    </div>
  );
}
