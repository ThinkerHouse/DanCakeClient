import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../containers/common/Login/Login';

const PublicRoute = (props) => {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default PublicRoute;
