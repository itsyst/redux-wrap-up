import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
  
 
const logger  = (params:any) => (store:MiddlewareAPI)  =>  (next:Dispatch) =>  (action:Action)  => {
    console.log("Logging:", params);
    console.log("store:", store);
    console.log("next:", next);
    console.log("action:", action);
    next(action);
}

export default logger