import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from '../containers/admin/Dashboard/Dashboard';
import Logout from '../containers/common/Logout/Logout';
import Roles from '../containers/admin/Roles';
import Users from '../containers/admin/Users';
import Vendors from '../containers/admin/Vendors';
import Departments from '../containers/admin/Departments';
import Materials from '../containers/admin/Materials';
import MaterialType from '../containers/admin/MaterialType';
import Units from '../containers/admin/Units';
import CheckList from '../containers/admin/CheckList';
import WareHouse from '../containers/admin/Warehouse';
import ProductionPlant from '../containers/admin/ProductionPlant';
import PurchaseOrder from '../containers/admin/PurchaseOrder';
import Products from '../containers/admin/Products';
import Production from '../containers/admin/Production';
import Requisitions from '../containers/admin/Requisitions';
import ReceivedOrders from '../containers/admin/ReceivedOrders';

const PrivateRoute = ({ userData }) => {
	if (!userData) {
		return <Navigate to={'/'} />;
	}


	const routes = [
		{ path: '/dashboard', element: <Dashboard /> },

		{ path: '/user-management/departments', element: <Departments /> },
		{ path: '/user-management/roles', element: <Roles /> },
		{ path: '/user-management/users', element: <Users /> },
		{ path: '/user-management/vendors', element: <Vendors /> },

		{ path: '/material-management/materials', element: <Materials /> },
		{ path: '/material-management/material-type', element: <MaterialType /> },

		{ path: '/requisitions-management/requisitions', element: <Requisitions /> },

		{ path: '/order-management/purchase-orders', element: <PurchaseOrder /> },
		{ path: '/order-management/received-orders', element: <ReceivedOrders /> },


		{ path: '/productions-management/productions', element: <Production /> },
		{ path: '/productions-management/production-plant', element: <ProductionPlant /> },


		{ path: '/product-management/products', element: <Products /> },

		{ path: '/settings/units', element: <Units /> },
		{ path: '/settings/checklist', element: <CheckList /> },
		{ path: '/settings/warehouse', element: <WareHouse /> },

		{ path: '/logout', element: <Logout /> },
		{ path: '*', element: <Navigate to="/dashboard" replace /> },
	];

	return (
		<Routes>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} element={route.element} />
			))}
		</Routes>
	);
};

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

export default connect(mapStateToProps, null)(PrivateRoute);
