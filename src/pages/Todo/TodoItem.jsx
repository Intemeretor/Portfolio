import React from 'react'
import TodoList from './TodoList';
import { useState, useEffect, useRef } from 'react';

export default function TodoItem({ card, cardIndex, changeCard, darkMode, cardId, editableName, name } = props) {
	const [newTodo, setNewTodo] = useState({
		text: '',
		editable: false,
	});
	const [todo, setTodo] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(`todos${cardId}`));
		setTodo(data || []);
	}, []);
	useEffect(() => {
		localStorage.setItem(`todos${cardId}`, JSON.stringify(todo));
	}, [todo]);




	function newTodoHandler(e) {
		setNewTodo(prev => ({ ...prev, text: e.target.value }));
	}
	function hidePlaceholder(e) {
		e.target.placeholder = '';
	}
	function showPlaceholder(e) {
		e.target.placeholder = 'Todo?';
	}
	function addTodo(e) {
		e.preventDefault();
		if (newTodo.text.length > 0) {
			setTodo(prev => ([...prev, newTodo]));
			setNewTodo({
				text: '',
				editable: false,
			});
		}
	}

	function changeTodo(e, changeType, id) {
		e.preventDefault();

		setTodo(prev => {
			let newArr = [];
			for (let i = 0; i < prev.length; i++) {
				if (i != id) {
					newArr.push(prev[i]);
				}
				else {
					let edited;
					switch (changeType) {
						case "textChange":
							edited = { ...prev[i], text: e.target.value };
							newArr.push(edited);
							break;
						case "statusChange":
							edited = { ...prev[i], editable: !prev[i].editable };
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



	// const [cardPosition, setCardPosition] = useState({
	// 	canDrag: false,
	// 	moved: false,
	// 	startPosition: { x: 0, y: 0 },
	// 	currentPosition: { x: 0, y: 0 },
	// 	distance: { x: 0, y: 0 },
	// 	active: false
	// });


	// function startDragging(e) {
	// 	setCardPosition(prev => ({
	// 		...prev,
	// 		canDrag: true,
	// 		startPosition: {
	// 			x: e.clientX,
	// 			y: e.clientY,
	// 		},
	// 	}))
	// 	changeCard(e, "changeIndex", cardId);
	// }

	// function dragging(e) {
	// 	if (card.cardPosition.canDrag) {
	// 		setCardPosition(prev => ({
	// 			...prev,
	// 			currentPosition: {
	// 				x: e.clientX - card.cardPosition.startPosition.x + prev.distance.x,
	// 				y: e.clientY - card.cardPosition.startPosition.y + prev.distance.y,
	// 			},
	// 			active: true

	// 		}))

	// 	}
	// }

	// function stopDragging(e) {
	// 	setCardPosition(prev => ({
	// 		...prev,
	// 		canDrag: false,
	// 		distance: {
	// 			x: card.cardPosition.currentPosition.x,
	// 			y: card.cardPosition.currentPosition.y,
	// 		},
	// 		moved: true,

	// 	}))
	// }


	let list = todo.map((item, index) => <TodoList
		key={index}
		id={index}
		task={item.text}
		changeTodo={changeTodo}
		editable={item.editable}

	/>);
	return (
		<div
			className={`todo__item ${darkMode ? 'isDark' : ""}`}
			onMouseMove={(e) => changeCard(e, "dragging", cardId)}
			onMouseUp={(e) => changeCard(e, "stopDragging", cardId)}
			style={{
				position: card.cardPosition.moved ? "absolute" : "relative",
				top: `${card.cardPosition.currentPosition.y}px`,
				left: `${card.cardPosition.currentPosition.x}px`,
				zIndex: card.cardIndex
			}}>

			<div
				className="todo__head"
				onMouseUp={(e) => changeCard(e, "stopDragging", cardId)}
				onMouseDown={(e) => changeCard(e, "startDragging", cardId)}

			>
				<span onClick={(e) => changeCard(e, "delete", cardId)} className='cross'></span>
			</div>

			<div className="todo__body">
				<form
					onSubmit={(e) => changeCard(e, "statusChange", cardId)}
					className={`todo__nameform ${card.editable ? "edit" : ''}`} >
					{!card.editable
						? <h2 className='todo__title'>
							<span>{card.name}</span>
							<span onClick={(e) => changeCard(e, "statusChange", cardId)} className="ico">
								<svg fill="white" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.7,5.2a1.024,1.024,0,0,1,0,1.448L18.074,9.276l-3.35-3.35L17.35,3.3a1.024,1.024,0,0,1,1.448,0Zm-4.166,5.614-3.35-3.35L4.675,15.975,3,21l5.025-1.675Z" /></svg>
							</span>
						</h2>
						: <input
							className="todo__edit"
							onChange={(e) => changeCard(e, "nameChange", cardId)}
							value={card.name}
							type="text" />}
				</form>
				<form
					action=""
					className="todo__form"
					onSubmit={(e) => addTodo(e)}>

					<input
						onFocus={(e) => hidePlaceholder(e)}
						onBlur={(e) => showPlaceholder(e)}
						placeholder='Todo?'
						onChange={(e) => newTodoHandler(e)}
						className='todo__input'
						type="text"
						value={newTodo.text}
					/>
					<button className="todo__button"><span>Add</span></button>
				</form>
				<ul className="todo__list">
					{list}
				</ul>
			</div>

		</div>
	)
}
