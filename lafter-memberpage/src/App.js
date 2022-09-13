import React from 'react';
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from "react-router-dom";

import 'assets/css/style.css'

import MemberRoute from 'components/Routes/MemberRoute'
import GuestRoute from 'components/Routes/GuestRoute'

import Login from 'pages/Login'
import Register from 'pages/Register';
import NotFound from 'pages/404'
import Unauthenticated from 'pages/401'
import MyClass from 'pages/MyClass'

function App() {
	const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

	return (
		<>
			<Router history={history}>
				<Switch>
					<GuestRoute path='/login' component={Login}></GuestRoute>
					<GuestRoute path='/register' component={Register}></GuestRoute>
					<GuestRoute path='/private' component={Unauthenticated}></GuestRoute>
					<MemberRoute exact path='/' component={MyClass}></MemberRoute>
					<Route path="*" component={NotFound}></Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
