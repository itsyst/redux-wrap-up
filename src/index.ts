import store from './store'

const unsubscribe = store.subscribe(() => {
    console.log("Store changed!", store.getState());
})

store.dispatch({
    type: "ADD_BUG",
    payload: {
        description: "Bug-001"
    }
})

unsubscribe();

store.dispatch({
    type: "REMOVE_BUG",
    payload: {
        id: 1
    }
})
console.log(store.getState());