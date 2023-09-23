import './Head.scss';
import { useState } from 'react';

export default function Head() {
	const [hint, setHint] = useState({
		active: true,
		text: 'Тут ви можете подивитись дні тижня'
	})
	function showHint() {
		setHint(prev => ({ ...prev, active: true }))
	}
	function hideHint() {
		setHint(prev => ({ ...prev, active: false }))
	}
	return (
		<>
			<header className="header">
				<div className="header__container container">
					<nav className="header__navigation">
						<ul className="header__list">
							<li className='header__link' onMouseEnter={showHint} onMouseLeave={hideHint}>
								<a href="">Week</a>
							</li>

						</ul>
					</nav>

				</div>
			</header>
			<div className={`hint ${hint.active && 'active'}`}>
				<p>{hint.text}</p>
			</div>
		</>
	)

}