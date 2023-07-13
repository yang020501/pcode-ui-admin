import { AxiosResponse } from 'axios';
import {  UserProfile } from '../types/auth.type';
import protectedApi from './protectedApi';
import { User } from '@/types/user.type';

const profileApi = {
	getProfile: async () => {
		const result: AxiosResponse<UserProfile> = await protectedApi.get('/profile');
		return result;
	},
	updateProfile: async (body: any) => {
		const result: any = await protectedApi.put('/profile', body);
		return result;
	},
	changePassword: async (body: any) => {
		const result: any = await protectedApi.put('/profile/password', body);
	},
	getAllUsers: async () => {
		const result: AxiosResponse<Array<User>> = await protectedApi.get('/admin/user');
		return result;
	},
};

export default profileApi;
