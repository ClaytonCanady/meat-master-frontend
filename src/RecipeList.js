import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function RecipeList(props) {
	const [data, setData] = useState([]);
	const fetchData = async () => {
		const result = await axios('http://localhost:8000/recipes');
		setData(result.data);
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
		</div>
	);
}

export default RecipeList;
