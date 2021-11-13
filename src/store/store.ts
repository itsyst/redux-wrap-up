import { configureStore } from '@reduxjs/toolkit';
import createReducer  from './bugs';


const store = configureStore({ reducer: createReducer });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;