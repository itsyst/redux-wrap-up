import reducer from "../store/entities/users";
import * as actionCreators from "../store/entities/users";

const { usersRequested, usersReceived, usersRequestFailed } = actionCreators.slice.actions;

describe('users edge cases', () => {
    it('should handle empty API response', () => {
        const action = usersReceived({ data: [] });
        const state = reducer(undefined, action);
        expect(state.list).toEqual([]);
        expect(state.loading).toBe(false);
    });

    it('should handle concurrent requests', () => {
        const initialState = { list: [], loading: true, lastFetch: 0 };
        const action = usersRequested();
        const state = reducer(initialState, action);
        expect(state.loading).toBe(true); // Should stay loading
    });

    it('should preserve existing data on failed request', () => {
        const existingUsers = [{ id: 1, name: 'Existing User', username: 'existing', email: 'test@test.com' }];
        const initialState = { list: existingUsers, loading: true, lastFetch: 0 };
        const state = reducer(initialState, usersRequestFailed());

        expect(state.list).toEqual(existingUsers);
        expect(state.loading).toBe(false);
    });
});
