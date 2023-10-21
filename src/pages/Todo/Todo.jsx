
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
			cardIndex: 0,
			cardPosition: {
				canDrag: false,
				moved: false,
				startPosition: { x: 0, y: 0 },
				currentPosition: { x: 0, y: 0 },
				distance: { x: 0, y: 0 },
				active: false
			}
		}]);
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
					edited = { ...prev[i], cardIndex: prev.length + 100 };
					switch (changeType) {
						case "nameChange":
							edited = { ...prev[i], name: e.target.value };
							newArr.push(edited);
							break;
						case "statusChange":
							edited = { ...prev[i], editable: !prev[i].editable, };
							newArr.push(edited);
							break;
						case "changeIndex":
							edited = { ...prev[i], };
							newArr.push(edited);
							break;
						case "startDragging":
							edited = {
								...prev[i], cardPosition: {
									...prev[i].cardPosition,
									canDrag: true,
									startPosition: {
										x: e.clientX,
										y: e.clientY,
									},
								}
							};
							newArr.push(edited);
							break;
						case "dragging":
							if (prev[i].cardPosition.canDrag) {

								edited = {
									...prev[i], cardPosition: {
										...prev[i].cardPosition,
										currentPosition: {
											x: e.clientX - prev[i].cardPosition.startPosition.x + prev[i].cardPosition.distance.x,
											y: e.clientY - prev[i].cardPosition.startPosition.y + prev[i].cardPosition.distance.y,
										},
										active: true
									}
								}
								newArr.push(edited);
							} else { newArr.push({ ...prev[i] }); }
							break;
						case "stopDragging":
							edited = {
								...prev[i], cardPosition: {
									...prev[i].cardPosition,
									canDrag: false,
									distance: {
										x: prev[i].cardPosition.currentPosition.x,
										y: prev[i].cardPosition.currentPosition.y,
									},
									moved: true,
								}
							}
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
	//---------------------------------------------
	// const [cardPosition, setCardPosition] = useState({
	// 	canDrag: false,
	// 	moved: false,
	// 	startPosition: { x: 0, y: 0 },
	// 	currentPosition: { x: 0, y: 0 },
	// 	distance: { x: 0, y: 0 },
	// 	active: false
	// });
	//-----------------------------------------

	let cards = todoCards.map((item, index) => <TodoItem
		changeCard={changeCard}
		setTodoCards={setTodoCards}
		// deleteTodoCard={deleteTodoCard}
		card={item}
		// name={item.name} 
		// editableName={item.editable}
		darkMode={darkMode}
		cardId={index}
		key={index}
	// cardIndex={item.cardIndex}
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
