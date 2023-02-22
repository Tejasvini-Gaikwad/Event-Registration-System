import {call, takeEvery, put} from 'redux-saga/effects';
import axios from 'axios'
import { CHECK_LOGIN,CHECK_LOGIN_FAILED, CHECK_LOGIN_SUCCESS, GET_COUNT, GET_COUNT_SUCCESS, LOGIN_FAILED ,REGISTRATION,REGISTRATION_SUCCESS,SIGN_OUT,SIGN_OUT_SUCCESS,URL_API} from "../constants";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
}

function* checkLoginApi(action){
    // const result = yield axios.get(`http://localhost:8000/users?username=${action.data.username}&password=${action.data.password}`,{headers: { 'Content-Type': 'application/json' }}).
    const result = yield axios.post(`${URL_API}users/sign_in`,action.data).
    then((res)=>{
        if(res.status){
            localStorage.setItem('user-info', JSON.stringify(res.data.status.data));
            localStorage.setItem('token', res.headers.authorization);
        }
        return {...res, success:true}
    }).catch((err)=>{
         return {...err,success:false};
    });
    return result
}

function* checkLoginAction(action){
    const data = yield call(checkLoginApi, action)
    yield put({type:CHECK_LOGIN_SUCCESS, data})
}

function* getCountApi(){
    const result = yield axios.get(`${URL_API}api/v1/users/count_data`,
    {
        headers : headers
    }).
    then((res)=>{
        return {...res, success:true}
    }).catch((err)=>{
         return {...err,success:false};
    });
    return result
}

function* getCount(){
    const data = yield call(getCountApi)
    yield put({type:GET_COUNT_SUCCESS, data})
}

function* signOutApi(){
    
    const result = yield axios.delete(`${URL_API}users/sign_out`,
    {
        headers : headers
    }).
    then((res)=>{
        return {...res, success:true}
    }).catch((err)=>{
         return {...err,success:false};
    });
    return result
}

function* signOut(){
    const data = yield call(signOutApi)
    yield put({type:SIGN_OUT_SUCCESS, data})
}

function* registrationApi(action){
    
    const result = yield axios.post(`${URL_API}users`,action.data,
    {
        headers : headers
    }).
    then((res)=>{
        return {...res, success:true}
    }).catch((err)=>{
         return {...err,success:false};
    });
    return result
}

function* registration(action){
    const data = yield call(registrationApi,action)
    yield put({type:REGISTRATION_SUCCESS, data})
}

export default function* loginSaga(){
    yield takeEvery(CHECK_LOGIN, checkLoginAction)
    yield takeEvery(GET_COUNT, getCount)
    yield takeEvery(SIGN_OUT, signOut)
    yield takeEvery(REGISTRATION, registration)
}