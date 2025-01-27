import { apiCallStarted } from '../store/constants/api-bugs-constants';
import { addBug, BugState, getBugs, removeBug, updateBug } from '../store/entities/bugs';
import { cachedAPIRequest } from '../store/utils/cache';

jest.mock('../store/utils/cache');

describe('bugs action creators - thunks (async actions)', () => {
    describe('addBug', () => {
        it('dispatches apiCallStarted with correct parameters', () => {
            const mockBug = { id: '1', description: 'Test bug' };
            const dispatch = jest.fn();
            const thunk = addBug(mockBug);
            thunk(dispatch);

            expect(dispatch).toHaveBeenCalledWith(
                apiCallStarted({
                    url: '/bugs',
                    method: 'post',
                    data: mockBug,
                    onStart: "bugs/bugsRequested",
                    onSuccess: "bugs/bugAdded",
                    onError: "bugs/bugsRequestFailed",
                })
            );
        });
    });

    describe('updateBug', () => {
        it('dispatches apiCallStarted with correct parameters', () => {
            const mockBug = { id: '1', resolved: true };
            const dispatch = jest.fn();
            const thunk = updateBug(mockBug);
            thunk(dispatch);

            expect(dispatch).toHaveBeenCalledWith(
                apiCallStarted({
                    url: '/bugs/1',
                    method: 'patch',
                    data: mockBug,
                    onStart: "bugs/bugsRequested",
                    onSuccess: "bugs/bugResolved",
                    onError: "bugs/bugsRequestFailed",
                })
            );
        });
    });

    describe('removeBug', () => {
        it('dispatches apiCallStarted with correct parameters', () => {
            const id = '1';
            const dispatch = jest.fn();
            const thunk = removeBug(id);
            thunk(dispatch);

            expect(dispatch).toHaveBeenCalledWith(
                apiCallStarted({
                    url: `/bugs/${id}`,
                    method: 'delete',
                    data: id,
                    onStart: "bugs/bugsRequested",
                    onSuccess: "bugs/bugRemoved",
                    onError: "bugs/bugsRequestFailed",

                })
            );
        });
    });

    describe('getBugs', () => {
        it('calls cachedAPIRequest and dispatches apiCallStarted on cache miss', () => {
            const dispatch = jest.fn();
            const getState = () => ({
                entities: {
                    bugs: {
                        lastFetch: 0,
                    },
                },
            }) as BugState;

            const thunk = getBugs();
            thunk(dispatch, getState);

            expect(cachedAPIRequest).toHaveBeenCalledWith(
                'bugs',
                10,
                dispatch,
                getState,
                expect.any(Function)
            );

            const mockCachedAPIRequest = cachedAPIRequest as jest.Mock;
            const callback = mockCachedAPIRequest.mock.calls[0][4];
            callback();

            expect(dispatch).toHaveBeenCalledWith(
                apiCallStarted({
                    url: '/bugs',
                    method: 'get',
                    onStart: "bugs/bugsRequested",
                    onSuccess: "bugs/bugsReceived",
                    onError: "bugs/bugsRequestFailed",
                })
            );
        });
    });
});

