import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "./store";

interface Bug {
    id: number,
    description: string,
    resolved: boolean,
    userId?: number
}

// Initialize bug id
let lastId = 0;

const bugSlice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        // actions => action handlers

        assignBugToUser: (bugs: Bug[], action) => {
            const { userId, bugId } = action.payload;
            const index = bugs.findIndex(bug => bug.id === bugId);
            bugs[index].userId = userId;
        },

        addBug: (bugs: Bug[], action) => {
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
             })
        },

        resolveBug: (bugs: Bug[], action) => {
            const index = bugs.findIndex((bug: Bug) => bug.id === action.payload.id);
            bugs[index].resolved = true;

        },

        removeBug: (bugs: Bug[], action) => {
            const index = bugs.findIndex((bug: Bug) => bug.id === action.payload.id);
            bugs.splice(index, 1);
        }

    },
})

export const { addBug, resolveBug, removeBug, assignBugToUser} = bugSlice.actions
export default bugSlice.reducer

// Selector function
//export const unresolvedBugsSelector = (state:any) => state.entities.bugs.filter((bug:any) => !bug.resolved);

// Memorization : technique for optimizing expansive function.
// No need to recompute we get the results directly from the cache.
export const unresolvedBugsSelector = createSelector(
    (state: RootState) => state.entities.bugs,
    (state: RootState) => state.entities.projects,
    (bugs: Bug[]) => bugs.filter((bug: Bug) => !bug.resolved)
)

export const bugsByUserSelector = (userId: number)=> createSelector(
    (state: RootState) => state.entities.bugs,
    (bugs: Bug[]) => bugs.filter((bug: Bug) => bug.userId === userId)
)

const bugsSelector = (state: RootState) => state.entities.bugs
const projectsSelector = (state: RootState) => state.entities.projects

// The result function in the following selector
// is simply building an object from the input selectors
export const structuredSelector = createSelector(bugsSelector, projectsSelector, (bugs, projects) => ({
    bugs: bugs.filter((bug: Bug) => !bug.resolved),
    projects: projects.filter((project: any) => !project.resolved)
}))