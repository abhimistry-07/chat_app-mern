import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { reducer as authReducer } from "./authReducer/reducer"
import { reducer as chatReducer } from "./chatReducer/reducer"
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
    authReducer, chatReducer
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;