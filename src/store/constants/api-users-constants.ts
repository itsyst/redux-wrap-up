import { createAction } from "@reduxjs/toolkit";

export const apiCallStarted = createAction('users/APICallStarted',
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

export const apiCallSuccess = createAction("users/APICallSuccess",
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

export const apiCallFailed = createAction("users/APICallFailed",
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
