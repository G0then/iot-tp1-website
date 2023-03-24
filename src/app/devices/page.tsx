"use client";

import SimpleInfoCard from "@/components/Card/SimpleInfoCard";
import { NoData } from "@/components/Error/NoData";
import Filter from "@/components/Filter/Filter";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import { useQuery } from "@/utils/requests/getSwr";
import { useMemo, useState } from "react";

export default function DevicesPage() {
  const urlGetDevices = "devices";
  const {
    data: devices,
    isLoading: devicesLoading,
    error: devicesError,
  } = useQuery<any>(urlGetDevices);
  const [nameFilter, setNameFilter] = useState<string>("");

  //Filtra a lista de devices pelo valor introduzido na searchBox
  const deviceListFiltered = useMemo(
    () =>
      devices &&
      devices.filter((x) =>
        x.name.toLowerCase().includes(nameFilter.toLowerCase()) || x.pid.toLowerCase().includes(nameFilter.toLowerCase())
      ),
    [nameFilter, devices]
  );

  if (devicesError) {
    return <NoData text="Erro ao carregar os dados!" />;
  }

  if (devicesLoading) {
    return <LoadingData />;

  }

  if (devices && devices.length === 0) {
    return <NoData />;
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
              {deviceListFiltered.length} items founded
            </p>
          }
        />
      </div>

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mx-auto">
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
      </div>
    </div>
  );
}
