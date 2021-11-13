import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
export const addBug = createAction<string | object>("ADD_BUG");
export const resolveBug = createAction<string | object>("RESOLVE_BUG");
export const removeBug = createAction<string | object>("REMOVE_BUG");

// Reducer
let lastId = 0;

export default createReducer([], {

    [addBug.type]: (bugs, action) => {
        bugs.push({
            id: ++lastId,
            description: action.payload.description,
            resolved: false
        })
    },

    [resolveBug.type]: (bugs, action) => {
        const index = bugs.findIndex(bug => bug.id === action.payload.id);
        bugs[index].resolved = true;
    },

    [removeBug.type]: (bugs, action) => {
        const index = bugs.findIndex(bug => bug.id === action.payload.id);
        bugs.splice(index, 1);
    }
});

