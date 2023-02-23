import { CREATE_EVENT, DELETE_EVENT, DELETE_EVENT_SUCCESS, DELETE_REGISTRATION, DELETE_REGISTRATION_SUCCESS, GET_EVENTS,GET_EVENTS_SUCCESS,GET_USER_EVENTS,GET_USER_EVENTS_SUCCESS,REGISTERED_EVENTS,REGISTERED_EVENTS_SUCCESS,REGISTER_EVENT,REGISTER_EVENT_SUCCESS,SEARCH_BY_ENTRY_FEES,SEARCH_BY_ENTRY_FEES_SUCCESS,SEARCH_BY_NAME,SEARCH_BY_NAME_SUCCESS,SEARCH_BY_VENUE,SEARCH_BY_VENUE_SUCCESS,UPDATE_EVENT,UPDATE_EVENT_SUCCESS,UPDATE_TICKET,UPDATE_TICKET_SUCCESS,URL_API, USER_REGISTERED_EVENTS, VIEW_EVENT, VIEW_EVENT_SUCCESS } from "../constants";
import axios from 'axios';
import {call, takeEvery, put} from 'redux-saga/effects';
import { deleteApi, getApi, postApi, putApi } from "../Api/ApiHelper";

  const user_id = JSON.parse(localStorage.getItem('user-info')).id

  function* getEventsApi(){
    const result = yield getApi(`api/v1/events`).
        then((res)=>{
            return {...res, success:true}
        }).catch((err)=>{
            return {...err,success:false};
        });
        return result
    }

    function* getEvents(){
        const data =  yield call(getEventsApi);
        yield put({type:GET_EVENTS_SUCCESS, data})
    }

    function* getUserEventsApi(action){
        const result = yield getApi(`api/v1/users/${action.data}/events`).
        then((res)=>{
            return {...res, success:true}
        }).catch((err)=>{
            return {...err,success:false};
        });
        return result
    }

    function* getUserEvents(action){
        const data =  yield call(getUserEventsApi,action);
        yield put({type:GET_USER_EVENTS_SUCCESS, data})
    }

    function* viewEventsApi(action){
        const result = yield getApi(`api/v1/events/${action.data}`).
        then((res)=>{
            return {...res, success:true}
        }).catch((err)=>{
            return {...err,success:false};
        });
        return result
    }
    function* viewEvents(action){
        const data =  yield call(viewEventsApi,action);
        yield put({type:VIEW_EVENT_SUCCESS, data})
    }

    function* createEventApi(action){
        const result = yield postApi(`api/v1/users/${user_id}/events`,action.data).
        then((res)=>{
            return {...res, success:true}
        }).catch((err)=>{
            return {...err,success:false};
        });
        return result
    }
    function* createEvent(action){
        const data =  yield call(createEventApi,action);
        yield put({type:VIEW_EVENT_SUCCESS, data})
    }

    function* deleteEventApi(action){
        const result = yield deleteApi(`api/v1/events/${action.data}`).
        then((res)=>{
            return {...res, success:true}
        }).catch((err)=>{
            return {...err,success:false};
        });
        return result
    }
    function* deleteEvent(action){
        const data =  yield call(deleteEventApi,action);
        yield put({type:DELETE_EVENT_SUCCESS, data})
    }

    function* updateEventApi(action){
        const result = yield putApi(`api/v1/events/${action.data.id}`,action.data).
        then((res)=>{
            return {...res, success:true}
        }).catch((err)=>{
            return {...err,success:false};
        });
        return result
    }
    function* updateEvent(action){
        const data =  yield call(updateEventApi,action);
        yield put({type:UPDATE_EVENT_SUCCESS, data})
    }

    function* registerEventApi(action){
        const result = yield postApi(`api/v1/user_events`,action.data).
        then((res)=>{
            return {...res, success:true}
        }).catch((err)=>{
            return {...err,success:false};
        });
        return result
    }
    function* registerEvent(action){
        const data =  yield call(registerEventApi,action);
        yield put({type:REGISTER_EVENT_SUCCESS, data})
    }

    function* getRegisteredEventsApi(){
        const result = yield getApi(`api/v1/user_events`).
        then((res)=>{
            return {...res, success:true}
        }).catch((err)=>{
            return {...err,success:false};
        });
        return result
    }
    function* getRegisteredEvents(){
        const data =  yield call(getRegisteredEventsApi);
        yield put({type:REGISTERED_EVENTS_SUCCESS, data})
    }

    function* getRegisteredEventsByUserApi(action){
        const result = yield getApi(`api/v1/user_events/get_registered_events?id=${action.data}`).
        then((res)=>{
            return {...res, success:true}
        }).catch((err)=>{
            return {...err,success:false};
        });
        return result
    }
    function* getRegisteredEventsByUser(action){
        const data =  yield call(getRegisteredEventsByUserApi,action);
        yield put({type:REGISTERED_EVENTS_SUCCESS, data})
    }

    function* deleteRegistrationApi(action){
        const result = yield deleteApi(`api/v1/user_events/${action.data}`).
        then((res)=>{
            return {...res, success:true}
        }).catch((err)=>{
            return {...err,success:false};
        });
        return result
    }
    function* deleteRegistration(action){
        const data =  yield call(deleteRegistrationApi,action);
        yield put({type:DELETE_REGISTRATION_SUCCESS, data})
    }

    function* updateTicketApi(action){
        const result = yield putApi(`api/v1/user_events/${action.data.user_event.id}`,action.data.user_event).
        then((res)=>{

            return {...res, success:true}
        }).catch((err)=>{
            return {...err,success:false};
        });
        return result
    }
    function* updateTicket(action){
        const data =  yield call(updateTicketApi,action);
        yield put({type:UPDATE_TICKET_SUCCESS, data})
    }

    function* searchByNameApi(action){
        const result = yield getApi(`api/v1/users/${action.data.id}/events/search_event?name=${action.data.name}`).
            then((res)=>{
                return {...res, success:true}
            }).catch((err)=>{
                return {...err,success:false};
            });
            return result
    }

    function* searchByName(action){
        const data =  yield call(searchByNameApi,action);
        yield put({type:SEARCH_BY_NAME_SUCCESS, data})
    }

    function* searchByVenueApi(action){
        const result = yield getApi(`api/v1/users/${action.data.id}/events/search_event?venue
        =${action.data.name}`).
            then((res)=>{
                return {...res, success:true}
            }).catch((err)=>{
                return {...err,success:false};
            });
            return result
    }

    function* searchByVenue(action){
        const data =  yield call(searchByVenueApi,action);
        yield put({type:SEARCH_BY_VENUE_SUCCESS, data})
    }

    function* searchByEntreeFeesApi(action){
        const result = yield getApi(`api/v1/users/${action.data.id}/events/search_event?entry_fees=${action.data.name}`).
            then((res)=>{
                return {...res, success:true}
            }).catch((err)=>{
                return {...err,success:false};
            });
            return result
    }

    function* searchByEntreeFees(action){
        const data =  yield call(searchByEntreeFeesApi,action);
        yield put({type:SEARCH_BY_ENTRY_FEES_SUCCESS, data})
    }

    export default function* eventSaga(){
        yield takeEvery(GET_EVENTS, getEvents)
        yield takeEvery(GET_USER_EVENTS, getUserEvents)
        yield takeEvery(VIEW_EVENT, viewEvents)
        yield takeEvery(CREATE_EVENT, createEvent)
        yield takeEvery(DELETE_EVENT, deleteEvent)
        yield takeEvery(UPDATE_EVENT, updateEvent)
        yield takeEvery(REGISTER_EVENT, registerEvent)
        yield takeEvery(REGISTERED_EVENTS, getRegisteredEvents)
        yield takeEvery(USER_REGISTERED_EVENTS, getRegisteredEventsByUser)
        yield takeEvery(DELETE_REGISTRATION, deleteRegistration)
        yield takeEvery(UPDATE_TICKET, updateTicket)
        yield takeEvery(SEARCH_BY_NAME, searchByName)
        yield takeEvery(SEARCH_BY_VENUE, searchByVenue)
        yield takeEvery(SEARCH_BY_ENTRY_FEES, searchByEntreeFees)
    }