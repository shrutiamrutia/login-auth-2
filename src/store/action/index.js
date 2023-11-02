import axios from 'axios'
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
} from '../actionType'
import { message } from 'antd';


export const loginRequest = payload => {
    return {
        type: LOGIN_REQUEST,
        payload: payload
    }
}


export const loginSuccess = payload => {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    }
}

export const loginFailure = payload => {
    return {
        type: LOGIN_FAILURE,
        payload: payload
    }
}

export const userLogin = (body) => async dispatch => {
    dispatch(loginRequest())
    axios
        .post(`https://dummyjson.com/auth/login`, body)
        .then((response) => {
            dispatch(loginSuccess(response.data));
            localStorage.setItem('token', response.data.token);
        })
        .catch((error) => {
            dispatch(loginFailure(error.data));
        });
}


export const fetchProduct = payload => {
    return {
        type: FETCH_ALL_PRODUCT,
        payload: payload
    }
}


export const fetchAllProductSuccess = payload => {
    return {
        type: FETCH_ALL_PRODUCT_SUCCESS,
        payload: payload
    }
}

export const fetchAllProductFailure = payload => {
    return {
        type: FETCH_ALL_PRODUCT_FAILURE,
        payload: payload
    }
}


export const fetchAllProduct = () => async dispatch => {
    dispatch(fetchProduct())
    axios
        .get(`https://fakestoreapi.com/products`)
        .then((response) => {
            dispatch(fetchAllProductSuccess(response.data));
        })
        .catch((error) => {
            dispatch(fetchAllProductFailure(error.data));
        });
}



export const addProduct = payload => {
    return {
        type: ADD_PRODUCT,
        payload: payload
    }
}


export const addProductSuccess = payload => {
    return {
        type: ADD_PRODUCT_SUCCESS,
        payload: payload
    }
}

export const addProductFailure = payload => {
    return {
        type: ADD_PRODUCT_FAILURE,
        payload: payload
    }
}


export const addNewProduct = (body) => async (dispatch, getState) => {
    dispatch(addProduct());
    axios
        .post("https://fakestoreapi.com/products", body)
        .then((response) => {
            const currentList = getState().login.list; // Get the current list from the state
            const updatedList = [...currentList, response.data]; // Add the new item to the list
            dispatch(addProductSuccess(updatedList)); // Update the state with the updated list
        })
        .catch((error) => {
            dispatch(addProductFailure(error.data));
        });
};

export const updateProduct = payload => {
    return {
        type: UPDATE_PRODUCT,
        payload: payload
    }
}

export const updateProductSuccess = payload => {
    return {
        type: UPDATE_PRODUCT_SUCCESS,
        payload: payload
    }
}

export const updateProductFailure = payload => {
    return {
        type: UPDATE_PRODUCT_FAILURE,
        payload: payload
    }
}


export const editProduct = (body, id) => async (dispatch, getState) => {
    dispatch(updateProduct());
    axios
        .put(`https://fakestoreapi.com/products/${id}`, body)
        .then((response) => {
            const currentList = getState().login.list; // Get the current list from the state
            const updatedList = currentList.map((item) =>
                item.id === response.data.id ? response.data : item
            );
            dispatch(updateProductSuccess(updatedList)); // Update the state with the updated list
        })
        .catch((error) => {
            dispatch(updateProductFailure(error.data));
        });
};



export const deleteProduct = payload => {
    return {
        type: DELETE_PRODUCT,
        payload: payload
    }
}

export const deleteProductSuccess = payload => {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        payload: payload
    }
}

export const deleteProductFailure = payload => {
    return {
        type: DELETE_PRODUCT_FAILURE,
        payload: payload
    }
}
export const deleteProductData = (id) => async (dispatch, getState) => {
    dispatch(deleteProduct());
    try {
        await axios.delete(`https://fakestoreapi.com/products/${id}`);
        const currentList = getState().login.list; // Get the current list from the state
        const updatedList = currentList.filter(item => item.id !== id); // Remove the deleted item from the list
        dispatch(deleteProductSuccess(updatedList)); // Update the state with the updated list
        message.success('Product deleted successfully');
    } catch (error) {
        dispatch(deleteProductFailure(error.data));

    }
};
