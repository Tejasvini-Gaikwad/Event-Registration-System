import { GET_ROLES ,URL_API, GET_ROLES_SUCCESS} from "../constants";
import axios from "axios";
import {call, takeEvery, put} from 'redux-saga/effects';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
}

function* getRolesApi(){
    const result = yield axios.get(`${URL_API}api/v1/roles`,
    {
        headers: headers
    }).
    then((res)=>{
        return {...res, success:true}
    }).catch((err)=>{
         return {...err,success:false};
    });
    return result
}
function* getRoles(){
    const data =  yield call(getRolesApi);
    yield put({type:GET_ROLES_SUCCESS, data})
}

function* createRoleApi(action){
    const result = yield axios.post(`${URL_API}api/v1/roles`,action.data,
    {
        headers: headers
    }).
    then((res)=>{
        return {...res, success:true}
    }).catch((err)=>{
         return {...err,success:false};
    });
    return result
}
function* createRole(action){
    const data =  yield call(createRoleApi,action);
    yield put({type:GET_ROLES_SUCCESS, data})
}

export default function* roleSaga(){
    yield takeEvery(GET_ROLES, getRoles)
    yield takeEvery(GET_ROLES, createRole)
}