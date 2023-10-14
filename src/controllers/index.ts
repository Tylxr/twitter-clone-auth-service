import { Request, Response, NextFunction } from "express";

export function register(req: Request, res: Response, next: NextFunction) {
	// call service
	try {
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
