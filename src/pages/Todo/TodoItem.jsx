import React from 'react'
import TodoList from './TodoList';
import { useState, useEffect, useRef } from 'react';

export default function TodoItem({ cardIndex, changeCard, darkMode, cardId, editableName, name } = props) {
	const [newTodo, setNewTodo] = useState({
		text: '',
		editable: false,
	});
	const [todo, setTodo] = useState([]);
	const itemHeadRef = useRef();





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
		e.target.placeholder = 'What do you need to do?';
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


	let list = todo.map((item, index) => <TodoList
		key={index}
		id={index}
		task={item.text}
		changeTodo={changeTodo}
		editable={item.editable}

	/>);

	const [cardPosition, setCardPosition] = useState({
		canDrag: false,
		moved: false,
		startPosition: { x: 0, y: 0 },
		currentPosition: { x: 0, y: 0 },
		distance: { x: 0, y: 0 },
		active: false
	});


	function startDragging(e) {


		setCardPosition(prev => ({
			...prev,
			canDrag: true,
			startPosition: {
				x: e.clientX,
				y: e.clientY,
			},

		}))

	}

	function dragging(e) {
		if (cardPosition.canDrag) {
			setCardPosition(prev => ({
				...prev,
				currentPosition: {
					x: e.clientX - cardPosition.startPosition.x + prev.distance.x,
					y: e.clientY - cardPosition.startPosition.y + prev.distance.y,
				},
				active: true

			}))

		}
	}

	function stopDragging(e) {
		setCardPosition(prev => ({
			...prev,
			canDrag: false,
			distance: {
				x: cardPosition.currentPosition.x,
				y: cardPosition.currentPosition.y,
			},
			moved: true,

		}))
	}


	return (
		<div
			className={`todo__item ${darkMode ? 'isDark' : ""}`}
			onMouseMove={(e) => dragging(e)}
			onMouseUp={(e) => stopDragging(e)}
			onMouseDown={(e) => changeCard(e, "changeIndex", cardId)}
			style={{
				position: cardPosition.moved ? "absolute" : "relative",
				top: `${cardPosition.currentPosition.y}px`,
				left: `${cardPosition.currentPosition.x}px`,
				zIndex: cardIndex


			}}
		>
			<div
				className="todo__head"
				onMouseUp={(e) => stopDragging(e, "head")}
				onMouseDown={(e) => startDragging(e)}
				ref={itemHeadRef}

			>
				<span onClick={(e) => changeCard(e, "delete", cardId)} className='cross'></span>
			</div>

			<div className="todo__body">
				<form onSubmit={(e) => changeCard(e, "statusChange", cardId)} className={`todo__nameform ${editableName ? "edit" : ''}`} >
					{!editableName
						? <h2 className='todo__title'>
							<span>{name}</span>
							<span onClick={(e) => changeCard(e, "statusChange", cardId)} className="ico">
								<svg fill="white" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.7,5.2a1.024,1.024,0,0,1,0,1.448L18.074,9.276l-3.35-3.35L17.35,3.3a1.024,1.024,0,0,1,1.448,0Zm-4.166,5.614-3.35-3.35L4.675,15.975,3,21l5.025-1.675Z" /></svg>
							</span>
						</h2>
						: <input className="todo__edit" onChange={(e) => changeCard(e, "nameChange", cardId)} value={name} type="text" />}
				</form>
				<form
					action=""
					className="todo__form"
					onSubmit={(e) => addTodo(e)}
				>
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
