import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import BugList from './components/bugList';
import { getBugs } from './store/entities/bugs';
import { getUsers } from './store/entities/users';
import store from './store/store';
import { LuMoon, LuSun } from 'react-icons/lu';

function App() {
	const dispatch = useDispatch();
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};
	useEffect(() => {
		store.dispatch(getBugs());
		store.dispatch(getUsers());
	}, [dispatch]);

	return (
		<div className={isDarkMode ? 'app-container dark-mode' : 'app-container'}>
			<div className="header d-flex justify-content-between align-items-center">
				<h1 className="text-uppercase mb-3">Bug Tracker</h1>
				<button
					onClick={toggleDarkMode}
					className={isDarkMode ? 'btn btn-light' : 'btn btn-dark'}
				>
					{isDarkMode ? <LuSun /> : <LuMoon />}
				</button>
			</div>
			<div className="bug-list-container">
				<BugList />
			</div>
		</div>
	);
}

export default App;
