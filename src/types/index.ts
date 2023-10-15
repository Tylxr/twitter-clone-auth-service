import { Document } from "mongoose";

export interface IUser {
	username: string;
	password: string;
}

export type IUserDocument = IUser & Document;
