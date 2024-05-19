import React from 'react';
import PublicRoute from './Public';
import PrivateRoute from './Private';

const AppRouter = ({ isAuthenticated }) => {
	return (
		<>
			{isAuthenticated ? <PrivateRoute /> : <PublicRoute />}
		</>
	);
};

export default AppRouter;
