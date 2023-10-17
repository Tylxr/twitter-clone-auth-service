import express, { NextFunction, Request, Response } from "express";
import { register } from "../controllers";

const router = express.Router();

// Routes
router.get("/register", register);
router.get("/login", (req: Request, res: Response, next: NextFunction) => res.sendStatus(200));
router.get("/authenticated", (req: Request, res: Response, next: NextFunction) => res.sendStatus(200));

// Health check
router.get("/health", (req: Request, res: Response, next: NextFunction) => res.sendStatus(200));

export default router;
