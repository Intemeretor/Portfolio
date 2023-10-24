
import React from 'react'
import './Todo.scss'
import TodoItem from './TodoItem';
import { useState, useEffect, } from 'react';

export default function Todo({ darkMode } = props) {


	const [todoCards, setTodoCards] = useState([]);
	const [currentCard, setCurrentCard] = useState(-1);
	const [cardCounter, setCardCounter] = useState(0);
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(`todoCards`));
		setTodoCards(data || []);
	}, []);
	useEffect(() => {
		localStorage.setItem(`todoCards`, JSON.stringify(todoCards));

	}, [todoCards]);


	function createTodoCard() {
		setTodoCards(prev => [...prev, {
			name: `New card ${cardCounter}`,
			cardId: cardCounter,
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
		setCardCounter(prev => prev + 1);
	}


	function changeCard(e, changeType, id) {
		e.preventDefault();

		setTodoCards(prev => {
			let newArr = [];
			for (let i = 0; i < prev.length; i++) {
				if (i != id) {
					if (changeType == "dragging") {
						newArr.push(prev[i]);
					} else {
						newArr.push({ ...prev[i], cardIndex: prev[i].cardIndex != 0 ? prev[i].cardIndex - 1 : prev[i].cardIndex });
					}


				}
				else {
					let edited;
					switch (changeType) {
						case "nameChange":
							edited = { ...prev[i], name: e.target.value, };
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
							setCurrentCard(id);
							console.log(e.target.getBoundingClientRect().top);
							console.log(e.clientY);
							edited = {
								...prev[i],
								cardIndex: 100,
								cardPosition: {
									...prev[i].cardPosition,
									canDrag: true,
									startPosition: {
										x: e.clientX,
										y: e.clientY,
									},

									distance: {
										x: e.target.getBoundingClientRect().left,
										y: e.target.getBoundingClientRect().top,
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
											y: e.clientY - prev[i].cardPosition.startPosition.y + prev[i].cardPosition.distance.y + window.scrollY,
										},
										active: true,
										moved: true
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

								}
							}
							newArr.push(edited);
							setCurrentCard(prev => -1);
							break;
						case "delete":
							break;
					}

				}
			}
			return newArr
		})

	};


	let cards = todoCards.map((item, index) => <TodoItem
		changeCard={changeCard}
		setTodoCards={setTodoCards}
		card={item}
		darkMode={darkMode}
		cardId={index}
		key={index}
	/>);




	// При видаленні здвиг усіх елементів нагору якщо релатів
	// При переміщенні елементів елемент здвигається нагору на начальну позицію флекс елементу якщо абсолют
	return (

		<section className='todo'
			onMouseMove={(e) => changeCard(e, "dragging", currentCard)}
			onMouseUp={(e) => changeCard(e, "stopDragging", currentCard)}
		>
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
