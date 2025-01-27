import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { apiCallStarted } from "../constants/api-users-constants";
import { cachedAPIRequest } from "../utils/cache";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

export const slice = createSlice({
    name: "users",
    initialState: {
        list: [] as User[],
        loading: false,
        lastFetch: 0,
    },
    reducers: {
        usersRequested: (state) => {
            state.loading = true;
        },
        usersReceived: (state, action) => {
            state.list = action.payload.data;
            state.loading = false;
        },
        usersRequestFailed: (state) => {
            state.loading = false;
        }
    }
});

// Action Creators
const { usersRequested, usersReceived, usersRequestFailed } = slice.actions;

const url = '/users';
const cacheTime = 10; // 10 minutes

export const getUsers = () => (dispatch: Dispatch, getState: () => UserState) => {
    return cachedAPIRequest('users', cacheTime, dispatch, getState, () => {
        const action = apiCallStarted({
            url: url,
            method: "get",
            onStart: usersRequested.type,
            onSuccess: usersReceived.type,
            onError: usersRequestFailed.type
        });

        dispatch(action);
        return Promise.resolve(action); // Return action promise
    });
};

// Reducer
export default slice.reducer;

// Selector
export interface UserState {
    entities: {
        users: {
            list: User[],
            loading: boolean;
            lastFetch: number;
        }
    }
}