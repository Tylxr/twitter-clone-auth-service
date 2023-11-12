export interface IAPIResponse {
	error: boolean;
	errorMessage?: string;
	message?: string;
}

export type AuthResponse =
	| IAPIResponse
	| {
			error: boolean;
			token: string;
			refreshToken: string;
	  };

export type AuthGuardResponse = {
	authenticated: boolean;
	expired: boolean;
};

export interface INetworkRequestInstance {
	get<C, R = INetworkResponse>(url: string, config?: C): Promise<R>;
	post<D, C, R = INetworkResponse>(url: string, data?: D, config?: C): Promise<R>;
	delete<C, R = INetworkResponse>(url: string, config?: C): Promise<R>;
}

export interface INetworkResponse {
	status: number;
}
