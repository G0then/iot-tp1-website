import { MongoDBIdDto } from "./mongodb";

export type UserDto = {
  _id: MongoDBIdDto;
  devices: string[];
  email: string;
  name: string;
  username: string;
};
