import { Action, Dispatch, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

// Thunk already built middleware in redux/toolkit
const toast: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: Action | any) => {
    (action.type === 'error')
        ? console.log('Toastify:', action.payload.message)
        : next(action)
}

export default toast