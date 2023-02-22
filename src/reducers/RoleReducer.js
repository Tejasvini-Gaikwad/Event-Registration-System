import {  GET_ROLES_SUCCESS } from "../constants"

const initialState = {
    data:[],
    isLoading:true,
    isError : false,
    msg : ''
}

export const RoleReducer = (data=initialState, action) => {
    switch(action.type){
        case GET_ROLES_SUCCESS :
            if(action.data.success && action.data.success ===true){
                const result = action.data.data
                return {...data, data:result, isLoading:false, isError:false, msg:''}
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message}
            }

        default :
             return data
    }

}