import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'loading',
    initialState: {
        global: false,
    },
    reducers: {
        loadingStatus: (state, action) => {
            state.global = action.payload; // Set global loading state
        },
    },
});

// Action Creators
export const { loadingStatus } = slice.actions;
// Reducer
export default slice.reducer;
