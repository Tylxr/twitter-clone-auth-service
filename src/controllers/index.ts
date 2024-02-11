import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { registerUser, loginUser, isUserAuthenticated, refreshAuthToken } from "../services";
import { IUserMongooseModel, IUserMongooseDocument } from "../types/user";
import { AuthResponse, APIResponse, IAuthGuardResponse } from "../types/network";
import coreInstance from "../utils/coreInstance";

export async function register(req: Request, res: Response, next: NextFunction) {
	try {
		const userModel: IUserMongooseModel = mongoose.model<IUserMongooseDocument, IUserMongooseModel>("User");
		const { username, password } = req.body;
		const response: APIResponse = await registerUser(username, password, userModel, coreInstance);
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
		if ("token" in response && !response.error) {
			res.cookie("twitter_token", response.token, {
				expires: new Date(new Date().getTime() + 60 * 1000),
			});
			res.cookie("twitter_refresh_token", response.refreshToken, {
				expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
				httpOnly: true,
				secure: false, // TODO: Set to env variable of production environment
			});
			return res.status(200).send(response);
		}
		return res.status(400).send(response);
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
}

export function authenticated(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.headers.authorization && req.headers.authorization.split(" ")?.[1];
		const response: IAuthGuardResponse = isUserAuthenticated(token);
		return res.status("authenticated" in response && response.authenticated ? 200 : 401).send(response);
	} catch (err) {
		console.error(err);
		return res.status(500);
	}
}

export function refresh(req: Request, res: Response, next: NextFunction) {
	try {
		const { refreshToken } = req.body;
		const response: AuthResponse = refreshAuthToken(refreshToken);

		if ("token" in response && !response.error) {
			res.cookie("twitter_token", response.token, {
				expires: new Date(new Date().getTime() + 60 * 1000),
			});
			res.cookie("twitter_refresh_token", response.refreshToken, {
				expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
				httpOnly: true,
				secure: false, // TODO: Set to env variable of production environment
			});
			return res.status(200).send(response);
		}

		return res.status(400).send(response);
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
}
