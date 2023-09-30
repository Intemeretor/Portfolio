export default function TodoList({ id, task, dlt, editable, edit, changeEditable } = props) {

	return (
		<li className={`todo__element ${editable ? 'edit' : ''}`}>
			<div className="todo__line">
				{editable
					? <input className="todo__edit" onChange={(e) => edit(e, id)} value={task} type="text" />
					: <div className="todo__task"><p>{task}</p></div>}
			</div>

			<div className="todo__btns">
				<button onClick={() => changeEditable(id)} className="edit-btn todo__btn"><span>EDIT</span></button>
				<button onClick={() => dlt(id)} className="alarm-btn todo__btn"><span></span></button>
			</div>

		</li>
	)
}
