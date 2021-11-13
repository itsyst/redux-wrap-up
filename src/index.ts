import store from './store/store'
import { addBug, resolveBug, removeBug, unresolvedBugsSelector } from './store/bugs';
import { addProject } from './store/projects';

const unsubscribe = store.subscribe(() => {
    console.log("Store changed!", store.getState());
})

store.dispatch(addBug({ description: "Bug - 0001" }));
store.dispatch(addBug({ description: "Bug - 0002" }));
store.dispatch(addBug({ description: "Bug - 0003" }));
store.dispatch(addBug({ description: "Bug - 0004" }));
store.dispatch(resolveBug({ id: 1 }));
//store.dispatch(actions.removeBug({ id: 3 }));
store.dispatch(addProject({ name: "Project1" }))

unsubscribe();

console.log(store.getState());
console.log(unresolvedBugsSelector(store.getState()));