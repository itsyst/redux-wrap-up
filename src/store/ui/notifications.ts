import { createSlice, nanoid } from "@reduxjs/toolkit";

interface Notification {
    id: string;
    message: string;
}

const slice = createSlice({
    name: 'notifications',
    initialState: [] as Notification[],
    reducers: {
        notificationAdd: (state, action) => {
            state.push({
                id: nanoid(),
                message: action.payload.message,
            });   // Push new notification
        },

        notificationRemove: (state, action) =>
            state.filter(notification => notification.id !== action.payload.id)

    },
});

// Action Creators
export const { notificationAdd, notificationRemove } = slice.actions;
// Reducer
export default slice.reducer;
