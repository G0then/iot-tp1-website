"use client";

import React from "react";
import AdvancedInfoCard from "../Card/AdvancedInfoCard";
import { MdOutlineRssFeed } from "react-icons/md";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { BsGraphUp } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useQuery } from "@/utils/requests/getSwr";
import SimpleCardList from "../Card/SimpleCardList";
import { DateTime } from "luxon";
import { NoData } from "../Error/NoData";
import { LoadingData } from "../Loading/LoadingData";
import { LogDto } from "@/types/log";
import { AlertDto } from "@/types/alert";
import { ReadingDto } from "@/types/reading";

export default function HomeMainInfoGrid() {
  const urlGetReadings = "readings?limit=5&sort=-1";
  const {
    data: readings,
    isLoading: readingsLoading,
    error: readingsError,
  } = useQuery<ReadingDto[]>(urlGetReadings);

  const urlGetAlerts = "alerts?limit=5&sort=-1";
  const {
    data: alerts,
    isLoading: alertsLoading,
    error: alertsError,
  } = useQuery<AlertDto[]>(urlGetAlerts);

  const urlGetLogs = "logs?limit=5&sort=-1";
  const {
    data: logs,
    isLoading: logsLoading,
    error: logsError,
  } = useQuery<LogDto[]>(urlGetLogs);

  if (readingsError || alertsError || logsError) {
    return <NoData text="Error fetching data!!"/>;
  }

  if (readingsLoading || alertsLoading || logsLoading) {
    return <LoadingData/>;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 w-full gap-6 md:gap-10">
      <div className="flex flex-col w-full col-span-1 xl:col-span-2 gap-6 md:gap-10">
        <AdvancedInfoCard title="Statistics" text="2" Icon={BsGraphUp}>
          Statistics
        </AdvancedInfoCard>
        <AdvancedInfoCard
          title="Recent Activity"
          text="2"
          Icon={MdOutlineRssFeed}
        >
          {logs.map((log) => (
            <SimpleCardList
              key={log._id.$oid}
              title={log.sensor_pid || log.device_pid}
              text={log.message}
              date={DateTime.fromISO(log.timestamp.$date).toFormat("FF")}
              version={2}
            />
          ))}
        </AdvancedInfoCard>
      </div>
      <div className="flex flex-col w-full gap-6 md:gap-10">
        <AdvancedInfoCard
          title="Recent Readings"
          text="2"
          Icon={AiOutlineUnorderedList}
        >
          <div className="flex flex-col space-y-4">
            {readings.map((reading) => (
              <SimpleCardList
                key={reading._id.$oid}
                title={reading.sensor_pid}
                text={(+reading.value).toFixed(2)}
                date={DateTime.fromISO(reading.timestamp.$date).toFormat("FF")}
              />
            ))}
          </div>
        </AdvancedInfoCard>
        <AdvancedInfoCard title="Alerts" text="2" Icon={HiOutlineBellAlert}>
          {alerts.map((alert) => (
            <SimpleCardList
              key={alert._id.$oid}
              title={alert.sensor_pid}
              text={alert.message}
              date={DateTime.fromISO(alert.timestamp.$date).toFormat("FF")}
              version={2}
            />
          ))}
        </AdvancedInfoCard>
      </div>
    </div>
  );
}
