import { FETCH_AGAIN, GET_ALL_CHATS, GET_NOTIFICATION, GET_SELECTED_CHAT } from "../actionTypes";

const initState = {
    selectedChat: null,
    allChat: [],
    fetchAgain: false,
    notification: []
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case GET_SELECTED_CHAT:
            return {
                ...state,
                selectedChat: action.payload
            }
        case GET_ALL_CHATS:
            return {
                ...state,
                allChat: action.payload
            }
        case FETCH_AGAIN:
            return {
                ...state,
                fetchAgain: action.payloads
            }
        case GET_NOTIFICATION:
            return {
                ...state,
                notification: action.payload
            }
        default:
            return state;
    }
}