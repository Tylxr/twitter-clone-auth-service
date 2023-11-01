import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { registerUser, loginUser, isUserAuthenticated, refreshAuthToken } from "../services";
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

export function authenticated(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.headers.authorization && req.headers.authorization.split(" ")?.[1];
		if (!token) throw Error("No bearer token supplied.");
		const response = isUserAuthenticated(token);
		return response.authenticated ? res.sendStatus(200) : res.sendStatus(401);
	} catch (err) {
		console.error(err);
		return res.status(400).send({ message: err.message });
	}
}

export function refresh(req: Request, res: Response, next: NextFunction) {
	try {
		const { refreshToken } = req.body;
		const response = refreshAuthToken(refreshToken);
		return res.send(response);
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
}
