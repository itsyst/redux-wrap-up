import { createAction } from "@reduxjs/toolkit";

export const apiCallStarted = createAction('api/bugs/callStarted',
    (payload: {
        url: string;
        onStart: string;
        onSuccess: string;
        onError?: string;
        method?: string;
        data?: unknown;
    }) => ({
        payload
    })
);

export const apiCallSuccess = createAction("api/bugs/CallSuccess",
    (payload: {
        url: string;
        onStart: string;
        onSuccess: string;
        onError?: string;
        method?: string;
        data?: unknown;
    }) => ({
        payload
    })
);

export const apiCallFailed = createAction("api/bugs/CallFailed",
    (payload: {
        url: string;
        onStart: string;
        onSuccess: string;
        onError?: string;
        method?: string;
        data?: unknown;
    }) => ({
        payload
    })
);
