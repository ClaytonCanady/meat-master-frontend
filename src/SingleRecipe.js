import axios from 'axios';
import React, { useState, useEffect } from 'react';
function SingleRecipe(props) {
	const [data, setData] = useState([]);
	
	const fetchData = async () => {
		const result = await axios(
			`http://localhost:8000/recipes/${props.match.params.recipeID}`
		);
		setData(result.data);
	};
	useEffect(() => {
		fetchData();
	});
	return (
		<div className='recipe'>
			<h3>{data.name}</h3>
			<img src={data.photo_url} alt='' />
			<p>{data.description}</p>

			<h4>Ingredients</h4>
			<p>{data.ingredients}</p>
			<h4>Instructions</h4>
			<p>{data.instructions}</p>
		</div>
	);
}

export default SingleRecipe;
