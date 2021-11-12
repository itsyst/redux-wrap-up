import store from './store'
import { addBug, removeBug} from './actionCreators';


// const unsubscribe = store.subscribe(() => {
//     console.log("Store changed!", store.getState());
// })

store.dispatch(addBug("Bug - 0001"));

//unsubscribe();

//store.dispatch(removeBug(1));

console.log(store.getState());