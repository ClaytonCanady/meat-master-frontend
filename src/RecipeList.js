import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
function RecipeList(props) {
	const [data, setData] = useState([]);
	const [name, setName] = useState([]);
	const [description, setDescription] = useState('');
	const [ingredients, setIngredients] = useState('');
	const [instructions, setInstructions] = useState('');
	const [photoUrl, setPhotoUrl] = useState('');
	const fetchData = async () => {
		const result = await axios('http://localhost:8000/recipes', {
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
			},
		});
		setData(result.data);
	};
	const addRecipe = (e) => {
		e.preventDefault();
		axios
			.post(
				'http://localhost:8000/recipes',
				{
					name: `${name}`,
					description: `${description}`,
					ingredients: `${ingredients}`,
					instructions: `${instructions}`,
					photo_url: `${photoUrl}`,
					author: `${sessionStorage.getItem(`username`)}`
				},
				{
					headers: {
						authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
					},
				}
			)
			.then(fetchData());
		setDescription('');
		setIngredients('');
		setInstructions('');
		setPhotoUrl('');
		setName('');
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className='container'>
			{data &&
				data.map((recipe) => (
					<div key={recipe.id} className='recipe'>
						<img src={recipe.photo_url} alt='' />
						<Link to={/recipe/ + recipe.id} recipe={recipe.id}>
							<h4>{recipe.name}</h4>
						</Link>
						<p>{recipe.description}</p>
					</div>
				))}
			<div className='recipe-form'>
				<Modal.Dialog>
					<Modal.Header>
						<Modal.Title>Add a New Recipe</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form onSubmit={addRecipe}>
							<label htmlFor='name'>Name</label>
							<input
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<br />
							<label htmlFor='description'>Description</label>
							<input
								type='text'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<br />
							<label htmlFor='ingredients'>Ingredients</label>
							<input
								type='text'
								value={ingredients}
								onChange={(e) => setIngredients(e.target.value)}
							/>
							<br />
							<label htmlFor='instructions'>Instructions</label>
							<input
								type='text'
								value={instructions}
								onChange={(e) => setInstructions(e.target.value)}
							/>
							<br />
							<label htmlFor='photoUrl'>Photo-url</label>
							<input
								type='text'
								value={photoUrl}
								onChange={(e) => setPhotoUrl(e.target.value)}
							/>
							<br />
							<input type='submit' />
						</form>
					</Modal.Body>
				</Modal.Dialog>
			</div>
		</div>
	);
}

export default RecipeList;
