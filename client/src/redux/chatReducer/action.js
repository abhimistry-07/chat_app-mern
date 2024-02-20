import { GET_ALL_CHATS, GET_SELECTED_CHAT } from "../actionTypes"

export const selectedChatFun = (chat) => ({
    type: GET_SELECTED_CHAT,
    payload: chat
})

export const getAllChat = (chat) => ({
    type: GET_ALL_CHATS,
    payload: chat
})