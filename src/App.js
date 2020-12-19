import React, { useState, useMemo } from "react";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import { UserContext } from './UserContext'
import Header from './components/Header'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'

const App = () => {
	const [user, setUser] = useState(null);
	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  	return (
		<Router>
			<UserContext.Provider value={value}>
				<Header />
				<Container fluid id='screen-container'>
					<main>
						<ToastContainer />
						{/* <Route path='/' exact component={LandingScreen}></Route> */}
						<Route path='/register' component={RegisterScreen}></Route>	
						<Route path='/login' component={LoginScreen}></Route>
					</main>
				</Container>
			</UserContext.Provider>
		</Router>
	);
}

export default App;