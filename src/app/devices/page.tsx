"use client";

import SimpleInfoCard from "@/components/Card/SimpleInfoCard";
import { NoData } from "@/components/Error/NoData";
import Filter from "@/components/Filter/Filter";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import { DeviceDto } from "@/types/device";
import { useDebounceQuery, useQuery } from "@/utils/requests/getSwr";
import { useMemo, useState } from "react";

export default function DevicesPage() {
  const [nameFilter, setNameFilter] = useState<string>("");
  const urlGetDevices = nameFilter ? `devices?filter=${nameFilter}` : `devices`;

  const {
    data: devices,
    isLoading: devicesLoading,
    error: devicesError,
  } = useDebounceQuery<DeviceDto[]>(urlGetDevices);

  //Filtra a lista de devices pelo valor introduzido na searchBox
  const deviceListFiltered: DeviceDto[] | undefined = useMemo(
    () =>
      devices &&
      devices.filter(
        (x) =>
          x.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
          x.pid.toLowerCase().includes(nameFilter.toLowerCase())
      ),
    [nameFilter, devices]
  );

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
              {deviceListFiltered ? deviceListFiltered.length : "0"} items founded
            </p>
          }
        />
      </div>

      {!deviceListFiltered || deviceListFiltered.length === 0 ? 
      <p className="my-4 text-lg font-semibold">No devices!</p>
      : <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mx-auto">
        {deviceListFiltered.map((device) => (
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
