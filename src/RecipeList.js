import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function RecipeList(props) {
	const [data, setData] = useState([]);
	const [name, setName] = useState([]);
	const [description, setDescription] = useState('');
	const [ingredients, setIngredients] = useState('');
	const [instructions, setInstructions] = useState('');
	const [photoUrl, setPhotoUrl] = useState('');
	const fetchData = async () => {
		const result = await axios('http://localhost:8000/recipes');
		setData(result.data);
	};
		const addRecipe = (e) => {
			
			e.preventDefault();
			axios
				.post('http://localhost:8000/recipes', {
					name: `${name}`,
					description: `${description}`,
					ingredients: `${ingredients}`,
					instructions: `${instructions}`,
					photo_url: `${photoUrl}`,
				})
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
			<form onSubmit={addRecipe}>
				<label htmlFor='name'>name</label>
				<input
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor='description'>description</label>
				<input
					type='text'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<label htmlFor='ingredients'>ingredients</label>
				<input
					type='text'
					value={ingredients}
					onChange={(e) => setIngredients(e.target.value)}
				/>
				<label htmlFor='instructions'>instructions</label>
				<input
					type='text'
					value={instructions}
					onChange={(e) => setInstructions(e.target.value)}
				/>
				<label htmlFor='photoUrl'>photo url</label>
				<input
					type='text'
					value={photoUrl}
					onChange={(e) => setPhotoUrl(e.target.value)}
				/>
				<input type='submit' />
			</form>
		</div>
	);
}

export default RecipeList;
