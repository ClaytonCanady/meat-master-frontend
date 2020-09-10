import axios from 'axios';
import React, { useState } from 'react';
import {  Modal } from 'react-bootstrap';
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
				sessionStorage.setItem('access_token', response.data.access);
                sessionStorage.setItem('refresh_token', response.data.refresh);
                sessionStorage.setItem('username',  `${username}` );
			});;
	};
	return (
		<div>
			<Modal.Dialog>
				<Modal.Header>
					<Modal.Title>Log-In</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit}>
						
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

export default LogIn;