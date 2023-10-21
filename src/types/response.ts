export interface IAPIResponse {
	error: boolean;
	errorMessage?: string;
}

export type LoginResponse =
	| IAPIResponse
	| {
			token: string;
	  };

export interface IIsAuthenticatedResponse extends IAPIResponse {
	authenticated: boolean;
}
