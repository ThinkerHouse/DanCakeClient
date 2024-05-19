import React, { useEffect } from "react";
import { connect } from "react-redux";

import AppRouter from "./router/AppRouter";

import * as authActions from "./store/actions/";
import './App.css';
import { isTokenValid } from "./services/checkTokenValidity";
import { useNavigate } from "react-router-dom";

const App = (props) => {
	const navigate = useNavigate()

	useEffect(() => {
		props.checkAuthStatus();
		if(isTokenValid === false){
			localStorage.removeItem('token');
			localStorage.removeItem('userData');
  			navigate('/login');
		}
	}, [props.isAuth]);

	return <AppRouter isAuthenticated={props.isAuth}/>
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuthenticated,
		userData: state.auth.userData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		checkAuthStatus: () => dispatch(authActions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
