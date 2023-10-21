import { IAPIResponse } from "../types/response";
import { IGenericUserModel } from "../types/user";
import jwt from "jsonwebtoken";

export async function registerUser(username: string, password: string, userModel: IGenericUserModel): Promise<IAPIResponse> {
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

	// Return successful
	return { error: false };
}

export async function loginUser(username: string, password: string, userModel: IGenericUserModel) {
	// Basic validation
	if (!username || !password || username.length < 4 || password.length < 6) {
		return { error: true, errorMessage: "Username/password validation has failed." };
	}

	// Lookup the user
	// Ensure user doesn't already exist - based off of username
	const existingUser = await userModel.getByUsername(username);
	if (!existingUser) return { error: true, errorMessage: `Unable to find user with username '${username}'.` };

	// Check the password
	const correctPassword = existingUser.comparePassword(password);
	if (!correctPassword) {
		return { error: true, errorMessage: "Incorrect password." };
	}

	// Create token - 5 minute expiry
	const token = jwt.sign({ username }, process.env.jwt_secret, { expiresIn: 60 * 5 });

	// Return successful and send token
	return { error: false, token };
}
export function isUserAuthenticated() {}

function refreshToken() {}
