import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';


import { fetchUsers, fetchUsersError, fetchUsersSuccess, resetUserPassord, resetUserPassordSuccess, setUserStatus, setUserStatusSuccess } from '@/slices/user.slice';
import { ResetUserPasswordResponse, SetUserStatusRequest, User, UserActionRequest } from '@/types/user.type';
import userApi from '@/api/userApi';
import { setSnackbar } from '@/slices/snackbar.slice';
import notificationMessage from '@/utils/notificationMessage';




function* fetchUsersSaga() {
    try {

        const users: AxiosResponse<Array<User>> = yield call(userApi.getUsers);

        if (users.data) {

            yield put(fetchUsersSuccess(users.data))
        }

    } catch (error) {
        yield put(fetchUsersError())
        yield put(
            setSnackbar(
                notificationMessage.ERROR('Fail to get all users. Please try again!')
            )
        );
    }

}


function* setUserStatusSaga(action: PayloadAction<SetUserStatusRequest>) {
    try {

        const response: AxiosResponse<Array<User>> = yield call(userApi.setUserStatus, action.payload);

        if (response.status === 200) {
            yield put(
                setSnackbar(
                    notificationMessage.UPDATE_SUCCESS('User', '')
                )
            );
            yield put(
                setUserStatusSuccess(action.payload)
            )
        }

    } catch (error) {
        yield put(
            setSnackbar(
                notificationMessage.UPDATE_FAIL('User', 'Please try again!')
            )
        );
    }

}

function* resetUserPasswordSaga(action: PayloadAction<UserActionRequest>) {
    try {

        const response: AxiosResponse<ResetUserPasswordResponse> = yield call(userApi.resetPassword, action.payload);

        if (response.status === 200) {
            yield put(
                setSnackbar(
                    notificationMessage.UPDATE_SUCCESS('User', 'Token has been generated!')
                )
            );
            yield put(
                resetUserPassordSuccess(response.data)
            )
        }

    } catch (error) {
        yield put(
            setSnackbar(
                notificationMessage.UPDATE_FAIL('User', 'Please try again!')
            )
        );
    }

}

export function* watchUser() {
    yield takeLatest(fetchUsers.type, fetchUsersSaga);
    yield takeLatest(setUserStatus.type, setUserStatusSaga)
    yield takeLatest(resetUserPassord.type, resetUserPasswordSaga)

}
