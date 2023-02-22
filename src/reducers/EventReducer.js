import { CREATE_EVENT, CREATE_EVENT_SUCCESS, DELETE_EVENT_SUCCESS, DELETE_REGISTRATION_SUCCESS, GET_EVENTS,GET_EVENTS_SUCCESS, GET_USER_EVENTS_SUCCESS, REGISTERED_EVENTS_SUCCESS, REGISTER_EVENT_SUCCESS, SEARCH_BY_ENTRY_FEES_SUCCESS, SEARCH_BY_NAME, SEARCH_BY_NAME_SUCCESS, SEARCH_BY_VENUE_SUCCESS, UPDATE_EVENT_SUCCESS, UPDATE_TICKET_SUCCESS, USER_REGISTERED_EVENTS_SUCCESS, VIEW_EVENT_SUCCESS } from "../constants"

const initialState = {
    data:[],
    isLoading:true,
    isError : false,
    msg : '',
    errors:[],
    isError:false
}

export const EventReducer = (data=initialState, action) => {
    switch(action.type){
        case GET_EVENTS_SUCCESS :
        case GET_USER_EVENTS_SUCCESS :
            if(action.data.success && action.data.success ===true){
                const result = action.data.data
                return {...data, data:result, isLoading:false, isError:false, msg:''}
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message}
            }

        case VIEW_EVENT_SUCCESS:
            const result = [action.data.data]
            return {...data, data:result, isLoading:false, isError:false, msg:''}

        case CREATE_EVENT_SUCCESS : 
            if(action.data.success && action.data.success ===true){
                const result = action.data.data
                return {...data, data:result, isLoading:false, isError:false, msg:''}
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message}
            }
        
        case DELETE_EVENT_SUCCESS :
            if(action.data.success && action.data.success ===true){
                const result = action.data.data
                return {...data, data:result, isLoading:false, isError:false, msg:''}
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message}
            }

        case UPDATE_EVENT_SUCCESS : 
            if(action.data.success && action.data.success ===true){
                const result = action.data.data
                return {...data, data:result, isLoading:false, isError:false, msg:'', isError:false, errors:[]}
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message, isError:true, errors:action.data.response.data.errors}
            }

        case REGISTER_EVENT_SUCCESS : 
            if(action.data.success && action.data.success ===true){
                const result = action.data.data
                return {...data, data:result, isLoading:false, isError:false, msg:'Success', isError:false, errors:[]}
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message, isError:true, errors:action.data.response.data.message}
            }

        case REGISTERED_EVENTS_SUCCESS : 
            if(action.data.success && action.data.success ===true){
                const result = action.data.data
                return {...data, data:result, isLoading:false, isError:false, msg:'Success'}
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message}
            }

        case USER_REGISTERED_EVENTS_SUCCESS : 
            if(action.data.success && action.data.success ===true){
                const result = action.data.data
                return {...data, data:result, isLoading:false, isError:false, msg:'Success'}
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message}
            }

        case DELETE_REGISTRATION_SUCCESS :
            if(action.data.success && action.data.success ===true){
                const result = action.data.data
                return {...data, data:result, isLoading:false, isError:false, msg:''}
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message}
            }

        case UPDATE_TICKET_SUCCESS : 
            if(action.data.success && action.data.success ===true){
                const result = action.data.data
                return {...data, data:result, isLoading:false, isError:false, msg:''}
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message}
            }

        case SEARCH_BY_NAME_SUCCESS :
            if(action.data.success && action.data.success ===true){
                const result = action.data.data
                return {...data, data:result, isLoading:false, isError:false, msg:''}
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message}
            }

        case SEARCH_BY_VENUE_SUCCESS :
            if(action.data.success && action.data.success ===true){
                const result = action.data.data
                return {...data, data:result, isLoading:false, isError:false, msg:''}
            }else{
                const result = action.data
                return {...data, data:[], isLoading:true, isError : true, msg : result.message}
            }
        
        case SEARCH_BY_ENTRY_FEES_SUCCESS :
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