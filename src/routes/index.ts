import express, { NextFunction, Request, Response } from "express";
import { authenticated, login, refresh, register } from "../controllers";

const router = express.Router();

// Routes - POST
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/authenticated", authenticated);

// Health check
router.get("/health", (req: Request, res: Response, next: NextFunction) => res.sendStatus(200));

export default router;
