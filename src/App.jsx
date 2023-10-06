import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss'

import Head from './components/Head/Head';
import Todo from './pages/Todo/Todo';
import Weeks from './components/Weeks/Weeks';
import Home from './pages/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';


function App() {

	const [todosList, setTodosList] = useState([]);


	return (
		<main className='wrapper'>
			<Head />

			<Routes>
				<Route index element={<Home />} />
				<Route path='/Todo' element={<Todo />} />
			</Routes>
			<Sidebar />
		</main>
	)
}

export default App
