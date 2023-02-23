import { DELETE_USER, DELETE_USER_SUCCESS, GET_USERS,GET_USERS_SUCCESS,UPDATE_USER,UPDATE_USER_SUCCESS,URL_API } from "../constants";
import axios from 'axios';
import {call, takeEvery, put} from 'redux-saga/effects';
import { deleteApi, getApi, putApi } from "../Api/ApiHelper";

function* getUsersApi(){
    const result = yield getApi(`api/v1/users`).
    then((res)=>{
        return {...res, success:true}
    }).catch((err)=>{
         return {...err,success:false};
    });
    return result
}
function* getUsers(){
    const data =  yield call(getUsersApi);
    yield put({type:GET_USERS_SUCCESS, data})
}

function* deleteUserApi(action){
    const result = yield deleteApi(`api/v1/users/${action.data}`).
    then((res)=>{
        return {...res, success:true}
    }).catch((err)=>{
         return {...err,success:false};
    });
    return result
}
function* deleteUser(action){
    const data =  yield call(deleteUserApi,action);
    yield put({type:DELETE_USER_SUCCESS, data})
}

function* updateUserApi(action){
    
    const result = yield putApi(`api/v1/users/${action.data.id}`,action.data).
    then((res)=>{
        return {...res, success:true}
    }).catch((err)=>{
         return {...err,success:false};
    });
    return result
}

function* updateUser(action){
    const data = yield call(updateUserApi,action)
    yield put({type:UPDATE_USER_SUCCESS, data})
}

export default function* userSaga(){
    yield takeEvery(GET_USERS, getUsers)
    yield takeEvery(DELETE_USER, deleteUser)
    yield takeEvery(UPDATE_USER, updateUser)
}