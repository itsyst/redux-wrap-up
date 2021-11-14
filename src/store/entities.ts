import { combineReducers } from "redux";
import projectsReducer from './projects';
import bugsReducer from './bugs';
import usersReducer from './users';

 
export const entitiesReducer = combineReducers({
    bugs: bugsReducer,
    projects: projectsReducer,
    users: usersReducer
})

export type entityReducer = ReturnType<typeof entitiesReducer>
