import { combineReducers } from "@reduxjs/toolkit";
import bugsReducer from './entities/bugs';
import projectsReducer from './entities/projects';
import usersReducer from './entities/users';
import loadingReducer from "./ui/loading";
import notificationsReducer from "./ui/notifications";
import modalReducer from "./ui/modal";

export default combineReducers({
    entities: combineReducers({
        bugs: bugsReducer,
        projects: projectsReducer,
        users: usersReducer
    }),
    ui: combineReducers({
        loading: loadingReducer,
        modal: modalReducer,
        notifications: notificationsReducer
    })
})

