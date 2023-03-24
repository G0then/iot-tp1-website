import { MongoDBIdDto, MongoDBTimestampDto } from "./mongodb"

export type ReadingDto = {
    _id: MongoDBIdDto;
    device_pid: string;
    sensor_pid: string;
    timestamp: MongoDBTimestampDto;
    value: number | string;
}