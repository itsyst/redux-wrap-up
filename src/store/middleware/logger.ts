import { Action, Dispatch } from "@reduxjs/toolkit";

const logger = (param: unknown) => (_store: unknown) => (next: Dispatch) => (action: Action) => {
    console.log("Logging", param, _store)
    next(action)
}

export default logger;
