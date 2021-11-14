import { Dispatch, Middleware } from "@reduxjs/toolkit";
import axios from "axios";
import * as actions from "../apiActions"

const api:Middleware = ({ dispatch, getState })  => (next: Dispatch) => async (action: any) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    next(action);
    
    const { url, method, data, onSuccess, onError } = action.payload;
    try {
        const response = await axios.request({
            baseURL: 'http://localhost:3000/api',
            url,
            method,
            data,
        });
        // General
        dispatch(actions.apiCallSuccess(response.data))
        //Specific
        if(onSuccess) dispatch({ type: onSuccess, payload: response.data})
    } catch (error) {
        // General
        dispatch(actions.apiCallFailed(error.message))
        //Specific
        if(onError) dispatch({ type: onError, payload: error})
    }
}

export default api