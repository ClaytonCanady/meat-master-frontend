
import React, { useState } from 'react';
import {  Modal } from 'react-bootstrap';
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
						sessionStorage.setItem('access_token', response.data.access);
						sessionStorage.setItem('refresh_token', response.data.refresh);
						sessionStorage.setItem('username', `${username}`);
					});
			});
	};
	return (
		<div>
			<Modal.Dialog>
				<Modal.Header>
					<Modal.Title>Sign-Up</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit}>
						<label htmlFor='email'>Email</label>
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
				</Modal.Body>
			</Modal.Dialog>
		</div>
	);
}

export default SignUp;
