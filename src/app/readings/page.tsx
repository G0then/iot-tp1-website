"use client";

import { NoData } from "@/components/Error/NoData";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import ReadingMainInfo from "@/components/Reading/ReadingMainInfo";
import { ReadingDto } from "@/types/reading";
import { useQuery } from "@/utils/requests/getSwr";
import { useState } from "react";

export default function ReadingsPage() {
  const [nameFilter, setNameFilter] = useState<string>("");
  const urlGetReadings = `/readings?sort=-1`;

  const {
    data: readings,
    isLoading: readingsLoading,
    error: readingsError,
  } = useQuery<ReadingDto[]>(urlGetReadings);

  if (readingsError) {
    return <NoData text="Error fetching data!!" />;
  }

  if (readingsLoading) {
    return <LoadingData />;
  }

  return (
    <div className="flex flex-col space-y-10 justify-center items-center">
      <PageTitle
        title="Readings"
        description="All readings registered in system"
      />

      {readings && readings.length === 0 ? 
      <p className="my-4 text-lg font-semibold">No readings!</p>
      : <ReadingMainInfo readings={readings}/>}
    </div>
  );
}
