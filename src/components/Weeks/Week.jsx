import React from 'react';
import Todo from '../../pages/Todo/Todo';


function Week(props) {

	return (
		<div className='weeks__week week'>
			<div className="week__body">
				<Todo day={props.day} />
			</div>
		</div>
	)
}

export default Week