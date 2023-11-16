import { Model, Document } from "mongoose";

// Generic types
export interface IUserObject {
	username: string;
	password: string;
}
export interface IUserDocument extends IUserObject {
	save(): Promise<IUserObject>;
	comparePassword(password: string): boolean;
}
export interface IGenericUserModel {
	getByUsername(username: string): Promise<IUserDocument>;
	new (object: IUserObject): IUserDocument;
}

// Mongoose concretions
export interface IUserMongooseDocument extends IUserObject, Document {
	comparePassword(password: string): boolean;
}
export interface IUserMongooseModel extends Model<IUserMongooseDocument> {
	getByUsername(username: string): Promise<IUserMongooseDocument>;
	save(): Promise<IUserMongooseDocument>;
}
