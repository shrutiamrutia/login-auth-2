import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    FETCH_ALL_PRODUCT,
    FETCH_ALL_PRODUCT_SUCCESS,
    FETCH_ALL_PRODUCT_FAILURE,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE
} from '../actionType';

const initialState = {
    list: [],
    LoginError: "",
    fetchAllProductError: "",
    addProductError: "",
    editProductError: "",
    deleteProductError: ""
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
                list: action.payload,
                LoginError: false,
                token: action.payload.token
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                LoginError: action.payload.error,
            };
        case FETCH_ALL_PRODUCT:
            return {
                ...state,
                fetchAllProductError: "",
            };
        case FETCH_ALL_PRODUCT_SUCCESS:

            return {

                ...state,
                list: action.payload,
                fetchAllProductError: false,
            };
        case FETCH_ALL_PRODUCT_FAILURE:
            return {
                ...state,
                fetchAllProductError: action.payload.error,
            };

        case ADD_PRODUCT:
            return {
                ...state,
                addProductError: "",
            };
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                list: [...state.action, action.payload],
                addProductError: false,
            };
        case ADD_PRODUCT_FAILURE:
            return {
                ...state,
                addProductError: action.payload.error,
            };

        case UPDATE_PRODUCT:
            return {
                ...state,
                editProductError: "",
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                list: state.action.map((item) => item.id === action.payload.id ? action.payload : item),
                editProductError: false,
            };
        case UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                editProductError: action.payload.error,
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                deleteProductError: "",
            };
        case DELETE_PRODUCT_SUCCESS:
            let updateProductList;
            updateProductList = state.list.filter(
                productData => productData.id !== action.payload,
            );
            return {
                ...state,
                list: updateProductList,
                deleteProductError: false,
            };
        case DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                deleteProductError: action.payload.error,
            };
        default:
            return state;
    }
};

export default authReducer;




