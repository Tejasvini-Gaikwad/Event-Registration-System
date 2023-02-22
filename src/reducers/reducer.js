import { CHECK_LOGIN_SUCCESS, GET_COUNT_SUCCESS, REGISTRATION_SUCCESS, SIGN_OUT, SIGN_OUT_SUCCESS } from "../constants";

const initialState = {
    data:[],
    email:'',
    isLogin:false,
    token:'',
    type:'',
    msg:'',
    errors:[],
    isError:false

}
export const LoginReducer = (data=initialState,action) => {
    switch(action.type){
        case CHECK_LOGIN_SUCCESS :
            if(action.data.status === 200){
                    const res = action.data.data.status.data
                    return {...data,email:res.email,isLogin:true,msg:"", isError:false, errors:[]}
            }else{
                return {...data, msg:action.data.response.data, isLogin:false, type:'', isError:true, errors:action.data.response.data.errors}
            }

        case GET_COUNT_SUCCESS : 
            if(action.data.success){
                return {...data,data:action.data.data,isLogin:true,msg:""}
            }else{
                return {...data, data:data,msg:action.data.response.data, isLogin:true, type:''}
            }
        
        case SIGN_OUT_SUCCESS : 
        if(action.data.success){
            return {...data,data:action.data.data,isLogin:true,msg:""}
        }else{
            return {...data, data:data,msg:action.data.response.data, isLogin:true, type:''}
        }

        case REGISTRATION_SUCCESS : 
        if(action.data.success){
            return {...data,data:action.data.data,isLogin:true,msg:"", isError:false, errors:[]}
        }else{
            return {...data, data:data,msg:action.data.response.data, isLogin:true, type:'', isError:true, errors:action.data.response.data.errors}
        }

        default :
             return data
    }
}