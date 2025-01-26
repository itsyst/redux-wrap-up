import { createAction } from "@reduxjs/toolkit";

export const apiCallStarted = createAction('bugs/APICallStarted',
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

export const apiCallSuccess = createAction("bugs/APICallSuccess",
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

export const apiCallFailed = createAction("bugs/APICallFailed",
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
