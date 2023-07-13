import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { fetchAllConfigs, fetchContentTypes, fetchContentTypesError, fetchContentTypesSuccess, fetchJudgers, fetchJudgersError, fetchJudgersSuccess, fetchProgrammingLanguages, fetchProgrammingLanguagesSuccess } from '@/slices/config.slice';
import { AxiosResponse } from 'axios';

import configApi from '@/api/configApi';
import { Judger, ContentType, ProgrammingLanguage } from '@/types/config.type';


function* fetchAllConfigsSaga() {
    fetchJudgersSaga()
    fetchContentTypesSaga()
 
}
function* fetchJudgersSaga() {
    try {
        const judgers: AxiosResponse<Array<Judger>> = yield call(configApi.getJudgers);
        yield put(fetchJudgersSuccess(judgers.data))

    } catch {
        yield put(fetchJudgersError())
    }
}
function* fetchContentTypesSaga() {
    try {
        const contentTypes: AxiosResponse<Array<ContentType>> = yield call(configApi.getContentTypes);
        yield put(fetchContentTypesSuccess(contentTypes.data))

    } catch {
        yield put(fetchContentTypesError())
    }
}

export function* watchConfig() {
    yield takeLatest(fetchAllConfigs.type, fetchAllConfigsSaga);
    yield takeLatest(fetchJudgers.type, fetchJudgersSaga);
    yield takeLatest(fetchContentTypes.type, fetchContentTypesSaga);
  
}
