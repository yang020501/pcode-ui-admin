import { AxiosResponse } from 'axios';

import { AuthenticationTokens, UserCredentials, UserProfile } from '@/types/auth.type';
import { TokenService } from '@/services/tokenService';
import protectedApi from './protectedApi';
import publicApi from './publicApi';
import { CreateAccountRequest, RegisterRequest } from '@/types/register.type';

const API_PREFIX = '/auth';

const authApi = {
	login: async (credential: UserCredentials) => {
		const result = await publicApi.post<AuthenticationTokens>(API_PREFIX + '/login', credential);
		TokenService.setToken(result.data.token);
		TokenService.setRefreshToken(result.data.refreshToken);
		return result;
	},
	refresh: async (authenticationTokens: AuthenticationTokens) => {
		const result: AxiosResponse<AuthenticationTokens> = await publicApi.post<AuthenticationTokens>(
			API_PREFIX + '/refresh',
			authenticationTokens
		);
		return result;
	},
	register: async (registerRequest: RegisterRequest) => {
		const result = await publicApi.post<RegisterRequest, any>(API_PREFIX + '/register', registerRequest);
		return result;
	},
	logout: () => {
		return TokenService.clearTokens();
	},
	getProfile: async () => {
		const result: AxiosResponse<UserProfile> = await protectedApi.get('/profile');
		return result;
	}
};

export default authApi;
