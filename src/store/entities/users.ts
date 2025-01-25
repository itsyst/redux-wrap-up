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
    },
    reducers: {
        usersReceived: (state, action) => {
            state.list = action.payload.data; 
        },
    }
});

// Action Creators
export const { usersReceived } = slice.actions;

const url = '/users'
export const getUsers = () => (dispatch: Dispatch) => {
    dispatch(apiCallStarted({
        url: url,
        method: "get",
        onSuccess: usersReceived.type,
        onError: slice.name + "/usersRequestFailed"
    }));
};
 

// Reducer
export default slice.reducer;

// Selector
export interface UserState {
    entities: {
        users: {
            list: User[]
        }
    }
}