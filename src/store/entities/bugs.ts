import { createSelector, createSlice, Dispatch } from "@reduxjs/toolkit";
import { apiCallStarted } from "../constants/api-bugs-constants";
import { cachedAPIRequest } from "../utils/cache";

export interface Bug {
    id: string;
    description?: string;
    resolved?: boolean;
    userId?: number;
    priority?: string;
    reportedAt?: string;
    severity?: string;
    tags?: string[]
}


const slice = createSlice({
    name: 'bugs',
    initialState: {
        list: [] as Bug[],
        loading: false,
        lastFetch: 0,
    },
    reducers: {
        bugsRequested: (state) => {
            state.loading = true;
        },
        bugsRequestFailed: (state) => {
            state.loading = false;
        },
        bugsReceived: (state, action) => {
            state.list = action.payload.data;
            state.loading = false;
            state.lastFetch = Date.now();
        },
        bugAssignedUser: (state, action) => {
            const { id: bagId, userId } = action.payload.data;
            const index = state.list.findIndex(bug => bug.id === bagId);
            if (index !== -1)
                state.list[index].userId = userId
        },
        bugAdded: (state, action) => {
            state.list.unshift(action.payload.data);
        },
        bugResolved: (state, action) => {
            const bug = state.list.find((bug) => bug.id === action.payload.data.id);
            if (bug) {
                // Only update fields that are in the payload to avoid overwriting existing data
                if (action.payload.data.description !== undefined) {
                    bug.description = action.payload.data.description;
                }
                if (action.payload.data.severity !== undefined) {
                    bug.severity = action.payload.data.severity;
                }
                if (action.payload.data.priority !== undefined) {
                    bug.priority = action.payload.data.priority;
                }
                if (action.payload.data.tags !== undefined) {
                    bug.tags = action.payload.data.tags;
                }
                bug.resolved = action.payload.data.resolved;
                if (action.payload.data.userId !== undefined) {
                    bug.userId = action.payload.data.userId;
                }
                if (action.payload.data.reportedAt !== undefined) {
                    bug.reportedAt = action.payload.data.reportedAt;
                }
                state.loading = false;
            }
            // const bugIndex = state.list.findIndex(bug => bug.id === action.payload.id);
            // console.log(bugIndex);
            // if (bugIndex !== -1) {
            //     state.list[bugIndex].resolved = true;
            // }
        },
        bugRemoved: (state, action) => {
            const index = state.list.findIndex(bug => bug.id === action.payload.data.id)
            state.list.splice(index, 1);
        }
    }
})

// Action Creators
export const { bugAdded, bugResolved, bugRemoved, bugAssignedUser, bugsReceived, bugsRequested, bugsRequestFailed } = slice.actions;

const url = '/bugs'
export const getBugs = () => (dispatch: Dispatch, getState: () => BugState) => {
    cachedAPIRequest('bugs', 10, dispatch, getState, () => {
        dispatch(apiCallStarted({
            url: url,
            method: "get",
            onStart: bugsRequested.type,
            onSuccess: bugsReceived.type,
            onError: bugsRequestFailed.type
        }));
    });
};

export const addBug = (bug: Bug) => (dispatch: Dispatch) => {
    dispatch(apiCallStarted({
        url: url,
        method: "post",
        data: bug, // Include the bug data in the POST request
        onStart: bugsRequested.type,
        onSuccess: bugAdded.type,
        onError: bugsRequestFailed.type
    }));
};

export const updateBug = (bug: Partial<Bug>) => (dispatch: Dispatch) => {
    dispatch(apiCallStarted({
        url: url + '/' + bug.id,
        method: "patch",
        data: bug, // Include the bug data in the POST request
        onStart: bugsRequested.type,
        onSuccess: bugResolved.type,
        onError: bugsRequestFailed.type
    }));
};

export const removeBug = (id: string) => (dispatch: Dispatch) => {
    dispatch(apiCallStarted({
        url: url + '/' + id,
        method: "delete",
        data: id, // Include the bug data in the POST request
        onStart: bugsRequested.type,
        onSuccess: bugRemoved.type,
        onError: bugsRequestFailed.type
    }));
};
// Reducer
export default slice.reducer;

// Selector
export interface BugState {
    entities: {
        bugs: {
            list: Bug[];
            loading: boolean;
            lastFetch: number;
        };
    }
}
export const unresolvedBugsSelector = (state: BugState) =>
    state.entities.bugs.list.filter(bug => !bug.resolved);

// Memorization
export const memorizedBugsSelector = createSelector(
    (state: BugState) => state.entities.bugs.list,
    (bugs: Bug[]) => bugs.filter(bug => !bug.resolved)
)

// Memorization
export const memorizedBugsByUserSelector = (userId: number | undefined) => createSelector(
    (state: BugState) => state.entities.bugs.list,
    (bugs: Bug[]) => bugs.filter(bug => bug.userId === userId)
)