import { useState } from 'react'
import './App.scss'

import Head from './components/Head/Head';
import Todo from './components/Todo/Todo';
import Weeks from './components/Weeks/Weeks';
function App() {

	return (
		<>
			<Head />
			<main className='wrapper'>
				{/* <Todo /> */}
				<Weeks />
			</main>

		</>

	)
}

export default App
