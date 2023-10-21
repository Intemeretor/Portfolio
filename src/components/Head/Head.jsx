import './Head.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Head({ sidebarHandler, darkMode, setDarkMode } = props) {
	function changeMode() {
		setDarkMode(prev => !prev);
	}

	return (

		<header className={`header ${darkMode ? "isDark" : ""}`}>
			<div className="header__container container">
				<nav className="header__navigation">
					<div className='header__homepage' >
						<Link className='header__link' to="/Portfolio/">VLPR</Link>

					</div>
					<div onClick={changeMode} className="header__darkmode darkmode" >
						<button className="darkmode__button">
							<span className='darkmode__indicator'></span>
						</button>
					</div>
					<div className='header__projects'>
						<button className='header__button' onClick={sidebarHandler}>Projects</button>
					</div>

				</nav>

			</div>
		</header>

	)

}