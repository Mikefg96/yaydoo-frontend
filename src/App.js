import React, { useState, useMemo } from "react";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import { UserContext } from './UserContext'

// Components
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'

// Screens
import LandingScreen from './screens/LandingScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import ProductsScreen from './screens/ProductsScreen'
import AdminScreen from './screens/AdminScreen'

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
						<Route path='/' exact component={LandingScreen}></Route>
						<Route path='/register' component={RegisterScreen}></Route>	
						<Route path='/login' component={LoginScreen}></Route>
						<ProtectedRoute path='/products' component={ProductsScreen} isAuth={user} accessLevel='seller'/>
						<ProtectedRoute path='/admin' component={AdminScreen} isAuth={user} accessLevel='admin'/>
					</main>
				</Container>
			</UserContext.Provider>
		</Router>
	);
}

export default App;