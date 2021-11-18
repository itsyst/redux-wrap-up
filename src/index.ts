import store from './store/store'
// import {
//     bugAdded,
//     bugResolved,
//     bugRemoved,
//     bugAssignedToUser,
//     unresolvedBugsSelector,
//     bugsByUserSelector,
//     structuredSelector
// } from './store/bugs';
// import { addUser } from './store/users';
// import { addProject } from './store/projects';
import { addBug, assignBugToUser, loadBugs, resolveBug } from './store/bugs';

// const unsubscribe = store.subscribe(() => {
//     console.log("Store changed!", store.getState());
// })

// store.dispatch(addUser({ name: "User 1" }));
// // store.dispatch(addUser({ name: "User 2" }));

// store.dispatch(bugAdded({ description: "Bug - 0001" }));
// store.dispatch(bugAdded({ description: "Bug - 0002" }));
// // store.dispatch(bugAdded({ description: "Bug - 0003" }));
// // store.dispatch(bugAdded({ description: "Bug - 0004" }));
// store.dispatch(bugResolved({ id: 2 }));
// // store.dispatch(bugRemoved({ id: 3 }));

// store.dispatch(addProject({ name: "Project1" }))

// store.dispatch(bugAssignedToUser({ bugId: 2, userId: 1 }));

// // Dispatch a function
// store.dispatch((dispatch, getState) => {
//     // Call an API
//     // When the promise is resolved => dispatch()
//     dispatch({ type: 'RECEIVED_BUG', bugs: [1, 2, 3] })
//     console.log(getState())
//     // if the promise is rejected => dispatch()
// });

// Dispatch a toast notification
// store.dispatch({
//     type: "error",
//     payload: { message: "An error occurred." }
// });


// const action = {
//     type: actions.apiCallBegan,
//     payload: {
//         url: '/bugs',
//         onSuccess: actions.apiCallSuccess,
//         onError: actions.apiCallFailed
//     }
// }

store.dispatch(loadBugs());
store.dispatch(addBug({ description: "New bug." }));

store.dispatch(resolveBug(2));

store.dispatch(assignBugToUser(4,1));
 

// Try to reload bugs - cache previous call
// setInterval(() => {
//     store.dispatch(loadBugs());
// }, 2000)

// unsubscribe();

// console.log(store.getState());
// console.log(unresolvedBugsSelector(store.getState()));
// console.log(structuredSelector(store.getState()));
// console.log(bugsByUserSelector(1)(store.getState()));


