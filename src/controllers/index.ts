import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { registerUser, loginUser, isUserAuthenticated, refreshAuthToken } from "../services";
import { IUserMongooseModel, IUserMongooseDocument } from "../types/user";
import { AuthResponse, IAPIResponse } from "../types/network";
import coreInstance from "../utils/coreInstance";

export async function register(req: Request, res: Response, next: NextFunction) {
	try {
		const userModel: IUserMongooseModel = mongoose.model<IUserMongooseDocument, IUserMongooseModel>("User");
		const { username, password } = req.body;
		const response: IAPIResponse = await registerUser(username, password, userModel, coreInstance);
		return res.status(response.error ? 400 : 201).send(response);
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
}
export async function login(req: Request, res: Response, next: NextFunction) {
	try {
		const userModel: IUserMongooseModel = mongoose.model<IUserMongooseDocument, IUserMongooseModel>("User");
		const { username, password } = req.body;
		const response: AuthResponse = await loginUser(username, password, userModel);
		return res.status(response.error ? 400 : 200).send(response);
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
		return res.status(response.authenticated ? 200 : 401).send(response);
	} catch (err) {
		console.error(err);
		return res.status(500);
	}
}

export function refresh(req: Request, res: Response, next: NextFunction) {
	try {
		const { refreshToken } = req.body;
		const response: AuthResponse = refreshAuthToken(refreshToken);
		return res.status(response.error ? 401 : 200).send(response);
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
}
