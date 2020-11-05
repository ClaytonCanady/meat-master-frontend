import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
function MyAccount() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = (recipe) => {
		axios
			.get(`https://meat-master-backend.herokuapp.com/recipes/${recipe}`, {
				headers: {
					authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
				},
			})
			.then((result) => {
				setName(result.data.name);
				setInstructions(result.data.instructions);
				setIngredients(result.data.ingredients);
				setDescription(result.data.description);
				setPhotoUrl(result.data.photo_url);
				setId(result.data.id);
			})
			.then(() => {
				setShow(true);
			});
	};
	const [data, setData] = useState([]);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [ingredients, setIngredients] = useState('');
	const [instructions, setInstructions] = useState('');
	const [photoUrl, setPhotoUrl] = useState('');
	const [id, setId] = useState('');
	const fetchData = async () => {
		const result = await axios(
			'https://meat-master-backend.herokuapp.com/recipes',
			{
				headers: {
					authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
				},
			}
		);
		setData(result.data);
	};
	const editRecipe = (e, recipe) => {
		e.preventDefault();
		axios
			.put(
				`https://meat-master-backend.herokuapp.com/recipes/${id}`,
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
			.then(() => {
				fetchData();
				window.location = '/my-account';
			});
	};
	useEffect(() => {
		fetchData();
	}, []);
	const deleteRecipe = (recipe) => {
		axios
			.delete(`https://meat-master-backend.herokuapp.com/recipes/${recipe}`, {
				headers: {
					authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
				},
			})
			.then(fetchData());
		window.location = '/my-account';
	};

	return (
		<div>
			<h3>my recipes</h3>

			<>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Recipe</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{' '}
						<form
							onSubmit={(e) =>
								editRecipe(e, {
									name: name,
									description: description,
									ingredients: ingredients,
									instructions: instructions,
									photoUrl: photoUrl,
								})
							}
							className='add-recipe'>
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
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</>

			<div className='container'>
				{data &&
					data.map((recipe) => {
						if (recipe.author === sessionStorage.getItem('username')) {
							return (
								<div key={recipe.id} className='recipe'>
									<img src={recipe.photo_url} alt='' />
									<Link to={/recipe/ + recipe.id} recipe={recipe.id}>
										<h4>{recipe.name}</h4>
									</Link>
									<button onClick={(e) => handleShow(recipe.id, e)}>
										edit
									</button>
									<button onClick={(e) => deleteRecipe(recipe.id, e)}>
										delete
									</button>
								</div>
							);
						}
					})}
			</div>
		</div>
	);
}
export default MyAccount;
