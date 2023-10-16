import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss'

import Head from './components/Head/Head';
import Todo from './pages/Todo/Todo';
import Weeks from './components/Weeks/Weeks';
import Home from './pages/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';


function App() {

	const [sideActive, setSideActive] = useState(false);
	const [darkMode, setDarkMode] = useState(true);
	function sidebarHandler() {
		setSideActive(prev => !prev);
	}

	return (
		<main className={`wrapper 
		${darkMode ? 'isDark' : ''}  
		${sideActive ? 'scrollable' : ''}`}
		>

			<Head setDarkMode={setDarkMode} sidebarHandler={sidebarHandler} darkMode={darkMode} />
			<Routes>
				<Route path='/Portfolio' element={<Home />} />
				<Route path='/Portfolio/Todo' element={<Todo darkMode={darkMode} />} />
			</Routes>

			<Sidebar sidebarHandler={sidebarHandler} sideActive={sideActive} />
		</main>
	)
}

export default App
