"use client";

import SimpleInfoCard from "@/components/Card/SimpleInfoCard";
import { NoData } from "@/components/Error/NoData";
import Filter from "@/components/Filter/Filter";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import { DeviceDto } from "@/types/device";
import { useDebounceQuery } from "@/utils/requests/getSwr";
import { useState } from "react";

export default function DevicesPage() {
  const [nameFilter, setNameFilter] = useState<string>("");
  const urlGetDevices = nameFilter ? `devices?filter=${nameFilter}` : `devices`;

  const {
    data: devices,
    isLoading: devicesLoading,
    error: devicesError,
  } = useDebounceQuery<DeviceDto[]>(urlGetDevices);

  if (devicesError) {
    return <NoData text="Error fetching data!" />;
  }

  if (devicesLoading) {
    return <LoadingData />;
  }

  return (
    <div className="flex flex-col space-y-10 justify-center items-center">
      <PageTitle
        title="Devices"
        description="All devices registered in system"
      />

      <div className="lg:w-2/3 w-full flex items-center justify-center">
        <Filter
          value={nameFilter}
          setValue={(e: string) => setNameFilter(e)}
          placeholder="Search for device name or pid"
          searchOptions={
            <p className="text-sm text-gray-500">
              {devices ? devices.length : "0"} items founded
            </p>
          }
        />
      </div>

      {!devices || devices.length === 0 ? 
      <p className="my-4 text-lg font-semibold text-center w-full">No devices!</p>
      : <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mx-auto">
        {devices.map((device) => (
          <SimpleInfoCard
            key={device._id.$oid}
            title={device.pid}
            text={device.name}
            href={`/devices/${device.pid}`}
            version={2}
            description={device.description}
          />
        ))}
      </div>}
    </div>
  );
}
