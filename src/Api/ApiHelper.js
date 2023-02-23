import axios from 'axios';
import {
    BASE_URL,
    DELETE_METHOD,
    GET_METHOD,
    POST_METHOD,
    PUT_METHOD,
    PATCH_METHOD
  } from '../constants';

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json; version=1'
  };

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: defaultHeaders
  });

  //GET METHOD

  export async function getApi(
        reqPath,
        payload
    ) {
        const response = await axiosInstance.request({
        url: reqPath,
        method: GET_METHOD,
        params: payload,
        headers: {
            ...defaultHeaders
        }
        });
        
        return response;
    }

  //POST Method
    export const postApi = async (reqPath, payload) => {
        const response = await axiosInstance.request({
        url: reqPath,
        method: POST_METHOD,
        data: payload,
        headers: {
            ...defaultHeaders
        }
        });
        return response;
    };

  //PUT Method
    export const putApi = async (reqPath, payload) => {
        const response = await axiosInstance.request({
        url: reqPath,
        method: PUT_METHOD,
        data: payload,
        headers: {
            ...defaultHeaders
        }
        });
        return response;
    };

//     //PATCH Method
export const patchApi = async (reqPath, payload) => {
    const response = await axiosInstance.request({
      url: reqPath,
      method: PATCH_METHOD,
      data: payload,
      headers: {
        ...defaultHeaders
      }
    });
    return response;
  };

//   //DELETE Method
    export const deleteApi = async (reqPath, payload) => {
        const response = await axiosInstance.request({
        url: reqPath,
        method: DELETE_METHOD,
        data: payload,
        headers: {
            ...defaultHeaders
        }
        });
        return response;
    };

    // adding the default query params required for all API's
    axiosInstance.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        config.headers = {
        ...config.headers,
        Authorization: token
        };
        return config;
    });

//     //interceptor for showing toast notifications on global level
    axiosInstance.interceptors.response.use(
    res => {
        // toast.success(res?.data?.msg);
        return res;
    },
    error => {
        if (error?.response?.status === 401) {
        localStorage.clear();
        }
        // toast.error(
        // `${error?.response?.data?.message}` || 'Oops, something went wrong!'
        // );
        return Promise.reject(error);
    }
    );