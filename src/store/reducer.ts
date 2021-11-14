import { combineReducers } from "redux";
import {entitiesReducer} from './entities';


export default combineReducers({
    entities: entitiesReducer
});

export type CombineReducers = typeof combineReducers



