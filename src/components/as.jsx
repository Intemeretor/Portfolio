import React from 'react'

export default function as() {
	function makeRequest(location) {
		return new Promise((resolve, reject) => {
			console.log(`Connecting to ${location}, please wait`);
			if (location == 'Steam') {
				resolve('Gaben said hi');
			} else if (location.length > 0 && location == 'EGS') {
				resolve('duck you moron');
			} else {
				reject(`What are you want of ${location}, do something else`);
			}

		})
	}
	function moreInfo(response) {
		return new Promise((resolve, reject) => {
			console.log('There is more info:');
			resolve(`You really don't wanna play games. Espetially when they said to you '${response}'`);
		})
	}

	async function asFunct() {
		try {
			const response = await makeRequest('sad');
			console.log('responce recieved');
			const processed = await moreInfo(response);
			console.log(processed);
		} catch (err) {
			console.log(err);
		}

	}
	asFunct();
	return (
		<div>as</div>
	)
}
