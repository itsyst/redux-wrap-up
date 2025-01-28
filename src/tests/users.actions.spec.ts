// users.test.ts
import { apiCallStarted } from "../store/constants/api-users-constants";
import * as actionCreators from "../store/entities/users";
import { getUsers, UserState } from "../store/entities/users";
import store from "../store/store";
import { cachedAPIRequest } from "../store/utils/cache";

const { usersRequested, usersReceived, usersRequestFailed } = actionCreators.slice.actions;

jest.mock('../store/utils/cache');

describe('users actions', () => {
    describe('getUsers', () => {
        it('should use cache when valid', () => {
            const dispatch = jest.fn();
            const getState = () => ({
                entities: {
                    users: {
                        lastFetch: Date.now() - 9 * 60 * 1000 // 9 minutes old
                    }
                }
            }) as UserState;

            getUsers()(dispatch, getState);
            expect(cachedAPIRequest).toHaveBeenCalled();
        });

        it('should make API call when cache expires', async () => {
            const dispatch = jest.fn();
            const getState = () => ({
                entities: {
                    users: {
                        lastFetch: Date.now() - 11 * 60 * 1000 // 11 minutes old
                    }
                }
            }) as UserState;

            // Mock cachedAPIRequest to immediately execute callback
            (cachedAPIRequest as jest.Mock).mockImplementation(
                (_key, _time, _dispatch, _getState, callback) => callback()
            );

            await getUsers()(dispatch, getState);
             
            expect(dispatch).toHaveBeenCalledWith(
                apiCallStarted({
                    url: '/users',
                    method: 'get',
                    onStart: usersRequested.type,
                    onSuccess: usersReceived.type,
                    onError: usersRequestFailed.type
                })
            );
        });


        it('should handle API failure', async () => {
            const dispatch = jest.fn();
            const getState = () => ({ entities: { users: { lastFetch: 0 } } }) as UserState;

            const thunk = getUsers();
            await thunk(dispatch, getState);

            const mockCachedAPIRequest = cachedAPIRequest as jest.Mock;
            const callback = mockCachedAPIRequest.mock.calls[0][4];
            const result = callback();

            await result.catch(() => {
                expect(dispatch).toHaveBeenCalledWith(usersRequestFailed());
            });
        });
    });

    describe("action creators", () => {
        it("Verify that the getUsers action creator properly dispatches the correct API call initialization action.", async () => {
            const result = await store.dispatch(getUsers());

            const expected = {
                type: apiCallStarted.type,
                payload: {
                    url: "/users",
                    method: "get",
                    onStart: "users/usersRequested",
                    onSuccess: "users/usersReceived",
                    onError: "users/usersRequestFailed"
                }
            };

            expect(result).toEqual(expected);
        });
    });
});