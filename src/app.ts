import express from "express";
import cookieParser from "cookie-parser";
import models from "./models";
import routes from "./routes";
import cors from "cors";

const corsOptions = {
	origin: ["http://localhost:3000", "http://localhost:4000"], // Client & Core
	credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Load models
models();

// Routes
app.use("/auth/v1", routes);

export default app;
