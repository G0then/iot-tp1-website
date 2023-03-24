"use client";

import SimpleInfoCard from "@/components/Card/SimpleInfoCard";
import { NoData } from "@/components/Error/NoData";
import Filter from "@/components/Filter/Filter";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import { DeviceDto } from "@/types/device";
import { useQuery } from "@/utils/requests/getSwr";
import { useMemo, useState } from "react";

export default function SensorsPage() {
  const urlGetSensors = "sensors";
  const {
    data: sensors,
    isLoading: sensorsLoading,
    error: sensorsError,
  } = useQuery<DeviceDto[]>(urlGetSensors);
  const [nameFilter, setNameFilter] = useState<string>("");

  //Filtra a lista de sensor pelo valor introduzido na searchBox
  const sensorListFiltered = useMemo(
    () =>
      sensors &&
      sensors.filter(
        (x) =>
          x.pid.toLowerCase().includes(nameFilter.toLowerCase()) ||
          x.sensors.some(
            (sensor) =>
              sensor.pid.toLowerCase().includes(nameFilter.toLowerCase()) ||
              sensor.name.toLowerCase().includes(nameFilter.toLowerCase())
          )
      ),
    [nameFilter, sensors]
  );

  console.log("lista filtrada", sensorListFiltered);

  if (sensorsError) {
    return <NoData text="Error fetching data!!" />;
  }

  if (sensorsLoading) {
    return <LoadingData />;
  }

  if (sensors && sensors.length === 0) {
    return <NoData />;
  }

  //Filtra a lista de sensors pelo valor introduzido na searchBox
  //   const sensorListFiltered = sensors.filter((x) =>
  //     x.name.toLowerCase().includes(nameFilter.toLowerCase())
  //   );

  console.log(sensors);

  return (
    <div className="flex flex-col space-y-10">
      <PageTitle
        title="Sensors"
        description="All sensors registered in system"
      />

      <div className="lg:w-2/3 w-full flex items-center justify-center">
        <Filter
          value={nameFilter}
          setValue={(e: string) => setNameFilter(e)}
          placeholder="Search for sensor name or device pid"
          searchOptions={
            <p className="text-sm text-gray-500">
              {sensorListFiltered.length} items founded
            </p>
          }
        />
      </div>

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mx-auto">
        {sensorListFiltered.map((sensorDevice) =>
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
    </div>
  );
}
