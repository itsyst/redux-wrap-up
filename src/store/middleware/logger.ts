import { Middleware } from "@reduxjs/toolkit";
  
 
const logger: Middleware = store  =>  next =>  action  => {
    console.log("store:", store);
    console.log("next:", next);
    console.log("action:", action);
    next(action);
}

export default logger