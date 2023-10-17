import { IGenericUserModel } from "../types";
import jwt from "jsonwebtoken";

// 1 - Basic validation
export async function registerUser(username: string, password: string, userModel: IGenericUserModel) {
	if (!username || !password || username.length < 4 || password.length < 6) {
		return { error: true, errorMessage: "Username/password validation has failed." };
	}
	// 2 - Ensure user doesn't already exist - based off of username
	const existingUser = await userModel.getByUsername(username);
	if (existingUser) return { error: true, errorMessage: "User already exists." };

	// 3 - Create & save user, password should hash automatically on save
	const user = new userModel({ username, password });
	await user.save();

	// 4 - Sign JWT
	const token = jwt.sign(username, process.env.jwt_secret, { expiresIn: 1000 * 60 * 5 });

	// 5 - Return successful and send jwt
	return;
}

export function login() {}
export function isAuthenticated() {}

function refresh() {}
