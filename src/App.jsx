import { useState } from 'react'
import './App.scss'

import Head from './components/Head/Head';
import Todo from './components/Todo/Todo';
import Weeks from './components/Weeks/Weeks';


function App() {

	const [todosList, setTodosList] = useState([]);


	return (
		<main className='wrapper'>
			<Head />


			<Todo />
			{/* <Weeks /> */}
		</main>
	)
}

export default App
