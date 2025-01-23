import './App.css';
import {
	bugAdd,
	bugRemove,
	bugResolve,
	bugAssignedUser,
	BugState,
	memorizedBugsSelector,
	unresolvedBugsSelector,
	memorizedBugsByUserSelector
} from './store/entities/bugs';
import { projectAdd, projectRemove } from './store/entities/projects';
import { userAdd } from './store/entities/users';
import store from './store/store';
import { loadingStatus } from './store/ui/loading';
import { modalClose, modalOpen } from './store/ui/modal';
import { notificationAdd } from './store/ui/notifications';

const unsubscribe = store.subscribe(() => {
	console.log('Store changed!', store.getState());
});

// Dispatch actions for testing
store.dispatch(userAdd({ name: 'Joe Doe' }));
store.dispatch(userAdd({ name: 'Jonny Donny' }));
store.dispatch(loadingStatus(true)); // Update loading state globally
store.dispatch(bugAdd({ description: 'Bug 1' }));
store.dispatch(bugAssignedUser({ id: 1, userId: 1 }));
store.dispatch(modalOpen({ type: 'login', props: { username: 'JoeDoe' } }));
store.dispatch(notificationAdd({ message: 'Bug 1 Added.' }));
store.dispatch(modalClose());
store.dispatch(bugAdd({ description: 'Bug 2' }));
store.dispatch(bugAssignedUser({ id: 2, userId: 1 }));
store.dispatch(notificationAdd({ message: 'Bug 2 Added.' }));
store.dispatch(bugAdd({ description: 'Bug 3' }));
store.dispatch(bugAssignedUser({ id: 3, userId: 2 }));
store.dispatch(notificationAdd({ message: 'Bug 3 Added.' }));
store.dispatch(bugResolve({ id: 1 }));
store.dispatch(bugRemove({ id: 2 }));
store.dispatch(notificationAdd({ message: 'Bug 2 Removed.' }));
store.dispatch(projectAdd({ title: 'Title 1' }));
store.dispatch(notificationAdd({ message: 'Project 1 Added.' }));
store.dispatch(projectRemove({ id: 1 }));
store.dispatch(notificationAdd({ message: 'Project 1 Removed.' }));
store.dispatch(loadingStatus(false)); // End global loading state

store.dispatch((dispatch, getState) => {
	dispatch({ type: 'bugAdd', bugs: [1, 2, 3] });
	console.log("Func: ", getState());
});

unsubscribe(); // Stop subscription when not needed

console.log('Final State:', store.getState());

const unresolvedBugsX = unresolvedBugsSelector(
	store.getState() as unknown as BugState
);
const unresolvedBugsY = unresolvedBugsSelector(
	store.getState() as unknown as BugState
);
const unresolvedBugsMemorizedX = memorizedBugsSelector(store.getState());
const unresolvedBugsMemorizedY = memorizedBugsSelector(store.getState());

console.log(
	'Memorized: ',
	unresolvedBugsMemorizedX === unresolvedBugsMemorizedY
);
console.log('Derived: ', unresolvedBugsX === unresolvedBugsY); // Same array

const memorizedBugsByUser = memorizedBugsByUserSelector(1)(store.getState());
console.log('Bugs-User: ', memorizedBugsByUser);

function App() {
	return <div>Hello!</div>;
}

export default App;
