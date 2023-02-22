import { combineReducers } from "redux";
import { LoginReducer } from "./reducer";
import { EventReducer } from "./EventReducer";
import { UsersReducer } from "./UsersReducer";
import { RoleReducer } from "./RoleReducer";

export const rootReducer = combineReducers({
    LoginReducer,
    EventReducer,
    UsersReducer,
    RoleReducer
})