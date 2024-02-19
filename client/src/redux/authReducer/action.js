import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actionTypes"
import axios from 'axios';
const URL = process.env.REACT_APP_BASE_URL;

export const login = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
});

export const logout = () => ({
    type: LOGOUT_SUCCESS
})

// export const login = (userData) => (dispatch) => {
//     dispatch({ type: LOGIN_REQUEST });
//     // dispatch({ type: LOGIN_SUCCESS, payload: res.data })
//     // dispatch({ type: LOGIN_FAILURE, payload: err });

//     axios.post(`${URL}/user/login`, userData)
//         .then((res) => {
//             // console.log(res.data, '>>>>>');
//         })
//         .catch((err) => {
//             // console.log(err, 'Error in login');
//         })
// }

