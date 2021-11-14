import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import logger from './middleware/logger';
import toast from './middleware/toast';
import api from './middleware/api';


// Middleware without redux toolkit
// const store = createStore({ reducer, applyMiddleware(logger) });

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger({ destination: "dev" }), toast,api),
    devTools: process.env.NODE_ENV !== 'production'
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reducer>;


// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;