import { createSlice } from "@reduxjs/toolkit";

// Initialize bug id
let lastId = 0;

const bugSlice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        // actions => action handlers
        addBug: (bugs, action) => {
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
        },

        resolveBug: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id === action.payload.id);
            bugs[index].resolved = true;
        },

        removeBug: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id === action.payload.id);
            bugs.splice(index, 1);
        }

    },
})

export const { addBug, resolveBug, removeBug } = bugSlice.actions
export default bugSlice.reducer

export function addProject(arg0: {}): any {
    throw new Error('Function not implemented.');
}
