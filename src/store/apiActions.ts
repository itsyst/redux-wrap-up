import { ActionCreatorWithPayload, createAction,  } from "@reduxjs/toolkit"

export const apiCallBegan:ActionCreatorWithPayload<any> = createAction("api/callBegan");
export const apiCallSuccess: ActionCreatorWithPayload<any> = createAction("api/callSuccess");
export const apiCallFailed: ActionCreatorWithPayload<any> = createAction("api/callFailed");

 