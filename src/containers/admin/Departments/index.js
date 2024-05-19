import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';
import DepartmentForm from './DepartmentForm';
import DepartmentTable from '../../../components/admin/Table/Table';
import { fetchDepartmentsList, createDepartment, fetchDepartmentSingle, updateDepartment, fetchUserList } from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import { buildQueryString } from '../../../helper/buildQueryString';
import { activeStatusOptions } from '../../../constants';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';


const Departments = (props) => {
	const { loading, error, success, departmentsList, fetchDepartmentsList, createDepartment, fetchDepartmentSingle, singleDepartment, updateDepartment, fetchUserList, userList } = props;

	const [showTable, setShowTable] = useState(false);
	const [buttonLabel, setButtonLabel] = useState('Add');
	const [editingId, setEditingId] = useState(null);
	const [isDisable, setIsDisable] = useState(false)
	const [page, setPage] = useState(1)

	let queryParam = { name: '', status: '' }
	const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchDepartmentsList, page, queryParam);
	useToastMessages(success, error, fetchDepartmentsList, page, setShowTable, setButtonLabel);

	const fetchData = async () => {
		let userParam = buildQueryString({ is_active: 1 });

		await Promise.all([
			fetchUserList('', userParam, true),
			fetchDepartmentsList(page)
		]);
	};

	useEffect(() => {
		setShowTable(true)
	}, [departmentsList])

	useEffect(() => {
		fetchData()
	}, [fetchDepartmentsList, page]);

	const handleEditDelete = (id, action) => {
		setEditingId(id)
		setShowTable(false)
		setButtonLabel('List')
		fetchDepartmentSingle(id)
	};

	const handleButtonClick = () => {
		setShowTable(!showTable);
		setButtonLabel(showTable ? 'List' : 'Add');
		setEditingId(null)
	};

	const onPageChange = (page) => setPage(page);

	const onSubmit = (values) => editingId ? updateDepartment(editingId, values) : createDepartment(values);

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
			name: 'Status',
			selector: row => (
				<span className={`inline-flex rounded py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 ${row.status === 1 ? 'bg-[#13C296]' : 'bg-[#DC3545]'}`}>
					{row.status === 1 ? 'Active' : 'Inactive'}
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
					showViewButton={false}
					onView={id => handleEditDelete(id, 'view')}
				/>
			),
			sortable: false
		},
	];

	const searchFields = [
		{ name: 'name', label: 'Name', type: 'text' },
		{ name: 'status', label: 'Status', type: 'select', options: activeStatusOptions },
	];


	const renderContent = () => {
		if (loading) {
			return <Loader />
		}

		if (showTable && !loading) {
			return <DepartmentTable
				defaultPage={page}
				columns={columns}
				data={departmentsList.data === undefined ? [] : departmentsList.data}
				totalCount={departmentsList?.pagination?.count}
				handlePageChange={onPageChange}
				searchFields={searchFields}
				handleFieldSearch={handleFieldSearch}
				handleFilterClick={handleFilterClick}
				handleClearSearch={handleClearSearch}
				searchParam={searchParam}
			/>
		}

		if (editingId && !loading) {
			return <DepartmentForm
				onSubmit={onSubmit}
				initialValues={singleDepartment}
				onCancel={handleButtonClick}
				disableCheck={isDisable}
				userList={userList}
			/>;
		}

		if (!loading) {
			return <DepartmentForm
				onSubmit={onSubmit}
				onCancel={handleButtonClick}
				userList={userList}
			/>;
		}

	};

	return (
		<Layout title="Departments" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
			{renderContent()}
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.departments.loading,
		error: state.departments.error,
		success: state.departments.success,
		departmentsList: state.departments.departmentsList,
		singleDepartment: state.departments.singleDepartment,
		userList: state.users.userList
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserList: (page, search, isProcess) => dispatch(fetchUserList(page, search, isProcess)),
		fetchDepartmentsList: (page, search) => dispatch(fetchDepartmentsList(page, search)),
		createDepartment: (data) => dispatch(createDepartment(data)),
		// deleteBrand: (id) => dispatch(deleteBrand(id)),
		fetchDepartmentSingle: (id) => dispatch(fetchDepartmentSingle(id)),
		updateDepartment: (id, data) => dispatch(updateDepartment(id, data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Departments);
