import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';
import PurchaseOrderForm from './PurchaseOrderForm';
import CreatePurchaseOrderForm from './CreatePurchaseOrderForm';
import PurchaseOrderTable from '../../../components/admin/Table/Table';
import { fetchPurchaseOrdersList, createPurchaseOrder, fetchPurchaseOrderSingle, updatePurchaseOrder, fetchUserList, fetchMaterialsProcessList } from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import { activeStatusOptions } from '../../../constants';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';

const PurchaseOrder = (props) => {
	const { loading, error, success, purchaseOrdersList, fetchPurchaseOrdersList, createPurchaseOrder, fetchPurchaseOrderSingle, singlePurchaseOrder, updatePurchaseOrder, fetchUserList, userList, fetchMaterialsProcessList, materialsList } = props;

	const [showTable, setShowTable] = useState(false);
	const [buttonLabel, setButtonLabel] = useState('Add');
	const [editingId, setEditingId] = useState(null);
	const [isDisable, setIsDisable] = useState(false);
	const [page, setPage] = useState(1);

	let queryParam = { name: '', status: '' };
	const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchPurchaseOrdersList, page, queryParam);
	useToastMessages(success, error, fetchPurchaseOrdersList, page, setShowTable, setButtonLabel);

	const fetchData = async () => {
		await Promise.all([
			fetchUserList('', '', true),
			fetchMaterialsProcessList(),
			fetchPurchaseOrdersList(page)

		]);
	};

	useEffect(() => {
		setShowTable(true);
	}, [purchaseOrdersList]);

	useEffect(() => {
		fetchData();
	}, [fetchPurchaseOrdersList, page]);

	const handleEditDelete = (id, action) => {
		if (action === 'edit') {
			setIsDisable(false);
			setEditingId(id);
			setShowTable(false);
			setButtonLabel('List');
			fetchPurchaseOrderSingle(id);
		} else if (action === 'view') {
			setIsDisable(true);
			setEditingId(id);
			setShowTable(false);
			setButtonLabel('List');
			fetchPurchaseOrderSingle(id);
		}
	};

	const handleButtonClick = () => {
		setShowTable(!showTable);
		setButtonLabel(showTable ? 'List' : 'Add');
		setEditingId(null);
	};

	const onPageChange = (page) => setPage(page);

	const onSubmit = (values) => editingId ? updatePurchaseOrder(editingId, values) : createPurchaseOrder(values);

	const columns = [
		{
			name: 'Id',
			selector: (row, index) => (page - 1) * 10 + index + 1,
			sortable: true
		},
		{
			name: 'Tracking Id',
			selector: row => row.tracking_id,
			sortable: true
		},
		{
			name: 'Order Date',
			selector: row => row.order_date,
			sortable: true
		},
		{
			name: 'Total amount',
			selector: row => row.total_amount,
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
					data={purchaseOrdersList?.data === undefined ? [] : purchaseOrdersList.data}
					totalCount={purchaseOrdersList?.pagination?.count}
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
					initialValues={singlePurchaseOrder}
					onCancel={handleButtonClick}
					disableCheck={isDisable}
					userList={userList}
					materialsList={materialsList}
				/>
			);
		}

		if (!loading) {
			return (
				<CreatePurchaseOrderForm
					onSubmit={onSubmit}
					onCancel={handleButtonClick}
					userList={userList}
					materialsList={materialsList}
				/>
			);
		}
	};

	return (
		<Layout title="Purchase Order" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
			{renderContent()}
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.purchaseOrders.loading,
		error: state.purchaseOrders.error,
		success: state.purchaseOrders.success,
		purchaseOrdersList: state.purchaseOrders.purchaseOrdersList,
		singlePurchaseOrder: state.purchaseOrders.singlePurchaseOrder,
		userList: state.users.userList,
		materialsList: state.materials.processedMaterialsList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserList: (page, search, isProcess) => dispatch(fetchUserList(page, search, isProcess)),
		fetchMaterialsProcessList: () => dispatch(fetchMaterialsProcessList()),
		fetchPurchaseOrdersList: (page, search) => dispatch(fetchPurchaseOrdersList(page, search)),
		createPurchaseOrder: (data) => dispatch(createPurchaseOrder(data)),
		fetchPurchaseOrderSingle: (id) => dispatch(fetchPurchaseOrderSingle(id)),
		updatePurchaseOrder: (id, data) => dispatch(updatePurchaseOrder(id, data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder);
