import bugsReducer, { Bug, BugState } from '../store/entities/bugs';

describe('bugsReducer solitary tests', () => {
    const initialState: BugState['entities']['bugs'] = {
        list: [] as Bug[],
        loading: false,
        lastFetch: 0
    };

    it('should handle bugsReceived', () => {
        const mockBugs = [{ id: '1', description: 'Test bug' }];
        const action = {
            type: 'bugs/bugsReceived',
            payload: { data: mockBugs }
        };
        const state = bugsReducer(initialState, action);
        expect(state.list).toEqual(mockBugs);
        expect(state.loading).toBe(false);
        expect(state.lastFetch).not.toBe(0);
    });

    it('should handle bugAdded', () => {
        const mockBug = { id: '2', description: 'New bug' };
        const action = {
            type: 'bugs/bugAdded',
            payload: { data: mockBug }
        };
        const state = bugsReducer(initialState, action);
        expect(state.list[0]).toEqual(mockBug);
    });

    it('should handle bugResolved', () => {
        const existingState = {
            list: [{ id: '1', description: 'Test bug', resolved: false }],
            loading: true,
            lastFetch: 0
        };
        const action = {
            type: 'bugs/bugResolved',
            payload: { data: { id: '1', resolved: true } }
        };
        const state = bugsReducer(existingState, action);
        expect(state.list[0].resolved).toBe(true);
        expect(state.loading).toBe(false);
    });

    it('should handle partial updates with bugResolved', () => {
        const existingState = {
            list: [{ id: '1', description: 'Test bug', resolved: false }],
            loading: true,
            lastFetch: 0
        };
        const action = {
            type: 'bugs/bugResolved',
            payload: {
                data: {
                    id: "1",
                    description: "desc",
                    resolved: true,
                    priority: "Low",
                    reportedAt: "2025-01-28",
                    severity: "Minor",
                    tags: ["tag1", "tag2"]
                }
            }
        };
        const state = bugsReducer(existingState, action);
        expect(state.list[0].resolved).toBe(true);
        expect(state.list[0].description).toBe('desc');  
        expect(state.list[0].priority).toBe('Low');  
        expect(state.list[0].reportedAt).toBe('2025-01-28');  
        expect(state.list[0].severity).toBe('Minor');  
        expect(state.list[0].tags).toEqual(["tag1", "tag2"]);  
        expect(state.loading).toBe(false);
    });


    it('should handle bugAssignedUser', () => {
        const existingState = {
            list: [{ id: '1', description: 'Test bug', userId: 1 }],
            loading: true,
            lastFetch: 0
        };
        const action = {
            type: 'bugs/bugAssignedUser',
            payload: { data: { id: '1', userId: 2 } }
        };
        const state = bugsReducer(existingState, action);
        expect(state.list[0].userId).toBe(2);
        expect(state.loading).toBe(false);
    });

    it('should handle bugRemoved', () => {
        const existingState = {
            list: [{ id: '1', description: 'Test bug' }],
            loading: true,
            lastFetch: 0
        };
        const action = {
            type: 'bugs/bugRemoved',
            payload: { data: { id: '1' } }
        };
        const state = bugsReducer(existingState, action);
        expect(state.list).toEqual([]);
        expect(state.loading).toBe(false);
    });

    it('should handle bugsRequestFailed', () => {
        const action = {
            type: 'bugs/bugsRequestFailed',
            payload: { data: 'Network Error' }
        };
        const state = bugsReducer(initialState, action);
        expect(state.loading).toBe(false);
    });
});