import {  Action, Dispatch, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
 
const func: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: Action | any ) => {
    typeof action === 'function'
        ? action()
        : next(action)
}
 
export default func
