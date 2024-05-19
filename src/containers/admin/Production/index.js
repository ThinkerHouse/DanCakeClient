import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';
import PurchaseOrderForm from './ProductionForm';
import CreateProductionForm from './CreateProductionForm';
import PurchaseOrderTable from '../../../components/admin/Table/Table';
import { fetchProductionsList, createProduction, fetchProductionSingle, updateProduction, fetchUserList, fetchUnitsList, fetchProductsList, fetchProductionPlantsList } from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import { activeStatusOptions } from '../../../constants';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';

const PurchaseOrder = (props) => {
	const { loading, error, success, productionsList, fetchProductionsList, createProduction, fetchProductionSingle, singleProduction, updateProduction, fetchUserList, userList, fetchUnitsList, unitsList, fetchProductsList, productsList, fetchProductionPlantsList, productionPlantsList } = props;

	const [showTable, setShowTable] = useState(false);
	const [buttonLabel, setButtonLabel] = useState('Add');
	const [editingId, setEditingId] = useState(null);
	const [isDisable, setIsDisable] = useState(false);
	const [page, setPage] = useState(1);

	let queryParam = { name: '', status: '' };
	const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchProductionsList, page, queryParam);
	useToastMessages(success, error, fetchProductionsList, page, setShowTable, setButtonLabel);

	const fetchData = async () => {
		await Promise.all([
			fetchUserList('', '', true),
			fetchUnitsList('', '', true),
			fetchProductsList('', '', true),
			fetchProductionPlantsList('', '', true),
			fetchProductionsList(page)
		]);
	};

	useEffect(() => {
		setShowTable(true);
	}, [productionsList]);

	useEffect(() => {
		fetchData();
	}, [fetchProductionsList, page]);

	const handleEditDelete = (id, action) => {
		setEditingId(id);
		setShowTable(false);
		setButtonLabel('List');
		fetchProductionSingle(id);

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

	const onSubmit = (values) => editingId ? updateProduction(editingId, values) : createProduction(values);

	const columns = [
		{
			name: 'Id',
			selector: (row, index) => (page - 1) * 10 + index + 1,
			sortable: true
		},
		{
			name: 'Batch No',
			selector: row => row.batch_no,
			sortable: true
		},
		{
			name: 'Name',
			selector: row => row.name,
			sortable: true
		},
		{
			name: 'Production Plant',
			selector: row => row?.production_plant_info?.name,
			sortable: true
		},
		{
			name: 'Status',
			selector: row => (
				<span className={`inline-flex rounded py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 ${row.status === 'pending' ? 'bg-[#F7CB73]' : row.status === 'approved' ? 'bg-[#13C296]' : 'bg-[#DC3545]'}`}>
					{row.status === 'pending' ? 'Pending' : row.status === 'approved' ? 'Approved' : 'Rejected'}
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
				<PurchaseOrderTable
					defaultPage={page}
					columns={columns}
					data={productionsList?.data === undefined ? [] : productionsList.data}
					totalCount={productionsList?.pagination?.count}
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
				<PurchaseOrderForm
					onSubmit={onSubmit}
					initialValues={singleProduction}
					onCancel={handleButtonClick}
					disableCheck={isDisable}
					userList={userList}
					unitsList={unitsList}
					productsList={productsList}
					productionPlantsList={productionPlantsList}
				/>
			);
		}

		if (!loading) {
			return (
				<CreateProductionForm
					onSubmit={onSubmit}
					onCancel={handleButtonClick}
					userList={userList}
					unitsList={unitsList}
					productsList={productsList}
					productionPlantsList={productionPlantsList}
				/>
			);
		}
	};

	return (
		<Layout title="Production" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
			{renderContent()}
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.production.loading,
		error: state.production.error,
		success: state.production.success,
		productionsList: state.production.productionsList,
		singleProduction: state.production.singleProduction,
		userList: state.users.userList,
		unitsList: state.units.unitsList,
		productsList: state.products.productsList,
		productionPlantsList: state.productionPlant.productionPlantsList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserList: (page, search, isProcess) => dispatch(fetchUserList(page, search, isProcess)),
		fetchUnitsList: (page, search, isProcess) => dispatch(fetchUnitsList(page, search, isProcess)),
		fetchProductsList: (page, search, isProcess) => dispatch(fetchProductsList(page, search, isProcess)),
		fetchProductionsList: (page, search) => dispatch(fetchProductionsList(page, search)),
		createProduction: (data) => dispatch(createProduction(data)),
		fetchProductionSingle: (id) => dispatch(fetchProductionSingle(id)),
		fetchProductionPlantsList: (page, search, isProcess) => dispatch(fetchProductionPlantsList(page, search, isProcess)),
		updateProduction: (id, data) => dispatch(updateProduction(id, data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder);
