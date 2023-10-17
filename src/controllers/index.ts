import { Request, Response, NextFunction } from "express";
import { model } from "mongoose";
import { registerUser } from "../services";
import { IUserMongooseModel, UserMongooseDocument } from "../types";

export async function register(req: Request, res: Response, next: NextFunction) {
	try {
		const userModel: IUserMongooseModel = model<UserMongooseDocument, IUserMongooseModel>("Users");
		const { username, password } = req.body;
		const response = await registerUser(username, password, userModel);
		console.log(response);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}
export function login(req: Request, res: Response, next: NextFunction) {
	// call service
}
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	// call service
}
