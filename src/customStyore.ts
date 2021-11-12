import {reducer} from "./reducer";

function createStore(reducer: any) {
    let state: Object;
    let listeners: any[] = [];

    function subscribe(listener: any) {
        listeners.push(listener);
    }

    function dispatch(action: any) {
        state = reducer(state, action);

        for (let i = 0; i < listeners.length; i++) listeners[i]();
    }

    function getState() {
        return state;
    }

    return {
        subscribe,
        dispatch,
        getState
    };
}

export default createStore(reducer);
