import { configureStore, Middleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import logger from "./middleware/logger";
import func from "./middleware/func";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(logger({destination: "Console"}) as Middleware, func as Middleware),
    devTools: {
        trace: true
    }
});
 
export default store;
