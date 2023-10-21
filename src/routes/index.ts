import express, { NextFunction, Request, Response } from "express";
import { authenticationGuard, login, refresh, register } from "../controllers";

const router = express.Router();

// Routes - GET
router.get("/protected", authenticationGuard, (req, res, next) => {
	res.send({ successful: true });
});

// Routes - POST
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
// router.post("/authenticated", isAuthenticated);

// Health check
router.get("/health", (req: Request, res: Response, next: NextFunction) => res.sendStatus(200));

export default router;
