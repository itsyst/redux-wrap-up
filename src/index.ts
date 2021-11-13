import store from './store/store'
import * as actions from './store/bugs';
 
const unsubscribe = store.subscribe(() => {
    console.log("Store changed!", store.getState());
})

store.dispatch(actions.addBug({ description:"Bug - 0001"}) );
store.dispatch(actions.addBug({ description:"Bug - 0002"}) );
store.dispatch(actions.addBug({ description: "Bug - 0003" }));

store.dispatch(actions.resolveBug({id:1}));

//store.dispatch(actions.removeBug({ id: 1 }) );
 
unsubscribe();

console.log(store.getState());