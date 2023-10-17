export default function TodoList({ changeTodo, id, task, editable } = props) {

	return (
		<li className={`todo__element ${editable ? 'edit' : ''}`}>
			<form className="todo__line" onSubmit={(e) => changeTodo(e, "statusChange", id)}>
				{editable
					? <input className="todo__edit" onChange={(e) => changeTodo(e, "textChange", id)} value={task} type="text" />
					: <div className="todo__task"><p>{task}</p></div>}
			</form>

			<div className="todo__btns">
				<button onClick={(e) => changeTodo(e, "statusChange", id)} className="edit-btn todo__btn"><span>EDIT</span></button>
				<button onClick={(e) => changeTodo(e, "delete", id)} className="alarm-btn todo__btn"><span></span></button>
			</div>

		</li>
	)
}
