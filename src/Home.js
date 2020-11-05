import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import grilling from './images/grilling.jpg';
import sauce from './images/sauce.jpg';
import smoker from './images/smoker.jpg';
function Home(props) {
	return (
		<div className='home'>
			<h1 className='py-3'>Welcome to the Home of BBQ!</h1>
			<div className='carousel'>
				<Carousel>
					<Carousel.Item>
						<img className='d-block w-100' src={grilling} alt='First slide' />
						<Carousel.Caption>
							<h3 className='text-body'>Login to check out the recipes tab</h3>
							<p></p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className='d-block w-100' src={sauce} alt='Second slide' />

						<Carousel.Caption>
							<h3>Sauce is King</h3>
							<p></p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className='d-block w-100' src={smoker} alt='Third slide' />

						<Carousel.Caption>
							<h3>Nothing like a smoker</h3>
							<p></p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</div>
			<h3 className='pt-3'>A little About Us</h3>
			<p>
				Here at Meat Master we are passionate about bbq and everything that goes
				with it. From cold beer beside the charcoal grill you picked up for the
				beach, all the way to the 200 gallon whole hog roaster you built in the
				back yard.
			</p>
		</div>
	);
}

export default Home;
