import { CREATE_EVENT, DELETE_EVENT, DELETE_REGISTRATION, GET_EVENTS, GET_USER_EVENTS ,REGISTERED_EVENTS,REGISTER_EVENT,REGISTRATION,SEARCH_BY_ENTRY_FEES,SEARCH_BY_NAME,SEARCH_BY_VENUE,UPDATE_EVENT,UPDATE_FORM,UPDATE_TICKET,USER_REGISTERED_EVENTS,VIEW_EVENT} from "../constants"

export const eventAction = () => {
    return ({
        type : GET_EVENTS
    }
    )
}

export const userEventAction = (data) => {
    return ({
        type : GET_USER_EVENTS,
        data
    }
    )
}

export const viewEventAction = (data) => {
    return {
        type : VIEW_EVENT,
        data
    }
}

export const createEventAction = (data) => {
    return {
        type : CREATE_EVENT,
        data
    }
}

export const DeleteEventAction = (data) => {
    return {
        type : DELETE_EVENT,
        data
    }
}

export const updateFormAction = (data) => {
    return {
        type : UPDATE_FORM,
        data
    }
}

export const updateEventAction = (data) => {
    return {
        type : UPDATE_EVENT,
        data
    }
}

export const registerEvent = (data) => {
    return {
        type : REGISTER_EVENT,
        data
    }
}

export const registeredEvents = () => {
    return {
        type : REGISTERED_EVENTS,
    }
}

export const userRegisteredEvents = (data) => {
    return {
        type : USER_REGISTERED_EVENTS,
        data
    }
}

export const DeleteRegistrationAction = (data) => {
    return {
        type : DELETE_REGISTRATION,
        data
    }
}

export const updateTicketAction = (data) => {
    return {
        type : UPDATE_TICKET,
        data
    }
}

export const searchByName = (data) => {
    return {
        type : SEARCH_BY_NAME,
        data
    }
}

export const searchByVenue = (data) => {
    return {
        type : SEARCH_BY_VENUE,
        data
    }
}

export const searchByEntryFees = (data) => {
    return {
        type : SEARCH_BY_ENTRY_FEES,
        data
    }
}

