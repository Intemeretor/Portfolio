import './Head.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Head() {
	const [hint, setHint] = useState({
		active: false,
		text: 'Тут ви можете подивитись дні тижня'
	})
	function showHint() {
		setHint(prev => ({ ...prev, active: true }))
	}
	function hideHint() {
		setHint(prev => ({ ...prev, active: false }))
	}
	return (

		<header className="header">
			<div className="header__container container">
				<nav className="header__navigation">
					<div className='header__homepage' ><Link className='header__link' to="/">VLPR</Link></div>
					<div className='header__projects'>
						<button className='header__button'>Projects</button>
					</div>

				</nav>

			</div>
		</header>

	)

}