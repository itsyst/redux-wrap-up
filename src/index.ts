import store from './store'
import * as actions from './actionTypes';

const unsubscribe = store.subscribe(() => {
    console.log("Store changed!", store.getState());
})

store.dispatch({
    type: actions.ADD_BUG,
    payload: {
        description: "Bug-001"
    }
})

unsubscribe();

store.dispatch({
    type: actions.REMOVE_BUG,
    payload: {
        id: 1
    }
})
console.log(store.getState());