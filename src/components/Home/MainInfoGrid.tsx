"use client";

import React from "react";
import AdvancedInfoCard from "../Card/AdvancedInfoCard";
import { MdOutlineRssFeed } from "react-icons/md";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { BsGraphUp } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import SimpleCardList from "../Card/SimpleCardList";
import { DateTime } from "luxon";
import { LogDto } from "@/types/log";
import { AlertDto } from "@/types/alert";
import { ReadingDto } from "@/types/reading";
import Link from "next/link";

type HomeMainInfoGridProps = {
  logs: LogDto[];
  readings: ReadingDto[];
  alerts: AlertDto[];
};

export default function HomeMainInfoGrid({
  logs,
  readings,
  alerts,
}: HomeMainInfoGridProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 w-full gap-6 md:gap-10">
      <div className="flex flex-col w-full col-span-1 xl:col-span-2 gap-6 md:gap-10">
        <AdvancedInfoCard title="Statistics" text="2" Icon={BsGraphUp}>
          To be implemented in future
        </AdvancedInfoCard>
        <AdvancedInfoCard
          title="Recent Activity"
          text="2"
          Icon={MdOutlineRssFeed}
        >
          <div className="flex flex-col space-y-4">
          {logs.map((log) => (
            <SimpleCardList
              key={log._id.$oid}
              title={log.sensor_pid ?? log.device_pid}
              text={log.message}
              date={DateTime.fromISO(log.timestamp.$date).toFormat("FF")}
              version={2}
            />
          ))}
          {logs.length >= 5 && <Link
              href="/logs"
              className="w-full text-center text-[color:var(--color-blackLight-main)] hover:text-black"
            >
              View More
            </Link>}
          </div>
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
            {readings.length >= 5 && <Link
              href="/readings"
              className="w-full text-center text-[color:var(--color-blackLight-main)] hover:text-black"
            >
              View More
            </Link>}
          </div>
        </AdvancedInfoCard>
        <AdvancedInfoCard title="Alerts" text="2" Icon={HiOutlineBellAlert}>
          <div className="flex flex-col space-y-4">
            {alerts.map((alert) => (
              <SimpleCardList
                key={alert._id.$oid}
                title={alert.sensor_pid}
                text={alert.message}
                date={DateTime.fromISO(alert.timestamp.$date).toFormat("FF")}
                version={2}
              />
            ))}
            {alerts.length >= 5 && <Link
              href="/alerts"
              className="w-full text-center text-[color:var(--color-blackLight-main)] hover:text-black"
            >
              View More
            </Link>}
          </div>
        </AdvancedInfoCard>
      </div>
    </div>
  );
}
