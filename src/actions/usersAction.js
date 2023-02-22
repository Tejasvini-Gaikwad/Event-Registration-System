import { DELETE_USER, GET_USERS, UPDATE_USER } from "../constants"

export const usersAction = () => {
    return ({
        type : GET_USERS
    }
    )
}

export const deleteAction = (data) => {
    return ({
        type : DELETE_USER,
        data
    }
    )
}

export const updateUserAction = (data) => {
    return ({
        type : UPDATE_USER,
        data
    }
    )
}