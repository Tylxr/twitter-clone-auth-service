import express from "express";
import cookieParser from "cookie-parser";
import routes from "./index";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/auth/v1", routes);

export default app;
