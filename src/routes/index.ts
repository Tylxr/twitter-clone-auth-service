import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

// Routes
router.get("/register", (req: Request, res: Response, next: NextFunction) => res.sendStatus(200));
router.get("/login", (req: Request, res: Response, next: NextFunction) => res.sendStatus(200));
router.get("/authenticated", (req: Request, res: Response, next: NextFunction) => res.sendStatus(200));

// Health check
router.get("/health", (req: Request, res: Response, next: NextFunction) => res.sendStatus(200));

export default router;
