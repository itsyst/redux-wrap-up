import{ useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getBugs } from './store/entities/bugs';
import store from './store/store';
import BugAdd from './components/bugAdd';
import BugList from './components/bugList';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		store.dispatch(getBugs());
	}, [dispatch]);

	return (
		<div className="container mt-4">
			<h1 className="text-uppercase mb-3">Bug Tracker</h1>
			<BugAdd />
			<BugList />
		</div>
	);
}

export default App;
