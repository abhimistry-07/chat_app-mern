import { FETCH_AGAIN, GET_ALL_CHATS, GET_SELECTED_CHAT } from "../actionTypes";

const initState = {
    selectedChat: null,
    allChat: [],
    fetchAgain: false
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
        default:
            return state;
    }
}