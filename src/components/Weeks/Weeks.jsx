import React from 'react';
import './Weeks.scss'
import Week from './Week';
import Todo from '../../pages/Todo/Todo';
import WeeksData from './WeeksData';


export default function Weeks() {
	const days = WeeksData.map((item, index) => <Week day={item.day} />)

	return (
		<section className="weeks">
			<div className="weeks__container container">
				<div className="weeks__row">
					{days}
				</div>
			</div>
		</section>
	)
}

