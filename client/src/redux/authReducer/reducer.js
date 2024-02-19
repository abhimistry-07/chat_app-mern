import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actionTypes";

const initState = {
    isAuth: false,
    isLoading: false,
    isError: false,
    errMsg: {},
    user: []
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isAuth: true,
                user: action.payload,
                errMsg: ""
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errMsg: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuth: false,
                isLoading: false,
                isError: false,
                errMsg: {},
                user: []
            }

        default:
            return state;
    }
};