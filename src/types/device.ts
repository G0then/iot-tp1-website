import { LocationDto } from "./location";
import { MongoDBIdDto } from "./mongodb";
import { SensorDto } from "./sensor";

export type DeviceDto = {
    _id: MongoDBIdDto;
    pid: string;
    description: string;
    location: LocationDto;
    name: string;
    sensors: SensorDto[];
    status: string;
}

export type CreateDeviceDto = {
    pid: string;
    description: string;
    location: LocationDto;
    name: string;
    sensors: SensorDto[];
    status: string;
}