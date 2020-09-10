import axios from 'axios';
import React, { useState, useEffect } from 'react';

function SignUp() {
	const [username, setUserName] = useState([]);
	const [password, setPassword] = useState([]);
	const [email, setEmail] = useState([]);
	const axios = require('axios');
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:8000/users/register', {
				email: `${email}`,
				username: `${username}`,
				password: `${password}`,
			})
			.then(() => {
				axios
					.post('http://localhost:8000/api/token/', {
						username: `${username}`,
						password: `${password}`,
					})
					.then((response) => {
						localStorage.setItem('access_token', response.data.access);
						localStorage.setItem('refresh_token', response.data.refresh);
					});
			});
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h4>Sign Up</h4>
				<label htmlFor='email'>email</label>
				<input
					type='text'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />
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

export default SignUp;
