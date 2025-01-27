import bugsReducer, { Bug, BugState } from '../store/entities/bugs';

describe('bug reducer edge cases', () => {
    const initialState: BugState['entities']['bugs'] = {
        list: [] as Bug[],
        loading: false,
        lastFetch: 0
    };

    it('should handle adding bug with missing fields', () => {
        const action = {
            type: 'bugs/bugAdded',
            payload: { data: { id: '1' } } // No description
        };

        const state = bugsReducer(initialState, action);
        expect(state.list[0]).toEqual(expect.objectContaining({
            id: '1',
        }));
    });

    it('should ignore update for non-existent bug', () => {
        const existingState = {
            list: [{ id: '1', description: 'Test' }],
            loading: false,
            lastFetch: 0
        };
        const action = {
            type: 'bugs/bugResolved',
            payload: { data: { id: '2', resolved: true } }
        };
        const state = bugsReducer(existingState, action);
        expect(state.list).toEqual(existingState.list);
    });
});