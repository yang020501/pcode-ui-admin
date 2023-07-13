import { AxiosResponse } from 'axios';
import protectedApi from './protectedApi';
import { SetUserStatusReuest, User } from '@/types/user.type';

const userApi = {

    getUsers: async () => {
        const result: AxiosResponse<Array<User>> = await protectedApi.get('/admin/user');
        return result;
    },
    setUserStatus: async (request: SetUserStatusReuest) => {
        const result: AxiosResponse<Array<User>> = await protectedApi.patch(`/admin/user/${request.user.id}/${request.status}`);
        return result;

    }
};

export default userApi;
