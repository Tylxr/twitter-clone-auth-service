import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { registerUser, loginUser } from "../services";
import { IUserMongooseModel, IUserMongooseDocument } from "../types/user";
import { IAPIResponse } from "../types/response";

export async function register(req: Request, res: Response, next: NextFunction) {
	try {
		const userModel: IUserMongooseModel = mongoose.model<IUserMongooseDocument, IUserMongooseModel>("User");
		const { username, password } = req.body;
		const response: IAPIResponse = await registerUser(username, password, userModel);
		return res.send(response);
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
}
export async function login(req: Request, res: Response, next: NextFunction) {
	try {
		const userModel: IUserMongooseModel = mongoose.model<IUserMongooseDocument, IUserMongooseModel>("User");
		const { username, password } = req.body;
		const response = await loginUser(username, password, userModel);
		return res.send(response);
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
}
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	// call service
}
