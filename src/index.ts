import store from './store'

store.dispatch({
    type: "ADD_BUG",
    payload: {
        description: "Bug-001"
    }
})

store.dispatch({
    type: "REMOVE_BUG",
    payload: {
        id: 1
    }
})
console.log(store.getState());