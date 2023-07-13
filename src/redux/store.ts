import { watchLogin } from '@/sagas/auth.sagas';
import { watchProfile } from '@/sagas/profile.sagas';
import { watchRegister } from '@/sagas/register.saga';
import { watchUser } from '@/sagas/user.sagas';
import authSlice from '@/slices/auth.slice';
import configSlice from '@/slices/config.slice';
import loadingSlice from '@/slices/loading.slice';
import profileSlice from '@/slices/profile.slice';
import registerSlice from '@/slices/register.slice';
import snackbarSlice from '@/slices/snackbar.slice';
import userSlice from '@/slices/user.slice';

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';



const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {

		auth: authSlice,
		profile: profileSlice,
		snackbar: snackbarSlice,
		loading: loadingSlice,
		config: configSlice,
		user: userSlice,
		register: registerSlice,
	},
	middleware: [sagaMiddleware]
});

sagaMiddleware.run(watchLogin);
sagaMiddleware.run(watchUser);
sagaMiddleware.run(watchProfile);
sagaMiddleware.run(watchRegister);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
