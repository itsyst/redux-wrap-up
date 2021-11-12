import store from './store/store'
import { addBug, removeBug, resolveBug } from './store/bugs';


const unsubscribe = store.subscribe(() => {
    console.log("Store changed!", store.getState());
})

store.dispatch(addBug("Bug - 0001"));
store.dispatch(addBug("Bug - 0002"));
store.dispatch(addBug("Bug - 0003"));
store.dispatch(resolveBug(1));
store.dispatch(removeBug(1));

unsubscribe();

console.log(store.getState());