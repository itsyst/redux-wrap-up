// users.test.ts
import * as actionCreators from '../store/entities/users';
import reducer, { User } from '../store/entities/users';

const { usersRequested, usersReceived, usersRequestFailed } = actionCreators.slice.actions;

describe('users reducer', () => {
    const initialState = {
        list: [] as User[],
        loading: false,
        lastFetch: 0
    };

    it('should handle usersRequested', () => {
        const action = usersRequested();
        const state = reducer(initialState, action);
        expect(state.loading).toBe(true);
    });

    it('should handle usersReceived', () => {
        const mockUsers = [
            { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' }
        ];
        const action = usersReceived({ data: mockUsers });
        const state = reducer(initialState, action);

        expect(state.list).toEqual(mockUsers);
        expect(state.loading).toBe(false);
    });

    it('should handle usersRequestFailed', () => {
        const state = reducer({ ...initialState, loading: true }, usersRequestFailed());
        expect(state.loading).toBe(false);
    });
});