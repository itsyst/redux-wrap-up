import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit";

interface Bug {
    id: string;
    description: string;
    resolved: boolean;
    userId?: number;
}

const slice = createSlice({
    name: 'bugs',
    initialState: [] as Bug[],
    reducers: {
        bugAssignedUser: (state, action) => {
            const { id: bagId, userId } = action.payload;
            const index = state.findIndex(bug => bug.id === bagId);
            if (index !== -1)
                state[index].userId = userId
        },
        bugAdd: (state, action) => {
            state.push({
                id: nanoid(),
                description: action.payload.description,
                resolved: false,
            })
        },
        bugResolve: (state, action) => {
            const bug = state.find((bug) => bug.id === action.payload.id);
            if (bug)
                bug.resolved = true;

            // const bugIndex = state.findIndex(bug => bug.id === action.payload.id);
            // console.log(bugIndex);
            // if (bugIndex !== -1) {
            //     state[bugIndex].resolved = true;
            // }
        },
        bugRemove: (state, action) =>
            state.filter((bug) => bug.id !== action.payload.id)
    }
})

// Action Creators
export const { bugAdd, bugResolve, bugRemove, bugAssignedUser } = slice.actions;

// Reducer
export default slice.reducer;

// Selector
export interface BugState {
    entities: {
        bugs: Bug[];
    }
}
export const unresolvedBugsSelector = (state: BugState) =>
    state.entities.bugs.filter(bug => !bug.resolved);

// Memorization
export const memorizedBugsSelector = createSelector(
    (state: BugState) => state.entities.bugs,
    (bugs: Bug[]) => bugs.filter(bug => !bug.resolved)
)

// Memorization
export const memorizedBugsByUserSelector = (userId: number | undefined) => createSelector(
    (state: BugState) => state.entities.bugs,
    (bugs: Bug[]) => bugs.filter(bug => bug.userId === userId)
)