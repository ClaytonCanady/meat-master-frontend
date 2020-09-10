import axios from 'axios';
import React, { useState, useEffect } from 'react';

function LogIn() {
	const [username, setUserName] = useState([]);
	const [password, setPassword] = useState([]);
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:8000/api/token/', {
				username: `${username}`,
				password: `${password}`,
			})
			.then((response) => {
				localStorage.setItem('access_token', response.data.access);
				localStorage.setItem('refresh_token', response.data.refresh);
			});;
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h4>Log-In</h4>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					name='username'
					value={username}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<br />
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<input type='submit' />
			</form>
		</div>
	);
}

export default LogIn;