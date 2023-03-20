"use client";

import SimpleInfoCard from "@/components/Card/SimpleInfoCard";
import { NoData } from "@/components/Error/NoData";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import { useQuery } from "@/utils/requests/getSwr";
import { useState } from "react";

export default function SensorsPage() {
  const urlGetSensors = "sensors";
  const {
    data: sensors,
    isLoading: sensorsLoading,
    error: sensorsError,
  } = useQuery<any>(urlGetSensors);
  const [nameFilter, setNameFilter] = useState<string>("");

  if (sensorsError) {
    return <NoData text="Erro ao carregar os dados!" />;
  }

  if (sensorsLoading) {
    return <LoadingData />;
  }

  if (sensors && sensors.length === 0) {
    return <NoData />;
  }

  //Filtra a lista de sensors pelo valor introduzido na searchBox
  //   const sensorListFiltered = sensors.filter((x) =>
  //     x.sensor_name.toLowerCase().includes(nameFilter.toLowerCase())
  //   );

  console.log(sensors);

  return (
    <div className="flex flex-col space-y-10">
      <PageTitle
        title="Sensors"
        description="All sensors registered in system"
      />

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mx-auto">
        {sensors.map((sensorDevice) =>
          sensorDevice.sensors.map((sensor) => {
            return (
              <SimpleInfoCard
                key={sensor.pid}
                title={sensor.pid}
                text={sensor.sensor_name}
                href={`/sensors/${sensor.pid}`}
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
