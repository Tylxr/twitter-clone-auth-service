import { Model, Document } from "mongoose";

// Generic types
export interface IUserObject {
	username: string;
	password: string;
}
export interface IUserDocument extends IUserObject {
	save(): Promise<IUserObject>;
}
export interface IGenericUserModel {
	getByUsername(username: string): IUserDocument;
	new (IUserObject): IUserDocument;
}

// Mongoose concretions
export type UserMongooseDocument = IUserObject & Document;
export interface IUserMongooseModel extends Model<UserMongooseDocument> {
	getByUsername(username: string): UserMongooseDocument;
	save(): Promise<UserMongooseDocument>;
}
