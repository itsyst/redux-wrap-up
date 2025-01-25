import { combineReducers } from "@reduxjs/toolkit";
import bugsReducer from './entities/bugs';
import usersReducer from './entities/users';

export default combineReducers({
    entities: combineReducers({
        bugs: bugsReducer,
        users: usersReducer
    })
})

