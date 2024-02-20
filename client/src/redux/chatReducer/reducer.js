import { GET_ALL_CHATS, GET_SELECTED_CHAT } from "../actionTypes";

const initState = {
    selectedChat: [],
    allChat: [],
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

        default:
            return state;
    }
}