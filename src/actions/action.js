import { CHECK_LOGIN, GET_COUNT, REGISTRATION, SIGN_OUT, VIEW_EVENT } from "../constants"

export const checkLogin = (data) => {
    return {
        type : CHECK_LOGIN,
        data
    }
}

export const getCounts = () => {
    return {
        type : GET_COUNT,
    }
}

export const signOut = () => {
    return {
        type : SIGN_OUT,
    }
}

export const registerAction = (data) => {
    return {
        type : REGISTRATION,
        data
    }
}
