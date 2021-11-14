import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import logger  from './middleware/logger'


// Middleware without redux toolkit
// const store = createStore({ reducer, applyMiddleware(logger) });

const store = configureStore(
    {
        reducer: reducer,
        middleware: [logger({destination: "dev"})],
    },
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reducer>;
 

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;