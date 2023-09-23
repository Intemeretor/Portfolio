
import React from 'react'
import TodoList from './TodoList';
import './Todo.scss'
import { useState } from 'react';
import Head
	from '../Head/Head';
export default function Todo(props) {
	const [newTodo, setNewTodo] = useState('');
	const [todos, setTodos] = useState([]);

	function newTodoHandler(e) {
		setNewTodo(prev => e.target.value);
	}
	function hidePlaceholder(e) {
		e.target.placeholder = '';
	}
	function showPlaceholder(e) {
		e.target.placeholder = 'What do you need to do?';
	}
	function addTodo(e) {
		e.preventDefault();
		if (newTodo.length > 0) {
			setTodos(prev => ([...prev, newTodo]));
			setNewTodo('');
		}
	}
	function deleteTodo(id) {
		setTodos(prev => {
			let newArr = [];
			for (let i = 0; i < prev.length; i++) {
				if (i != id) {
					newArr.push(prev[i]);
				}
			}
			return newArr
		})
	}

	let list = todos.map((item, index) => <TodoList
		key={index}
		id={index}
		task={item}
		dlt={deleteTodo}
	/>);
	return (

		<section className='todo'>
			<h2 className='todo__title'>{props.day}</h2>
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
						value={newTodo}
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
