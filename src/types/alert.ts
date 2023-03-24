import { MongoDBIdDto, MongoDBTimestampDto } from "./mongodb"

export type AlertDto = {
    _id: MongoDBIdDto;
    cleared: boolean | number;
    message: string;
    device_pid: string;
    sensor_pid: string;
    timestamp: MongoDBTimestampDto;
    type: string;
    value: number | string;
}