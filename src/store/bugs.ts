import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
export const addBug = createAction<string | object>("ADD_BUG");
export const resolveBug = createAction<string | object>("RESOLVE_BUG");
export const removeBug = createAction<string | object>("REMOVE_BUG");

// Reducer
let lastId = 0;

export default createReducer([], {

    ADD_BUG: (bugs, action) => {
        bugs.push({
            id: ++lastId,
            description: action.payload.description,
            resolved: false
        })
    },

    RESOLVE_BUG: (bugs, action) => {
        const index = bugs.findIndex(bug => bug.id === action.payload.id);
        bugs[index].resolved = true;
    },

    REMOVE_BUG: (bugs, action) => {
        const index = bugs.findIndex(bug => bug.id === action.payload.id);
        bugs.splice(index, 1);
    }
});

