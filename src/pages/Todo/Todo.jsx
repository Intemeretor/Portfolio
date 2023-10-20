
import React from 'react'
import './Todo.scss'
import TodoItem from './TodoItem';
import { useState, useEffect } from 'react';

export default function Todo({ darkMode } = props) {


	const [todoCards, setTodoCards] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(`todoCards`));
		setTodoCards(data || []);
	}, []);
	useEffect(() => {
		localStorage.setItem(`todoCards`, JSON.stringify(todoCards));

	}, [todoCards]);

	function createTodoCard() {
		setTodoCards(prev => [...prev, {
			name: 'New card',
			editable: false,
			cardIndex: 0
		}]);
	}

	function deleteTodoCard(id) {

		setTodoCards(prev => {
			let newArr = [];
			for (let i = 0; i < prev.length; i++) {
				if (i != id) {
					newArr.push(prev[i]);
				}
			}
			return newArr
		})
	}
	function changeCard(e, changeType, id) {
		e.preventDefault();

		setTodoCards(prev => {
			let newArr = [];
			for (let i = 0; i < prev.length; i++) {
				if (i != id) {

					newArr.push({ ...prev[i], cardIndex: prev[i].cardIndex != 0 ? prev[i].cardIndex - 1 : prev[i].cardIndex });
					// newArr.push(prev[i]);
				}
				else {
					let edited;
					switch (changeType) {
						case "nameChange":
							edited = { ...prev[i], name: e.target.value };
							newArr.push(edited);
							break;
						case "statusChange":
							edited = { ...prev[i], editable: !prev[i].editable };
							newArr.push(edited);
							break;
						case "changeIndex":
							edited = { ...prev[i], cardIndex: prev.length + 100 };
							newArr.push(edited);
							break;
						case "delete":
							break;
					}

				}
			}
			return newArr
		})

	}
	//

	let cards = todoCards.map((item, index) => <TodoItem
		changeCard={changeCard}
		deleteTodoCard={deleteTodoCard}
		name={item.name} editableName={item.editable}
		darkMode={darkMode}
		cardId={index}
		key={index}
		cardIndex={item.cardIndex}
	/>)


	return (

		<section className='todo'>
			<div className="todo__container container">
				<div className="todo__control">
					<button onClick={createTodoCard} className="todo__control-button">Create card</button>
					<button className="todo__control-button">Find card</button>
					<button className="todo__control-button">Hide cards</button>
				</div>

				<div className="todo__row">
					{cards}
				</div>

			</div>
		</section>
	)
}
