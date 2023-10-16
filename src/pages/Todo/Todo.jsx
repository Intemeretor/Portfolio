
import React from 'react'
import './Todo.scss'
import TodoItem from './TodoItem';
import { useState } from 'react';

export default function Todo({ darkMode } = props) {


	const [todoCards, setTodoCards] = useState([]);

	function createTodoCard() {
		setTodoCards(prev => [...prev, <TodoItem darkMode={darkMode} cardId={todoCards.length + 1} />])
	}
	// const cards = todoCards.map((item,index) => item)
	return (

		<section className='todo'>
			<div className="todo__container container">
				<div className="todo__control">
					<button onClick={createTodoCard} className="todo__control-button">Create card</button>
					<button onClick={createTodoCard} className="todo__control-button">Find card</button>

				</div>

				<div className="todo__row">
					{todoCards}
				</div>

			</div>
		</section>
	)
}
