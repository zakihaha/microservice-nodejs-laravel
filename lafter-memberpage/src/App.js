import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux';
import courses from 'constants/api/courses';

import 'assets/css/style.css'

import MemberRoute from 'components/Routes/MemberRoute'
import GuestRoute from 'components/Routes/GuestRoute'
import { setAuthorizationHeader } from 'configs/axios'
import { populateProfile } from 'store/actions/users';
import users from 'constants/api/users';

import Login from 'pages/Login'
import Register from 'pages/Register';
import NotFound from 'pages/404'
import Unauthenticated from 'pages/401'
import MyClass from 'pages/MyClass'
import Joined from 'pages/Joined'
import DetailClass from 'pages/DetailClass'

function App() {
	const dispatch = useDispatch()
	const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

	useEffect(() => {
		let session = null
		if (localStorage.getItem('lafter:token')) {
			// session = JSON.parse(localStorage.getItem('lafter:token'))
			// console.log('token',session.token);
			setAuthorizationHeader(JSON.parse(localStorage['lafter:token']).token)

			users.details().then(detail => {
				dispatch(populateProfile(detail.data[0]))
			})
		}
	}, [dispatch])

	return (
		<>
			<Router history={history}>
				<Switch>
					<GuestRoute path='/login' component={Login}></GuestRoute>
					<GuestRoute path='/register' component={Register}></GuestRoute>
					<GuestRoute path='/private' component={Unauthenticated}></GuestRoute>

					<MemberRoute exact path='/' component={MyClass}></MemberRoute>
					<MemberRoute path='/joined/:class' component={Joined}></MemberRoute>
					<MemberRoute path='/courses/:class/:chapter/:uid' component={DetailClass}></MemberRoute>
					<MemberRoute path='/courses/:class/' component={DetailClass}></MemberRoute>

					<Route path="*" component={NotFound}></Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
