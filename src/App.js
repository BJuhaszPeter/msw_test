import { setupWorker } from 'msw';
import React, { useEffect, useState } from 'react';
import './App.css';

if (process.env.NODE_ENV === 'development') {
	const { handlers } = require('./handlers');
	const worker = setupWorker(...handlers);
	worker.start();
	worker.printHandlers();
}

const fetchUser = async () => {
	const response = await fetch('http://localhost:8080/api/user');
	if (!response.ok) {
		throw Error('some useful message');
	}
	console.log('response', response.json());
	return response.json();
};

const App = () => {
	const [username, setUsername] = useState(null);
	const [status, setStatus] = useState('loading');

	useEffect(() => {
		fetchUser()
			.then((user) => {
				setUsername(user.username);
				setStatus('success');
			})
			.catch(() => setStatus('error'));
	}, []);

	if (status === 'loading')
		return (
			<div className='App'>
				<p>Loading ...</p>
			</div>
		);
	if (status === 'error')
		return (
			<div className='App'>
				<h2>Error fetching user</h2>
			</div>
		);

	return (
		<div className='App'>
			<h1>Welcome, {username}.</h1>
		</div>
	);
};

export default App;
