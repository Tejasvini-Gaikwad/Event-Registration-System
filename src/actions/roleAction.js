import { GET_ROLES } from "../constants"

export const roleAction = (data) => {
    return ({
        type : GET_ROLES,
        data
    }
    )
}