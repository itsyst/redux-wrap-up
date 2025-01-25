import { configureStore, Middleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import bugsApi from "./middleware/bugs-api";
import usersApi from "./middleware/users-api";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                bugsApi as Middleware,
                usersApi as Middleware
            ),
    devTools: {
        trace: true
    }
});

export default store;
