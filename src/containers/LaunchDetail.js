import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const LaunchDetail = () => {
	const history = useHistory();
	const [ isFavourite, setIsFavourite ] = useState(false);
	const [ launch, setLaunch ] = useState(null);
	const { flight_number } = useParams();

	useEffect(() => {
		axios.get('https://api.spacexdata.com/v3/launches/' + flight_number)
			.then((response) => {
				setLaunch(response.data)
				if (localStorage.getItem('favourites').includes(response.data.flight_number)) {
					setIsFavourite(true);
				}
			})
	}, []);

	const addFavourite = ( flight_number ) => {
		const favourites = localStorage.getItem('favourites') || [];
		localStorage.setItem('favourites', [...favourites, flight_number]);
		setIsFavourite(true);
	}

	return (
		<div>
		{!!launch 
			? 
			<div>
				<button onClick={() => history.push('/list')}>Go back to list</button>
				{ !isFavourite ? <button onClick={() => addFavourite(launch.flight_number)}>Add to favourite</button> : 'It is favourite'}
				<div>
					<p>{launch.mission_name}</p>
					<img src={launch.links.flickr_images && launch.links.flickr_images.length > 0 ? launch.links.flickr_images[0] : 'https://cotizarobra.com/assets/app/img/types/default.jpg'} alt={launch.mission_name} width="500" height="500"/>
					<p>{launch.details}</p>
				</div>
			</div> 
			: 
			<p>Loading</p>
		}
		</div>
	)
}

export default LaunchDetail;
