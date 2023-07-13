import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';


import { fetchUsers, fetchUsersError, fetchUsersSuccess, setUserStatus, setUserStatusSuccess } from '@/slices/user.slice';
import { SetUserStatusRequest, User } from '@/types/user.type';
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

        const request : AxiosResponse<Array<User>> = yield call(userApi.setUserStatus, action.payload);

        if (request.status === 200) {
            yield put(
                setSnackbar(
                    notificationMessage.UPDATE_SUCCESS('User','')
                )
            );
            yield put (
                setUserStatusSuccess(action.payload)
            )
        }

    } catch (error) {
        yield put(
            setSnackbar(
                notificationMessage.UPDATE_FAIL('User','Please try again!')
            )
        );
    }

}

export function* watchUser() {
    yield takeLatest(fetchUsers.type, fetchUsersSaga);
    yield takeLatest(setUserStatus.type, setUserStatusSaga)

}
