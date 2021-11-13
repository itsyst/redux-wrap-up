import { createAction } from "@reduxjs/toolkit";

// Action creators
export const addBug = createAction<string | object>("ADD_BUG");
export const removeBug = createAction<string | object>("REMOVE_BUG");
export const resolveBug = createAction<string | object>("RESOLVE_BUG");
 
// Reducer
let lastId = 0;

export const reducer = (state: any[] = [], action: any) => {
    switch (action.type) {
        case addBug.type:
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false
                }
            ];

        case removeBug.type:
            return state.filter(bug => bug.id !== action.payload.id);

        case resolveBug.type:
            return state.map(bug => bug.id !== action.payload.id ? bug : { ...bug, resolved: true })

        default:
            return state;
    }
}

