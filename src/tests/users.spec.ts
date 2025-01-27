// users.test.ts
import { apiCallStarted } from "../store/constants/api-users-constants";
import { getUsers } from "../store/entities/users";
import store from "../store/store";

jest.mock("../store/utils/cache", () => ({
    cachedAPIRequest: jest.fn((...args) => {
        const callback = args[4];
        return callback(); // Returns the action
    })
}));

describe('usersSlice', () => {
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