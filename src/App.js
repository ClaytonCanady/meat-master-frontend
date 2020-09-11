import React from 'react';
import './App.css';
import { Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Link } from 'react-router-dom';
import Home from './Home'
import RecipeList from './RecipeList'
import Timer from './Timer'
import SignUp from './SignUp'
import LogIn from './LogIn'
import MyAccount from './MyAccount'

import SingleRecipe from './SingleRecipe'

function App() {
	function logOut() {
		sessionStorage.removeItem('access_token');
		sessionStorage.removeItem('refresh_token');
		sessionStorage.removeItem('username');
		window.location = '/';
	}
	const navBar = () => {
		if (sessionStorage.access_token) {
			return (
				<div>
					<Link to='/'>
						<Button variant='dark'>Home</Button>
					</Link>
					<Link to='/recipe-list'>
						<Button variant='dark'>Recipes</Button>
					</Link>
					<Link to='/my-account'>
						<Button variant='dark'>My-Account</Button>
					</Link>
					<Button variant='dark' onClick={logOut}>
						Log-out
					</Button>
				</div>
			);
		} else {
			return (
				<div>
					<Link to='/'>
						<Button variant='dark'>Home</Button>
					</Link>
					<Link to='/recipe-list'>
						<Button variant='dark'>Recipes</Button>
					</Link>
					<Link to='/signUp'>
						<Button variant='dark'>Sign Up</Button>
					</Link>
					<Link to='/logIn'>
						<Button variant='dark'>Log In</Button>
					</Link>
				</div>
			);
		}
	}

  return (
		<div className='App'>
			<header>
				<h1>Meat Master</h1>
				<Nav variant='tabs'>{navBar()}</Nav>
			</header>
			<main>
				<Route path='/' exact component={Home} />
				<Route path='/timer' component={Timer} />
				<Route path='/signUp' component={SignUp} />
				<Route path='/logIn' component={LogIn} />
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
				<Route
					path='/my-account'
					render={() => {
						return <MyAccount return />;
					}}
				/>
			</main>
		</div>
	);
}

export default App;
