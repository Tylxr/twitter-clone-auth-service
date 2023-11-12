import { IAPIResponse, AuthGuardResponse, AuthResponse, INetworkRequestInstance } from "../types/network";
import { IGenericUserModel } from "../types/user";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function registerUser(
	username: string,
	password: string,
	userModel: IGenericUserModel,
	coreInstance: INetworkRequestInstance,
): Promise<IAPIResponse> {
	// Basic validation
	if (!username || !password || username.length < 4 || password.length < 6) {
		return { error: true, errorMessage: "Username/password validation has failed." };
	}
	try {
		// Ensure user doesn't already exist - based off of username
		const existingUser = await userModel.getByUsername(username);
		if (existingUser) return { error: true, errorMessage: "User already exists." };
	} catch (err) {
		console.error(err);
		return { error: true, errorMessage: "User already exists." };
	}

	try {
		// Create user profile in core service
		const coreCreateResponse = await coreInstance.post("/userProfile", { username });
		if (coreCreateResponse.status !== 201) throw new Error("Error requesting the /create Core API Service endpoint.");
	} catch (err) {
		console.error(err);
		return { error: true, errorMessage: "Failed to register user." };
	}

	try {
		// Create & save user, password should hash automatically on save
		const user = new userModel({ username, password });
		await user.save();
	} catch (err) {
		console.error(err);

		// Saving a user has failed, we need to delete the user profile account in the core service
		await coreInstance.delete("/userProfile", { data: { username } });
		//! Checking if the deletion was successful or having a cleanup CRON job for these requests that fail is
		//! out of the scope of this project but would be needed in production.

		return { error: true, errorMessage: "Error registering user." };
	}

	// Return successful
	return { error: false, message: "User registered successfully." };
}

export async function loginUser(username: string, password: string, userModel: IGenericUserModel): Promise<AuthResponse> {
	// Basic validation
	if (!username || !password || username.length < 4 || password.length < 6) {
		return { error: true, errorMessage: "Username/password validation has failed." };
	}

	try {
		// Ensure user doesn't already exist - based off of username
		const existingUser = await userModel.getByUsername(username);
		if (!existingUser) return { error: true, errorMessage: `Unable to find user with username '${username}'.` };

		// Check the password
		const correctPassword = existingUser.comparePassword(password);
		if (!correctPassword) {
			return { error: true, errorMessage: "Incorrect password." };
		}
	} catch (err) {
		console.error(err);
		return { error: true, errorMessage: "Error performing login checks against existing user." };
	}

	// Create tokens
	const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.JWT_REFRESH_SECRET) });
	const refreshToken = jwt.sign({ username }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

	// Return successful and send tokens
	return { error: false, token, refreshToken };
}
export function isUserAuthenticated(token: string): AuthGuardResponse {
	try {
		// Verify token
		const response = jwt.verify(token, process.env.JWT_SECRET);

		// Return successful
		return { authenticated: !!response, expired: false };
	} catch (err) {
		console.error(err);
		return { authenticated: false, expired: err.name === "TokenExpiredError" };
	}
}

export function refreshAuthToken(refreshToken: string): AuthResponse {
	try {
		// Verify token
		const response: JwtPayload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET) as JwtPayload;
		if (!!response) {
			// Create jwt payload
			const payload = { ...response };
			delete payload.exp;
			delete payload.iat;

			// Create tokens
			const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.JWT_REFRESH_SECRET) });
			const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

			// Return successful and send tokens
			return { error: false, token, refreshToken };
		}
	} catch (err) {
		console.error(err);
		return { error: true };
	}
}
