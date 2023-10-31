import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actionType';

const initialState = {
    user: [],
    LoginError: "",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                LoginError: "",
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                LoginError: false,
                token: action.payload.token
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                LoginError: action.payload.error,
            };
        default:
            return state;
    }
};

export default authReducer;




