import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';
import WarehouseForm from './WarehouseForm';
import WarehouseTable from '../../../components/admin/Table/Table';
import { fetchWarehousesList, createWarehouse, fetchWarehouseSingle, updateWarehouse, fetchUserList } from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import { activeStatusOptions } from '../../../constants';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';

const Warehouse = (props) => {
	const { loading, error, success, warehousesList, fetchWarehousesList, createWarehouse, fetchWarehouseSingle, singleWarehouse, updateWarehouse, fetchUserList, userList } = props;

	const [showTable, setShowTable] = useState(false);
	const [buttonLabel, setButtonLabel] = useState('Add');
	const [editingId, setEditingId] = useState(null);
	const [isDisable, setIsDisable] = useState(false);
	// let [selectedOptions, setSelectedOptions] = useState([]);
	const [page, setPage] = useState(1);

	let queryParam = { name: '', status: '' }
	const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchWarehousesList, page, queryParam);
	useToastMessages(success, error, fetchWarehousesList, page, setShowTable, setButtonLabel);

	const fetchData = async () => {
		await Promise.all([
			fetchUserList('', '', true),
			fetchWarehousesList(page)
		]);
	};

	useEffect(() => {
		setShowTable(true);
	}, [warehousesList]);

	useEffect(() => {
		fetchData();
	}, [fetchWarehousesList, page]);

	const handleEditDelete = (id, action) => {
		setEditingId(id);
		setShowTable(false);
		setButtonLabel('List');
		fetchWarehouseSingle(id);
		if (action === 'edit') {
			setIsDisable(false);
		} else if (action === 'view') {
			setIsDisable(true);
		}
	};

	const handleButtonClick = () => {
		setShowTable(!showTable);
		setButtonLabel(showTable ? 'List' : 'Add');
		setEditingId(null);
	};

	const onPageChange = (page) => setPage(page);

	const onSubmit = (values) => editingId ? updateWarehouse(editingId, values) : createWarehouse(values);

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
			name: 'Capacity',
			selector: row => row.capacity,
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
			return <Loader />;
		}

		if (showTable && !loading) {
			return (
				<WarehouseTable
					defaultPage={page}
					columns={columns}
					data={warehousesList.data === undefined ? [] : warehousesList.data}
					totalCount={warehousesList?.pagination?.count}
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
				<WarehouseForm
					onSubmit={onSubmit}
					initialValues={singleWarehouse}
					onCancel={handleButtonClick}
					disableCheck={isDisable}
					userList={userList}
				/>
			);
		}

		if (!loading) {
			return (
				<WarehouseForm
					onSubmit={onSubmit}
					onCancel={handleButtonClick}
					userList={userList}
				/>
			);
		}
	};

	return (
		<Layout title="Warehouse" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
			{renderContent()}
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.warehouses.loading,
		error: state.warehouses.error,
		success: state.warehouses.success,
		warehousesList: state.warehouses.warehousesList,
		singleWarehouse: state.warehouses.singleWarehouse,
		userList: state.users.userList
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserList: (page, search, isProcess) => dispatch(fetchUserList(page, search, isProcess)),
		fetchWarehousesList: (page, search) => dispatch(fetchWarehousesList(page, search)),
		createWarehouse: (data) => dispatch(createWarehouse(data)),
		fetchWarehouseSingle: (id) => dispatch(fetchWarehouseSingle(id)),
		updateWarehouse: (id, data) => dispatch(updateWarehouse(id, data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Warehouse);
