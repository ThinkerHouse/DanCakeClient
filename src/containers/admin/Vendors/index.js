import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';

import UserForm from './UserForm';

import UsersTable from '../../../components/admin/Table/Table';
import { fetchRolesList, fetchUserList, createUser, fetchUserSingle, updateUser } from '../../../store/actions';

import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import { activeStatusOptions } from '../../../constants';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';
import { buildQueryString } from '../../../helper/buildQueryString';


const Users = (props) => {
	const { loading, error, success, userList, rolesList, fetchRolesList, fetchUserList, createUser, fetchUserSingle, singleUser, updateUser } = props;

	const [showTable, setShowTable] = useState(false);
	const [buttonLabel, setButtonLabel] = useState('Add');
	const [editingId, setEditingId] = useState(null);
	const [isDisable, setIsDisable] = useState(false)
	let [selectedOptions, setSelectedOptions] = useState([])
	const [page, setPage] = useState(1);

	let queryParam = { username: '', email: '', user_type: 'vendor', status: '' }
	const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchUserList, page, queryParam);
	useToastMessages(success, error, fetchUserList, page, setShowTable, setButtonLabel, buildQueryString(queryParam));

	const fetchData = async () => {
		await Promise.all([
			fetchUserList(page, buildQueryString(queryParam)),
			fetchRolesList('', '', true)
		]);
	};

	useEffect(() => {
		setShowTable(true)
	}, [userList])

	useEffect(() => {
		fetchData()
	}, [fetchUserList, page]);

	const handleEditDelete = (id, action) => {
		setSelectedOptions([])
		setEditingId(id)
		setShowTable(false)
		setButtonLabel('List')
		fetchUserSingle(id)
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
		let groupsIdArr = selectedOptions?.map((item) => item?.value)
		const finalValues = {
			...values,
			groups: groupsIdArr,
		};

		if (editingId) {
			updateUser(editingId, finalValues)
		} else {
			createUser(finalValues);
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
			selector: row => row.username,
			sortable: true
		},
		{
			name: 'Email',
			selector: row => row.email,
			sortable: true
		},
		{
			name: 'Phone',
			selector: row => row.phone,
			sortable: false
		},
		{
			name: 'Status',
			selector: row => (
				<span className={`inline-flex rounded py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 ${row.is_active === 1 ? 'bg-[#13C296]' : 'bg-[#DC3545]'}`}>
					{row.is_active === 1 ? 'Active' : 'Inactive'}
				</span>
			),
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
		{ name: 'username', label: 'Name', type: 'text' },
		{ name: 'email', label: 'Email', type: 'text' },
		{ name: 'is_active', label: 'Status', type: 'select', options: activeStatusOptions },
	];


	const renderContent = () => {
		if (loading) {
			return <Loader />
		}

		if (showTable && !loading) {
			return (
				<UsersTable
					defaultPage={page}
					columns={columns}
					data={userList?.data == undefined ? [] : userList?.data}
					totalCount={userList?.pagination?.count}
					handlePageChange={onPageChange}
					searchFields={searchFields}
					handleFieldSearch={handleFieldSearch}
					handleFilterClick={handleFilterClick}
					handleClearSearch={handleClearSearch}
					searchParam={searchParam}
				/>
			);
		}

		if (editingId && !loading) {
			return (
				<UserForm
					onSubmit={onSubmit}
					initialValues={singleUser}
					onCancel={handleButtonClick}
					disableCheck={isDisable}
					roles={rolesList}
					setSelectedOptions={setSelectedOptions}
					selectedOptions={selectedOptions}
				/>
			);
		}

		if (!loading) {
			return <UserForm
				onSubmit={onSubmit}
				onCancel={handleButtonClick}
				disableCheck={isDisable}
				roles={rolesList}
				setSelectedOptions={setSelectedOptions}
				selectedOptions={selectedOptions}
			/>;
		}
	};

	return (
		<Layout title="Vendors" buttonText={buttonLabel} onButtonClick={handleButtonClick} >
			{renderContent()}
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.users.loading,
		error: state.users.error,
		success: state.users.success,
		userList: state.users.userList,
		singleUser: state.users.singleUser,
		rolesList: state.roles.rolesList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserList: (page, search) => dispatch(fetchUserList(page, search)),
		createUser: (data) => dispatch(createUser(data)),
		updateUser: (id, data) => dispatch(updateUser(id, data)),
		fetchUserSingle: (id) => dispatch(fetchUserSingle(id)),
		fetchRolesList: (page, search, isProcess) => dispatch(fetchRolesList(page, search, isProcess)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
