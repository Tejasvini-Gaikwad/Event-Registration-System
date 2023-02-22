import { DELETE_USER_SUCCESS, GET_USERS_SUCCESS, UPDATE_USER_SUCCESS } from "../constants"

const initialState = {
    data:[],
    isLoading:true,
    isError : false,
    msg : '',
    delete_msg:'',
    errors : []
}

export const UsersReducer = (data=initialState, action) => {
    switch(action.type){
        case GET_USERS_SUCCESS :
            if(action.data.success && action.data.success ===true){
                const result = action.data.data
                return {...data, data:result, isLoading:false, isError:false, msg:''}
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message}
            }

        case DELETE_USER_SUCCESS :
            if(action.data.success){
                return {...data, isLoading:false, isError:false, msg:action.data.success,delete_msg:"Record deleted successfuly."}   
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message}
            }

        case UPDATE_USER_SUCCESS : 
            if(action.data.success){
                return {...data,data:action.data.data,isLogin:true,msg:"", isError:false, errors:[]}
            }else{
                return {...data, data:data,msg:action.data.response.data, isLogin:true, type:'', isError:true, errors:action.data.response.data.errors}
            }
        default :
             return data
    }

}