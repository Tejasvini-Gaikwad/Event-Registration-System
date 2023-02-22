import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import createSagaMiddleware from "@redux-saga/core";
import loginSaga from "./sagas/loginSaga";
import eventSaga from "./sagas/eventSaga";
import userSaga from "./sagas/userSaga";
import roleSaga from "./sagas/roleSaga";

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
    reducer:rootReducer,
    middleware:()=>[sagaMiddleware]
})

sagaMiddleware.run(loginSaga)
sagaMiddleware.run(eventSaga)
sagaMiddleware.run(userSaga)
sagaMiddleware.run(roleSaga)