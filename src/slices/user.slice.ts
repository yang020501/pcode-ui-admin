import { SetUserStatusReuest, User, UserState } from '@/types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState: UserState = {
    users: null
};

const userSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        fetchUsers: (state) => {
            state.users = undefined
        },
        fetchUsersSuccess: (state, { payload }: PayloadAction<Array<User>>) => {
            state.users = payload

        },
        fetchUsersError: (state) => {
            state.users = null
        },
        setUserStatus: (state, { payload }: PayloadAction<SetUserStatusReuest>) => {

        },
        setUserStatusSuccess: (state, { payload }: PayloadAction<SetUserStatusReuest>) => {
            let index = state.users?.findIndex(item => item.id === payload.user.id)
            console.log(index, "hello")
            if (index !== -1 && index !== null && index !== undefined)
                state.users ? state.users[index].userStatus = payload.status : null
        },
        setUserStatusError: (state, { payload }: PayloadAction<SetUserStatusReuest>) => {

        },
        resetUserPassord: (state, { payload }: PayloadAction<Array<User>>) => {

        },
        resetUserPassordSuccess: (state, { payload }: PayloadAction<Array<User>>) => {

        },
        resetUserPassordError: (state, { payload }: PayloadAction<Array<User>>) => {

        },
    }
});

export const { fetchUsers, fetchUsersError, fetchUsersSuccess, setUserStatus, setUserStatusError, setUserStatusSuccess } = userSlice.actions;

export default userSlice.reducer;
