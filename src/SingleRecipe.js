import axios from 'axios';
import React, { useState, useEffect } from 'react';
function SingleRecipe(props) {
	const [data, setData] = useState([]);

	const fetchData = () => {
		axios
			.get(
				`https://meat-master-backend.herokuapp.com/recipes/${props.match.params.recipeID}`,
				{
					headers: {
						authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
					},
				}
			)
			.then((result) => setData(result.data));
	};
	useEffect(() => {
		fetchData();
	});
	return (
		<div className='recipe'>
			<h3 className='pt-3'>{data.name}</h3>
			<img src={data.photo_url} alt='' className='pt-3' />
			<p className='pt-3'>{data.description}</p>

			<h4 className='pt-3'>Ingredients</h4>
			<p>{data.ingredients}</p>
			<h4 className='pt-3'>Instructions</h4>
			<p>{data.instructions}</p>
			<h4 className='pt-3'>Author</h4>
			<p>{data.author}</p>
		</div>
	);
}

export default SingleRecipe;
