import { ResetUserPasswordResponse, SetUserStatusRequest, User, UserActionRequest, UserState } from '@/types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';




const initialState: UserState = {
    users: null,
    resetToken: null
};

const userSlice = createSlice({
    name: 'user',
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
        setUserStatus: (state, { payload }: PayloadAction<SetUserStatusRequest>) => {

        },
        setUserStatusSuccess: (state, { payload }: PayloadAction<SetUserStatusRequest>) => {

            let index = state.users?.findIndex(item => item.id === payload.user.id)

            if (index !== -1 && index !== null && index !== undefined)
                state.users ? state.users[index].userStatus = payload.status : null
        },
        setUserStatusError: (state, { payload }: PayloadAction<SetUserStatusRequest>) => {

        },
        resetUserPassord: (state, { payload }: PayloadAction<UserActionRequest>) => {
            state.resetToken = null
        },
        resetUserPassordSuccess: (state, { payload }: PayloadAction<ResetUserPasswordResponse>) => {

            state.resetToken = payload.token

        },
        resetUserPassordError: (state) => {
            state.resetToken = null
        },
    }
});

export const {
    fetchUsers, fetchUsersError, fetchUsersSuccess,
    setUserStatus, setUserStatusError, setUserStatusSuccess,
    resetUserPassord, resetUserPassordError, resetUserPassordSuccess
} = userSlice.actions;

export default userSlice.reducer;
