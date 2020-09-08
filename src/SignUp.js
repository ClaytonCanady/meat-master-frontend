import axios from 'axios';
import React, { useState, useEffect } from 'react';

function SignUp() {
    const [username, setUserName] = useState([]);
    const [password, setPassword] = useState([]);
     const handleChange = (e) => {
			
            };
             const handleSubmit = (e) => {

             };
    return (
			<div>
				<form onSubmit={handleSubmit}>
					<h4>Sign Up</h4>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						name='username'
						value={username}
						onChange={handleChange}
					/>
                    <br/>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleChange}
					/>
                    <br/>
					<input type='submit' />
				</form>
			</div>
		);
}

export default SignUp;