
import React from 'react'
import './Todo.scss'
import TodoItem from './TodoItem';
import { useState, useEffect } from 'react';

export default function Todo({ darkMode } = props) {


	const [todoCards, setTodoCards] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(`todoCards`));
		setTodoCards(data || []); // Встановлюємо пустий масив, якщо дані відсутні
	}, []);
	useEffect(() => {
		localStorage.setItem(`todoCards`, JSON.stringify(todoCards));

	}, [todoCards]);

	function createTodoCard() {
		setTodoCards(prev => [...prev, { active: false, }]);
	}
	//

	let cards = todoCards.map((item, index) => <TodoItem active={item.active} darkMode={darkMode} cardId={index} key={index} />)
	return (

		<section className='todo'>
			<div className="todo__container container">
				<div className="todo__control">
					<button onClick={createTodoCard} className="todo__control-button">Create card</button>
					<button className="todo__control-button">Find card</button>
					<button className="todo__control-button">Hide cards</button>
				</div>

				<div className="todo__row">
					{cards ? cards : ''}
				</div>

			</div>
		</section>
	)
}
