import React from 'react'
import TodoList from './TodoList';
import { useState, useEffect } from 'react';

export default function TodoItem({ changeCard, darkMode, cardId, editableName, name } = props) {
	const [newTodo, setNewTodo] = useState({
		text: '',
		editable: false,
	});
	const [todo, setTodo] = useState([]);




	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(`todos${cardId}`));
		setTodo(data || []); // Встановлюємо пустий масив, якщо дані відсутні
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
	function deleteTodo(id) {
		setTodo(prev => {
			let newArr = [];
			for (let i = 0; i < prev.length; i++) {
				if (i != id) {
					newArr.push(prev[i]);
				}
			}
			return newArr
		})
	}
	function editTodo(e, id) {
		setTodo(prev => {
			let newArr = [];
			for (let i = 0; i < prev.length; i++) {
				if (i != id) {
					newArr.push(prev[i]);
				} else {
					prev[i] = { ...prev[i], text: e.target.value }
					newArr.push(prev[i]);
				}
			}
			return newArr
		})
	}
	function changeEditableStatus(id) {

		setTodo(prev => {

			let newArr = [];
			for (let i = 0; i < prev.length; i++) {
				if (i != id) {
					newArr.push(prev[i]);
				} else {
					let changed = { ...prev[i], editable: !prev[i].editable }
					newArr.push(changed);
				}
			}
			return newArr
		})
	}
	function changeNameEditableStatus(e, id) {
		e.preventDefault();
		setTodoCards(prev => (
			{ ...prev, editable: !prev.editable }
		))
	}
	function changeCardName(e) {
		setCardOptions(prev => (
			{ ...prev, name: e.target.value }
		))
	}
	let list = todo.map((item, index) => <TodoList
		key={index}
		id={index}
		task={item.text}
		dlt={deleteTodo}
		edit={editTodo}
		editable={item.editable}
		changeEditable={changeEditableStatus}
	/>);

	return (
		<div className={`todo__item ${darkMode ? 'isDark' : ""}`}>
			<form onSubmit={(e) => changeCard(e, "statusChange", cardId)} className="todo__head">
				{!editableName
					? <h2 className='todo__title'>
						<span>{name}</span>
						<span onClick={(e) => changeCard(e, "statusChange", cardId)} className="ico">
							<svg fill="#000000" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.7,5.2a1.024,1.024,0,0,1,0,1.448L18.074,9.276l-3.35-3.35L17.35,3.3a1.024,1.024,0,0,1,1.448,0Zm-4.166,5.614-3.35-3.35L4.675,15.975,3,21l5.025-1.675Z" /></svg>
						</span>
					</h2>
					: <input className="todo__edit" onChange={(e) => changeCard(e, "nameChange", cardId)} value={name} type="text" />}


				<span onClick={(e) => changeCard(e, "delete", cardId)} className='cross'></span>
			</form>
			<div className="todo__body">
				<form
					action=""
					className="todo__form"
					onSubmit={(e) => addTodo(e)}
				>
					<input
						onFocus={(e) => hidePlaceholder(e)}
						onBlur={(e) => showPlaceholder(e)}
						placeholder='What do you need to do?'
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
