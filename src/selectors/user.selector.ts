import { RootState } from '@/redux/store';

export const getUsers = (state: RootState) => state.user.users;
export const getToken = (state: RootState) => state.user.resetToken;