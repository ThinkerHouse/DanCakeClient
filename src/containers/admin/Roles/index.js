import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';


import Layout from '../../../components/admin/Layout/Base/Layout';
import RoleForm from './RoleForm';
import RoleTable from '../../../components/admin/Table/Table';
import { fetchRolesList, createRoles, fetchRolesSingle, updateRoles, fetchPermissionsList } from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';


const Roles = (props) => {
	const { loading, error, success, rolesList, permissionsList, fetchRolesList, createRoles, fetchRolesSingle, singleRole, updateRoles, fetchPermissionsList } = props;

	const [showTable, setShowTable] = useState(false);
	const [buttonLabel, setButtonLabel] = useState('Add');
	const [editingId, setEditingId] = useState(null);
	const [isDisable, setIsDisable] = useState(false)
	let [selectedOptions, setSelectedOptions] = useState([])
	const [page, setPage] = useState(1)

	let queryParam = { name: '' }
	const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchRolesList, page, queryParam);
	useToastMessages(success, error, fetchRolesList, page, setShowTable, setButtonLabel);

	const fetchData = async () => {
		await Promise.all([
			fetchRolesList(page),
			fetchPermissionsList()
		]);
	};

	useEffect(() => {
		setShowTable(true)
	}, [rolesList])

	useEffect(() => {
		fetchData()
	}, [fetchRolesList, page, fetchPermissionsList]);

	const handleEditDelete = (id, action) => {
		setSelectedOptions([])
		setEditingId(id)
		setShowTable(false)
		setButtonLabel('List')
		fetchRolesSingle(id)
		
		if (action === 'edit') {
			setIsDisable(false)
		} else if (action === 'view') {
			setIsDisable(true)
		}
	};

	const handleButtonClick = () => {
		setShowTable(!showTable);
		setButtonLabel(showTable ? 'List' : 'Add');
		setEditingId(null)
		setSelectedOptions([])
	};

	const onPageChange = (page) => {
		setPage(page)
	};

	const onSubmit = (values) => {
		let permissinIdArr = selectedOptions?.map((item) => item?.value)
		const finalValues = {
			...values,
			permissions: permissinIdArr,
		};

		if (editingId) {
			updateRoles(editingId, finalValues)
		} else {
			createRoles(finalValues);
		}
	};

	const columns = [
		{
			name: 'Id',
			selector: (row, index) => (page - 1) * 10 + index + 1,
			sortable: true
		},
		{
			name: 'Name',
			selector: row => row.name,
			sortable: true
		},
		{
			name: 'Actions',
			selector: (row) => (
				<ActionButton
					row={row}
					onEdit={id => handleEditDelete(id, 'edit')}
					showDeleteButton={false}
					onView={id => handleEditDelete(id, 'view')}
				/>
			),
			sortable: false
		},
	];

	const searchFields = [
		{ name: 'name', label: 'Name', type: 'text' }
	];

	const renderContent = () => {
		if (loading) {
			return <Loader />
		}

		if (showTable && !loading) {
			return <RoleTable
				defaultPage={page}
				columns={columns}
				data={rolesList.data === undefined ? [] : rolesList.data}
				totalCount={rolesList?.pagination?.count}
				handlePageChange={onPageChange}
				searchFields={searchFields}
				handleFieldSearch={handleFieldSearch}
				handleFilterClick={handleFilterClick}
				handleClearSearch={handleClearSearch}
				searchParam={searchParam}
			/>
		}

		if (editingId && !loading) {
			return <RoleForm
				onSubmit={onSubmit}
				initialValues={singleRole}
				onCancel={handleButtonClick}
				disableCheck={isDisable}
				permissions={permissionsList}
				setSelectedOptions={setSelectedOptions}
				selectedOptions={selectedOptions} />;
		}

		if (!loading) {
			return <RoleForm
				onSubmit={onSubmit}
				onCancel={handleButtonClick}
				permissions={permissionsList}
				setSelectedOptions={setSelectedOptions}
				selectedOptions={selectedOptions} />;
		}

	};

	return (
		<Layout title="Roles" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
			{renderContent()}
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.roles.loading,
		error: state.roles.error,
		success: state.roles.success,
		rolesList: state.roles.rolesList,
		permissionsList: state.permissions.permissionsList,
		singleRole: state.roles.singleRole
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchRolesList: (page, search) => dispatch(fetchRolesList(page, search)),
		createRoles: (data) => dispatch(createRoles(data)),
		// deleteBrand: (id) => dispatch(deleteBrand(id)),
		fetchRolesSingle: (id) => dispatch(fetchRolesSingle(id)),
		updateRoles: (id, data) => dispatch(updateRoles(id, data)),
		fetchPermissionsList: () => dispatch(fetchPermissionsList())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
