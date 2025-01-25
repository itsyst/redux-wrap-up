import { createAction } from "@reduxjs/toolkit";

export const apiCallStarted = createAction('api/users/callStarted',
    (payload: {
        url: string;
        onSuccess: string;
        onError?: string;
        method?: string;
        data?: unknown;
    }) => ({
        payload
    })
);

export const apiCallSuccess = createAction("api/users/CallSuccess",
    (payload: {
        url: string;
        onSuccess: string;
        onError?: string;
        method?: string;
        data?: unknown;
    }) => ({
        payload
    })
);

export const apiCallFailed = createAction("api/users/CallFailed",
    (payload: {
        url: string;
        onSuccess: string;
        onError?: string;
        method?: string;
        data?: unknown;
    }) => ({
        payload
    })
);
