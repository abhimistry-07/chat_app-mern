import { FETCH_AGAIN, GET_ALL_CHATS, GET_NOTIFICATION, GET_SELECTED_CHAT } from "../actionTypes"

export const selectedChatFun = (chat) => ({
    type: GET_SELECTED_CHAT,
    payload: chat
})

export const getAllChat = (chat) => ({
    type: GET_ALL_CHATS,
    payload: chat
})

export const fetchChatAgainFun = (chat) => ({
    type: FETCH_AGAIN,
    payload: chat
});

export const setNotification = (notification) => ({
    type: GET_NOTIFICATION,
    payload: notification
})