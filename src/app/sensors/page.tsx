"use client";

import SimpleInfoCard from "@/components/Card/SimpleInfoCard";
import { NoData } from "@/components/Error/NoData";
import Filter from "@/components/Filter/Filter";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import { DeviceDto } from "@/types/device";
import { useDebounceQuery, useQuery } from "@/utils/requests/getSwr";
import { useMemo, useState } from "react";

export default function SensorsPage() {
  const [nameFilter, setNameFilter] = useState<string>("");
  const urlGetSensors = nameFilter ? `sensors?filter=${nameFilter}` : `sensors`;
  const {
    data: sensors,
    isLoading: sensorsLoading,
    error: sensorsError,
  } = useDebounceQuery<DeviceDto[]>(urlGetSensors);

  const sensorsLength = useMemo(
    () =>
      sensors
        ? sensors.reduce(
            (accumulator, currentElement) =>
              accumulator + currentElement.sensors.length,
            0
          )
        : 0,
    [sensors]
  );

  if (sensorsError) {
    return <NoData text="Error fetching data!!" />;
  }

  if (sensorsLoading) {
    return <LoadingData />;
  }

  return (
    <div className="flex flex-col space-y-10 justify-center items-center">
      <PageTitle
        title="Sensors"
        description="All sensors registered in system"
      />

      <div className="lg:w-2/3 w-full flex items-center justify-center">
        <Filter
          value={nameFilter}
          setValue={(e: string) => setNameFilter(e)}
          placeholder="Search for sensor name or pid"
          searchOptions={
            <p className="text-sm text-gray-500">
              {sensorsLength} items founded
            </p>
          }
        />
      </div>

      {!sensors || sensors.length === 0 ? (
        <p className="my-4 text-lg font-semibold text-center w-full">
          No sensors!
        </p>
      ) : (
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mx-auto">
          {sensors.map((sensorDevice) =>
            sensorDevice.sensors.map((sensor) => {
              return (
                <SimpleInfoCard
                  key={sensor.pid}
                  title={sensor.pid}
                  text={sensor.name}
                  href={`/devices/${sensorDevice.pid}/sensors/${sensor.pid}`}
                  version={2}
                  description={sensor.description}
                  bottomText={sensorDevice.pid}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
