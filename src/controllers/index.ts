import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { registerUser } from "../services";
import { IUserMongooseModel, UserMongooseDocument } from "../types/user";
import { RegisterResult } from "../types/response";

export async function register(req: Request, res: Response, next: NextFunction) {
	try {
		const userModel: IUserMongooseModel = mongoose.model<UserMongooseDocument, IUserMongooseModel>("User");
		const { username, password } = req.body;
		const response: RegisterResult = await registerUser(username, password, userModel);
		return res.send(response);
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
}
export function login(req: Request, res: Response, next: NextFunction) {
	// call service
}
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	// call service
}
