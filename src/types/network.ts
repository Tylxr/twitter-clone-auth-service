import { JwtPayload } from "jsonwebtoken";

export type APIResponse = {
	error: boolean;
	errorMessage?: string;
	message?: string;
};

export type AuthResponse =
	| APIResponse
	| {
			error: false;
			token: string;
			refreshToken: string;
	  };

export type IAuthGuardResponse =
	| APIResponse
	| {
			error: boolean;
			authenticated: boolean;
			expired: boolean;
			tokenPayload?: JwtPayload;
	  };

export interface INetworkRequestInstance {
	get<C, R = INetworkResponse>(url: string, config?: C): Promise<R>;
	post<D, C, R = INetworkResponse>(url: string, data?: D, config?: C): Promise<R>;
	delete<C, R = INetworkResponse>(url: string, config?: C): Promise<R>;
}

export interface INetworkResponse {
	status: number;
}
