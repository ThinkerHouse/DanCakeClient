import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom'

import { connect } from 'react-redux'
import * as authActions from "../../../store/actions";

const Logout = (props) => {
	useEffect(() => {
		props.logOutHandler();
	}, []);

	return <Navigate to='/' />
}

const mapsDispatchToProp = dispatch => {
	return {
		logOutHandler: () => dispatch(authActions.authLogOut())
	}
}

export default connect(null, mapsDispatchToProp)(Logout)