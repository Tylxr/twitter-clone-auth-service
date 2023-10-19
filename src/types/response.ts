export interface IErrorResult {
	error: boolean;
	errorMessage?: string;
}

export type RegisterResult =
	| IErrorResult
	| {
			error: boolean;
			token: string;
	  };
