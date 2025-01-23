import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    type: null, // Modal type (e.g., "login", "signup")
    props: {}, // Additional modal properties
};

const slice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        modalOpen: (_state, action) =>
        ({
            isOpen: true,
            type: action.payload.type,
            props: action.payload.props || {},
        }),
        modalClose: () => initialState, // Reset modal state
    },
});

// Action Creators
export const { modalOpen, modalClose } = slice.actions;
// Reducer
export default slice.reducer;
