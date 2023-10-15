export function register(username: string, password: string) {
	// 1 - Basic validation
	// 2 - Ensure user doesn't already exist - based off of username
	// 3 - Create & save user, password should hash automatically on save
	// 4 - Sign JWT
	// 5 - Return successful and send jwt
}

export function login() {}
export function isAuthenticated() {}

function refresh() {}
