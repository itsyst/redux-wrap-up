import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import './App.css';
import BugList from './components/bugs/bugList';

function App() {
 	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};
 
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
