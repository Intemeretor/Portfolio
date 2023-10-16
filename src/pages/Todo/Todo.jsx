
import React from 'react'
import './Todo.scss'
import TodoItem from './TodoItem';

export default function Todo({ darkMode } = props) {


	return (

		<section className='todo'>
			<div className="todo__container container">
				<TodoItem darkMode={darkMode} />
			</div>
		</section>
	)
}
