
import React from 'react'
import TodoList from './TodoList';
import './Todo.scss'
import { useState, useEffect } from 'react';

export default function Todo(props) {

	const [newTodo, setNewTodo] = useState({
		text: '',
		editable: false
	});
	const [todo, setTodo] = useState([]);

	useEffect(() => {
		const data = localStorage.getItem('todos');

		if (data) {
			setTodo(JSON.parse(data));

		}
	}, []);
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todo));
	}, [todo])



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
				editable: false
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
		console.log(e);
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

		<section className='todo'>

			<div className="todo__container container">
				<h2 className='todo__title'>{`Todo #1`}</h2>
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
		</section>
	)
}
