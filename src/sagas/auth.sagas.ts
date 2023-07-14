import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { login, loginSuccess, loginError, logout, fetchProfile, logoutSuccess } from '../slices/auth.slice';
import { PayloadAction } from '@reduxjs/toolkit';
import authApi from '../api/authApi';
import { UserCredentials } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import { UserProfile } from '../types/auth.type';
import { setLoading } from '@/slices/loading.slice';
import userApi from '@/api/userApi';

function* loginSaga(action: PayloadAction<UserCredentials>) {

	try {
		yield put(setLoading({ isLoading: true }))
		yield call(authApi.login, action.payload);
		yield call(userApi.getUsers)
		const profile: AxiosResponse<UserProfile> = yield call(authApi.getProfile);
		if (profile.data) {
			yield put(setLoading({ isLoading: false }))
			yield put(loginSuccess(profile.data));
		}
	

	} catch (error: any) {
		if (error instanceof AxiosError && error.response?.status === 401) {
			yield put(loginError('Invalid Credentials'));
			yield put(setLoading({ isLoading: false }))
		} else {
			yield put(loginError('Login failed'));
			yield put(setLoading({ isLoading: false }))
		}
	}
}

function* logoutSaga() {

	try {
		yield call(authApi.logout);
		yield put(logoutSuccess());
	} catch {
		yield put(logoutSuccess());
	}
}

function* fetchProfileSaga() {
	try {
		const profile: AxiosResponse<UserProfile> = yield call(authApi.getProfile);
		yield put(loginSuccess(profile.data));
	} catch (error: any) {

		yield put(logout());
	}
}

export function* watchLogin() {
	yield takeLatest(login.type, loginSaga);
	yield takeLatest(logout.type, logoutSaga);
	yield takeLatest(fetchProfile.type, fetchProfileSaga);
}
