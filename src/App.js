import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Header from './components/Header'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'

const App = () => {
  return (
		<Router>
			<Header />
			<Container fluid id='screen-container'>
				<main>
					<ToastContainer />
{/* 					<Route path='/' component={LandingScreen} exact></Route> */}
					<Route path='/register' component={RegisterScreen}></Route>
					<Route path='/login' component={LoginScreen}></Route>
				</main>
			</Container>
		</Router>
	);
}

export default App;