import { Dispatch, Middleware } from "@reduxjs/toolkit";
import axios from "axios";

const api:Middleware = ({ dispatch, getState })  => (next: Dispatch) => async (action: any) => {
    if (action.type !== 'apiRequest') return next(action);

    next(action);
    
    const { url, method, data, onSuccess, onError } = action.payload;
    try {
        const response = await axios.request({
            baseURL: 'http://localhost:3000/api',
            url,
            method,
            data,
        });
        dispatch({ type: onSuccess, payload: response.data})
    } catch(error){
        dispatch({ type: onError, payload: error})
    }
}

export default api