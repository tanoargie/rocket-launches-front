import { Link } from 'react-router-dom';

const Launch = ({ launch }) => {
	return (
		<Link to={ "/list/" + launch.flight_number + '/' + launch.mission_name }>
			<p>Launch #{launch.flight_number}</p>
			<p>{launch.mission_name}</p>
		</Link>
	);
}

export default Launch;
