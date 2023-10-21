import { RegisterResult } from "../types/response";
import { IGenericUserModel } from "../types/user";
import jwt from "jsonwebtoken";

export async function registerUser(username: string, password: string, userModel: IGenericUserModel): Promise<RegisterResult> {
	// Basic validation
	if (!username || !password || username.length < 4 || password.length < 6) {
		return { error: true, errorMessage: "Username/password validation has failed." };
	}
	// Ensure user doesn't already exist - based off of username
	const existingUser = await userModel.getByUsername(username);
	if (existingUser) return { error: true, errorMessage: "User already exists." };

	// Create & save user, password should hash automatically on save
	const user = new userModel({ username, password });
	await user.save();

	// Sign JWT
	const token = jwt.sign(username, process.env.jwt_secret, { expiresIn: 60 * 5 });

	// Return successful and send jwt
	return { error: false, token };
}

export function login() {}
export function isAuthenticated() {}

function refresh() {}
