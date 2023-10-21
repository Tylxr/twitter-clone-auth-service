import app from "./src/app";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Configure dotenv
dotenv.config();

const port = process.env.PORT || "3000";
const server = http.createServer(app);

server.listen(port, async () => {
	console.log(`Auth Service listening on port ${port}.`);
	console.log(`Attempting to connect to mongo instance...`);

	try {
		const mongoDBConnectionString = `mongodb://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_host}:27017/${process.env.mongodb_db}?authSource=admin`;
		await mongoose.connect(mongoDBConnectionString);
		console.log("✅ Connected to MongoDB successfully via Mongoose.");
	} catch (err) {
		console.error("❌ Failed to connect to MongoDB via Mongoose.");
		console.error(err);
	}
});
server.on("error", (err) => console.error(err));
