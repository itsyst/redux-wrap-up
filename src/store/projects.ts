import { createSlice } from "@reduxjs/toolkit";

// Initialize project id
let lastId = 0;

const projectSlice = createSlice({
    name: 'projects',
    initialState: [],
    reducers: {
        // actions => action handlers
        addProject: (projects, action) => {
            projects.push({
                id: ++lastId,
                name: action.payload.name,
             })
        },
    }
})

export const { addProject } = projectSlice.actions;
export default projectSlice.reducer;