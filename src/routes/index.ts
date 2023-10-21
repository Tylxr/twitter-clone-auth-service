import express, { NextFunction, Request, Response } from "express";
import { isAuthenticated, login, register } from "../controllers";

const router = express.Router();

// Routes - GET

// Routes - POST
router.post("/register", register);
router.post("/login", login);
router.post("/authenticated", isAuthenticated);

// Health check
router.get("/health", (req: Request, res: Response, next: NextFunction) => res.sendStatus(200));

export default router;
