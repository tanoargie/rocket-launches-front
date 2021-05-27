import './App.css';
import LaunchesList from './containers/LaunchesList';
import LaunchDetail from './containers/LaunchDetail';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
	  <Router>
	  	<Switch>
	  		<Route exact path="/list">
      				<LaunchesList />
	  		</Route>
	  		<Route exact path="/list/:flight_number/:mission_name">
      				<LaunchDetail />
	  		</Route>
	  	</Switch>
	  </Router>
    </div>
  );
}

export default App;
