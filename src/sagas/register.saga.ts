import { PayloadAction } from '@reduxjs/toolkit';
import authApi from '../api/authApi';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import {  RegisterRequest } from '../types/register.type';
import { registerFailed, registerSuccess, requestRegister, resetRegisterState } from '../slices/register.slice';
import { setLoading } from '@/slices/loading.slice';
import { setSnackbar } from '@/slices/snackbar.slice';
import notificationMessage from '@/utils/notificationMessage';
import { fetchUsers } from '@/slices/user.slice';

function* registerSaga(action: PayloadAction<RegisterRequest>) {

	try {
		yield put(setLoading({isLoading : true}))
		yield call(authApi.register, action.payload);
		yield put(fetchUsers());
		yield put(setLoading({isLoading : false}))
		yield put(setSnackbar(notificationMessage.CREATE_SUCCESS('account')))
		

	} catch (error: any) {
		yield put(setLoading({isLoading : false}))
		yield put(setSnackbar(notificationMessage.ERROR('Create account failed.')))
	}
}

export function* watchRegister() {
	
	yield takeLatest(requestRegister.type, registerSaga);
}
