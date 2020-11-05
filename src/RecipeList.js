import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
function RecipeList(props) {
	const [data, setData] = useState([]);
	const [name, setName] = useState([]);
	const [description, setDescription] = useState('');
	const [ingredients, setIngredients] = useState('');
	const [instructions, setInstructions] = useState('');
	const [photoUrl, setPhotoUrl] = useState('');
	const [show, setShow] = useState(false);
	const hide = () => {
		setShow(false);
	};
	const fetchData = () => {
		axios
			.get('https://meat-master-backend.herokuapp.com/recipes', {
				headers: {
					authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
				},
			})
			.then((result) => setData(result.data));
	};
	const addRecipe = (e) => {
		e.preventDefault();
		axios
			.post(
				'https://meat-master-backend.herokuapp.com/recipes',
				{
					name: `${name}`,
					description: `${description}`,
					ingredients: `${ingredients}`,
					instructions: `${instructions}`,
					photo_url: `${photoUrl}`,
					author: `${sessionStorage.getItem(`username`)}`,
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
		<div>
			<div className='container'>
				{data &&
					data.map((recipe) => (
						<div key={recipe.id} className='recipe'>
							<Link to={/recipe/ + recipe.id} recipe={recipe.id}>
								<img src={recipe.photo_url} alt='' />
								<h4 className='text-dark'>{recipe.name}</h4>
							</Link>
						</div>
					))}
			</div>

			{show ? (
				<div className='recipe-form'>
					<Modal.Dialog>
						<Modal.Header>
							<Modal.Title>
								Add a New Recipe <Button onClick={hide}>close</Button>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<form onSubmit={addRecipe} className='add-recipe'>
								<label htmlFor='name'>Name</label>
								<br />
								<textarea
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<br />
								<label htmlFor='description'>Description</label>
								<br />
								<textarea
									type='text'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
								<br />
								<label htmlFor='ingredients'>Ingredients</label>
								<br />
								<textarea
									type='text'
									value={ingredients}
									onChange={(e) => setIngredients(e.target.value)}
								/>
								<br />
								<label htmlFor='instructions'>Instructions</label>
								<br />
								<textarea
									type='text'
									value={instructions}
									onChange={(e) => setInstructions(e.target.value)}
								/>
								<br />
								<label htmlFor='photoUrl'>Photo-url</label>
								<br />
								<textarea
									type='text'
									value={photoUrl}
									onChange={(e) => setPhotoUrl(e.target.value)}
								/>
								<br />
								<br />
								<input type='submit' />
							</form>
						</Modal.Body>
					</Modal.Dialog>
				</div>
			) : (
				<div class='border border-light p-3 mb-4'>
					<div class='text-center'>
						<button type='button' class='btn btn-primary' onClick={setShow}>
							Add a Recipe
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default RecipeList;
