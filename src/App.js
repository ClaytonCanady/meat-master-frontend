import React from 'react';
import './App.css';
import { Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Link } from 'react-router-dom';
import Home from './Home'
import RecipeList from './RecipeList'

import SingleRecipe from './SingleRecipe'
function App() {
  return (
		<div className='App'>
			<header>
				<h1>Meat Master</h1>
				<Nav variant='tabs'>
					<Link to='/'>
						<Button variant='dark'>Home</Button>
					</Link>
					<Link to='/recipe-list'>
						<Button variant='dark'>Recipes</Button>
					</Link>
				</Nav>
			</header>
			<main>
				<Route path='/' exact component={Home} />
				<Route
					path='/recipe-list'
					render={() => {
						return <RecipeList return />;
					}}
				/>

				<Route
					path='/recipe/:recipeID'
					render={(routerProps) => {
						return <SingleRecipe match={routerProps.match} return />;
					}}
				/>
			</main>
		</div>
	);
}

export default App;
