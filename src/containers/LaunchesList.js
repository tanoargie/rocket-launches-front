import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Launch from '../components/Launch';

const LaunchesList = () => {
	const [ allLaunches, setAllLaunches ] = useState([]);
	const [ filteredLaunches, setFilteredLaunches ] = useState([]);
	const [ search, setSearch ] = useState('');
	const allLaunchesURL = axios.get( 'https://api.spacexdata.com/v3/launches' );
	const rocketsURL = axios.get( 'https://api.spacexdata.com/v3/rockets' );
	useEffect(() => {
		Promise.all([allLaunchesURL, rocketsURL])
			.then(( [allLaunches, rockets] ) => {
				const allLaunchesSerialized = allLaunches.data.map(launch => ({
					flight_number: launch.flight_number,
					mission_name: launch.mission_name,
					launch_date_unix: launch.launch_date_unix,
					favourite: false,
					rocket: rockets.data.find(rocket => rocket.rocket_id === launch.rocket.rocket_id)
				}))
				setAllLaunches(allLaunchesSerialized);
				setFilteredLaunches(allLaunchesSerialized);
			})
	}, [])

	useEffect(() => {
		setFilteredLaunches(allLaunches.filter(launch => launch.mission_name.includes(search)));
	}, [ search ]);

	return (
		<div className="LaunchesList">
			<div>
				<input value={search} onChange={e => setSearch(e.target.value)} />
			</div>
			{filteredLaunches.map(launch => <Launch key={launch.flight_number + launch.mission_name} launch={launch}/>)}
		</div>
	)
};

export default LaunchesList;
