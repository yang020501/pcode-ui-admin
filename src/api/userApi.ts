import { AxiosResponse } from 'axios';
import protectedApi from './protectedApi';
import { SetUserStatusRequest, User } from '@/types/user.type';

const userApi = {

    getUsers: async () => {
        const result: AxiosResponse<Array<User>> = await protectedApi.get('/admin/user');
        return result;
    },
    setUserStatus: async (request: SetUserStatusRequest) => {
        const result: AxiosResponse<Array<User>> = await protectedApi.patch(`/admin/user/${request.user.id}/${request.status}`);
        return result;
    }, 
    resetPassword: async (request: SetUserStatusRequest) => {
        const result: AxiosResponse<Array<User>> = await protectedApi.patch(`/admin/user/${request.user.id}/${request.status}`);
        return result;

    }
};

export default userApi;
