import { MongoDBIdDto, MongoDBTimestampDto } from "./mongodb"

export type LogDto = {
    _id: MongoDBIdDto;
    device_pid: string;
    message: string;
    sensor_pid?: string;
    timestamp: MongoDBTimestampDto;
}