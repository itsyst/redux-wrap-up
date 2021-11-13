import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

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

// Selector function
//export const unresolvedBugsSelector = (state:any) => state.entities.bugs.filter((bug:any) => !bug.resolved);

// Memorization : technique for optimizing expansive function.
// No need to recompute we get the results directly from the cache.
export const unresolvedBugsSelector = createSelector(
    (state: any) => state.entities.bugs,
    (state: any) => state.entities.projects,
    (bugs: any) => bugs.filter((bug: any) => !bug.resolved) 
)
 
const bugsSelector = (state:any) => state.entities.bugs 
const projectsSelector = (state:any) => state.entities.projects

// The result function in the following selector
// is simply building an object from the input selectors
export const structuredSelector = createSelector(bugsSelector, projectsSelector, (bugs, projects) => ({
    bugs: bugs.filter((bug: any) => !bug.resolved),
    projects: projects.filter((project: any) => !project.resolved)
}))