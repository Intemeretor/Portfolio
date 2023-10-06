import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.scss'

export default function Sidebar() {
	return (
		<aside className="sidebar">
			<nav className="sidebar__body">
				<ul className="sidebar__list">
					<li><Link to={`/Todo`} className="sidebar__link">Todo</Link></li>
				</ul>
			</nav>
		</aside>
	)
}
