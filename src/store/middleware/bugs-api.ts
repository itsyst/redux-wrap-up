import { Action, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import * as actions from "../constants/api-bugs-constants";

interface ApiAction {
    type: string;
    payload: {
        url: string;
        method: string;
        data?: unknown;
        onStart: string;
        onSuccess: string;
        onError: string;
    }
}

const bugsApi = ({ dispatch }: { dispatch: Dispatch }) => (next: (action: Action) => unknown) => async (action: Action) => {
    if (action.type !== actions.apiCallStarted.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = (action as ApiAction).payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    await axios.request({
        baseURL: import.meta.env.VITE_BASE_URL_API,
        url,
        method,
        data
    })
        .then(response => {
            dispatch(actions.apiCallSuccess(response.data));
            dispatch({
                type: onSuccess,
                payload: {
                    data: response.data
                }
            });
        })
        .catch(error => {
            dispatch(actions.apiCallFailed(error.message));
            dispatch({
                type: onError, payload: {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    code: error.code,
                    status: error.status
                }
            });
        });

};

export default bugsApi;