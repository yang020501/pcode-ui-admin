export interface CreateAccountRequest {
	username: string;
	password: string;
	email: string;
	fullName: string;
	repassword: string;
}

export interface RegisterRequest {
	username: string;
	password: string;
	email: string;
	fullName: string;
}

export interface CreateAccountState {
	loading: boolean;
	error?: string;
	success: boolean;
}
