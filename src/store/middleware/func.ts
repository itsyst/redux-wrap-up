import {  Action, Dispatch, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

// Thunk already built middleware in redux/toolkit
const func: Middleware = ({dispatch, getState}) => (next: Dispatch) => (action: Action | any ) => {
    typeof action === 'function'
        ? action(dispatch, getState)
        : next(action)
}
 
export default func
