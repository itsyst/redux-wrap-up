// tests/middleware/users-api.spec.ts
import { configureStore, Middleware } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiCallStarted } from '../store/constants/api-users-constants';
import usersApi from '../store/middleware/users-api';
  
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('usersApi middleware', () => {
    const mockUser = { id: 1, name: 'Test User' };
    const apiAction = {
        type: apiCallStarted.type,
        payload: {
            url: '/users',
            method: 'get',
            onStart: 'usersRequested',
            onSuccess: 'usersReceived',
            onError: 'usersRequestFailed'
        }
    };

    let store: ReturnType<typeof configureStore>;
    let actions: { type: string; payload?: unknown }[] = [];

    beforeEach(() => {
        actions = [];
        const actionTracker: Middleware = () => next => action => {
            actions.push(action as { type: string; payload?: unknown });
            return next(action);
        };

        store = configureStore({
            reducer: (state = {}) => state,
            middleware: (gDM) => gDM().concat(
                usersApi as Middleware,
                actionTracker
            )
        });
    });

    it('should handle successful API calls', async () => {
        // Mock successful response
        mockedAxios.request.mockResolvedValue({ data: mockUser });

        // Dispatch the API call
        await store.dispatch(apiCallStarted(apiAction.payload));

        // Verify action sequence
        expect(actions.map(a => a.type)).toEqual([
            'usersRequested',        // Loading started
            apiCallStarted.type,     // API call initiated
            'users/APICallSuccess',  // API success
            'usersReceived'          // Data received
        ]);

        // Verify success payload
        const successAction = actions.find(a => a.type === 'usersReceived');
        expect(successAction?.payload).toEqual({ data: mockUser });
    });

    it('should handle API call structure correctly', async () => {
        mockedAxios.request.mockResolvedValue({ data: mockUser });

        await store.dispatch(apiCallStarted({
            url: '/users/1',
            method: 'patch',
            data: { name: 'Updated' },
            onStart: 'usersUpdateRequested',
            onSuccess: 'usersUpdateSuccess',
            onError: 'usersUpdateFailed'
        }));

        expect(mockedAxios.request).toHaveBeenCalledWith({
            baseURL: process.env.VITE_BASE_USERS_URL_API,
            url: '/users/1',
            method: 'patch',
            data: { name: 'Updated' }
        });
    });

    it('should skip non-api actions', async () => {
        const initialActionCount = actions.length;
        await store.dispatch({ type: 'OTHER_ACTION' });
        expect(actions.length).toBe(initialActionCount + 1);
    });
});