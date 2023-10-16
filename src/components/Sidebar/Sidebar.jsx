import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.scss'

export default function Sidebar({ sideActive, sidebarHandler } = props) {
	return (
		<aside className={`sidebar ${sideActive ? "active" : ""}`}>
			<div className="sidebar__head">
				<span onClick={sidebarHandler} className='cross'></span>
			</div>

			<nav className="sidebar__body">
				<ul className="sidebar__list">
					<li><Link to={`Portfolio/Todo`} className="sidebar__link">Todo</Link></li>


				</ul>
			</nav>
		</aside>
	)
}
