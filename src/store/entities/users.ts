import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { apiCallStarted } from "../constants/api-users-constants";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

const slice = createSlice({
    name: "users",
    initialState: {
        list: [] as User[],
        loading: false,
    },
    reducers: {
        usersRequested: (state) => {
            state.loading = true;
        },
        usersReceived: (state, action) => {
            state.list = action.payload.data;
        },
        usersRequestFailed: (state) => {
            state.loading = false;
        },
    }
});

// Action Creators
export const { usersRequested, usersReceived, usersRequestFailed } = slice.actions;

const url = '/users'
export const getUsers = () => (dispatch: Dispatch) => {
    dispatch(apiCallStarted({
        url: url,
        method: "get",
        onStart: usersRequested.type,
        onSuccess: usersReceived.type,
        onError: usersRequestFailed.type
    }));
};


// Reducer
export default slice.reducer;

// Selector
export interface UserState {
    entities: {
        users: {
            list: User[],
            loading: boolean;
        }
    }
}