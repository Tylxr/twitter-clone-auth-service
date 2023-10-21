import express, { NextFunction, Request, Response } from "express";
import { login, register } from "../controllers";

const router = express.Router();

// Routes - GET
router.get("/authenticated", (req: Request, res: Response, next: NextFunction) => res.sendStatus(200));

// Routes - POST
router.post("/register", register);
router.post("/login", login);

// Health check
router.get("/health", (req: Request, res: Response, next: NextFunction) => res.sendStatus(200));

export default router;
