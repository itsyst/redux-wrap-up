import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from './apiActions';
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
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        // actions => action handlers

        assignBugToUser: (bugs, action) => {
            const { userId, bugId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        },

        addBug: (bugs, action) => {
            bugs.list.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
        },

        resolveBug: (bugs, action) => {
            const index = bugs.list.findIndex((bug: Bug) => bug.id === action.payload.id);
            bugs.list[index].resolved = true;

        },

        removeBug: (bugs, action) => {
            const index = bugs.list.findIndex((bug: Bug) => bug.id === action.payload.id);
            bugs.list.splice(index, 1);
        },

        receivedBugs: (bugs, action) => {
            bugs.list = action.payload
        }

    },
})

export const { addBug, resolveBug, removeBug, assignBugToUser, receivedBugs } = bugSlice.actions
export default bugSlice.reducer

// Action Creators
const url = "/bugs";

export const loadBugs = () => apiCallBegan({
    url: url,
    onSuccess: receivedBugs.type
})

// Selector function
//export const unresolvedBugsSelector = (state:any) => state.entities.bugs.filter((bug:any) => !bug.resolved);

// Memorization : technique for optimizing expansive function.
// No need to recompute we get the results directly from the cache.
export const unresolvedBugsSelector = createSelector(
    (state: RootState) => state.entities.bugs,
    (state: RootState) => state.entities.projects,
    (bugs) => bugs.list.filter((bug: Bug) => !bug.resolved)
)

export const bugsByUserSelector = (userId: number) => createSelector(
    (state: RootState) => state.entities.bugs,
    (bugs) => bugs.list.filter((bug: Bug) => bug.userId === userId)
)

const bugsSelector = (state: RootState) => state.entities.bugs
const projectsSelector = (state: RootState) => state.entities.projects

// The result function in the following selector
// is simply building an object from the input selectors
export const structuredSelector = createSelector(bugsSelector, projectsSelector, (bugs, projects) => ({
    bugs: bugs.list.filter((bug: Bug) => !bug.resolved),
    projects: projects.filter((project: any) => !project.resolved)
}))