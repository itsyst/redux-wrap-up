import { configureStore, Middleware } from '@reduxjs/toolkit';
import axios from 'axios';
import rootReducer from '../store/reducers';
import bugsApi from '../store/middleware/bugs-api';
import { addBug, getBugs, updateBug, Bug } from '../store/entities/bugs';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const createTestStore = () => configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM().concat(bugsApi as Middleware)
});

describe('bugs API integration tests', () => {
    const testBug: Bug = {
        id: '1',
        description: 'Integration test bug',
        resolved: false
    };

    beforeEach(() => {
        mockedAxios.request.mockReset();
    });

    it('should complete addBug flow', async () => {
        const store = createTestStore();
        mockedAxios.request.mockResolvedValue({ data: testBug });

        await store.dispatch(addBug(testBug));

        const state = store.getState().entities.bugs;
        expect(state.list).toContainEqual(testBug);
        expect(state.loading).toBe(false);
    });

    it('should handle caching in getBugs', async () => {
        const store = createTestStore();
        const mockBugs = [testBug];
        mockedAxios.request.mockResolvedValue({ data: mockBugs });

        // First call
        await store.dispatch(getBugs());
        // Second call within cache time
        await store.dispatch(getBugs());

        expect(mockedAxios.request).toHaveBeenCalledTimes(1);
        expect(store.getState().entities.bugs.list).toEqual(mockBugs);
    });

    it('should handle partial updates', async () => {
        const store = createTestStore();
        const initialBug = { ...testBug, resolved: false };
        const updatedBug = { ...testBug, resolved: true };

        // Add initial bug
        store.dispatch({ type: 'bugs/bugAdded', payload: { data: initialBug } });
        mockedAxios.request.mockResolvedValue({ data: updatedBug });

        await store.dispatch(updateBug({ id: '1', resolved: true }));

        const stateBug = store.getState().entities.bugs.list[0];
        expect(stateBug.resolved).toBe(true);
        expect(stateBug.description).toBe('Integration test bug');
    });
});