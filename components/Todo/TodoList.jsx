export default function TodoList({ id, task, dlt } = props) {
	return (
		<li>
			<div className="todo__task"><p>{task}</p></div>
			<div className="todo__btns">
				<button className="edit-btn todo__btn"><span>edit </span></button>
				<button onClick={() => dlt(id)} className="alarm-btn todo__btn"><span></span></button>
			</div>

		</li>
	)
}
