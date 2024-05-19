import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';
import ReceiveOrderForm from './ReceiveOrderForm';
import CreateReceiveOrderForm from './CreateReceiveOrderForm';
import ReceiveOrderTable from '../../../components/admin/Table/Table';
import { fetchReceiveOrdersList, createReceiveOrder, fetchReceiveOrderSingle, updateReceiveOrder, fetchUserList, fetchMaterialsProcessList, fetchPurchaseOrdersList } from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import { receivedOrderStatusOptions } from '../../../constants';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';

const ReceiveOrder = (props) => {
	const { loading, error, success, receiveOrdersList, fetchReceiveOrdersList, createReceiveOrder, fetchReceiveOrderSingle, singleReceiveOrder, updateReceiveOrder, fetchUserList, userList, fetchMaterialsProcessList, materialsList, fetchPurchaseOrdersList, purchaseOrdersList } = props;

	const [showTable, setShowTable] = useState(false);
	const [buttonLabel, setButtonLabel] = useState('Add');
	const [editingId, setEditingId] = useState(null);
	const [isDisable, setIsDisable] = useState(false);
	const [page, setPage] = useState(1);

	let queryParam = { name: '', status: '' };
	const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchReceiveOrdersList, page, queryParam);
	useToastMessages(success, error, fetchReceiveOrdersList, page, setShowTable, setButtonLabel);

	const fetchData = async () => {
		await Promise.all([
			fetchUserList('', '', true),
			fetchMaterialsProcessList(),
			fetchPurchaseOrdersList('', '', true),
			fetchReceiveOrdersList(page)
		]);
	};

	useEffect(() => {
		setShowTable(true);
	}, [receiveOrdersList]);

	useEffect(() => {
		fetchData();
	}, [fetchReceiveOrdersList, page]);

	const handleEditDelete = (id, action) => {
		setEditingId(id);
		setShowTable(false);
		setButtonLabel('List');
		fetchReceiveOrderSingle(id);
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

	const onSubmit = (values) => editingId ? updateReceiveOrder(editingId, values) : createReceiveOrder(values);

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
			name: 'Received Date',
			selector: row => row.received_date,
			sortable: true
		},
		{
			name: 'Purchase Order',
			selector: row => row?.purchase_order_info?.tracking_id,
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
		{ name: 'status', label: 'Status', type: 'select', options: receivedOrderStatusOptions },
	];

	const renderContent = () => {
		if (loading) {
			return <Loader />;
		}

		if (showTable && !loading) {
			return (
				<ReceiveOrderTable
					defaultPage={page}
					columns={columns}
					data={receiveOrdersList?.data === undefined ? [] : receiveOrdersList.data}
					totalCount={receiveOrdersList?.pagination?.count}
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
				<ReceiveOrderForm
					onSubmit={onSubmit}
					initialValues={singleReceiveOrder}
					onCancel={handleButtonClick}
					disableCheck={isDisable}
					userList={userList}
					materialsList={materialsList}
					purchaseOrdersList={purchaseOrdersList}
				/>
			);
		}

		if (!loading) {
			return (
				<CreateReceiveOrderForm
					onSubmit={onSubmit}
					onCancel={handleButtonClick}
					userList={userList}
					materialsList={materialsList}
					purchaseOrdersList={purchaseOrdersList}
				/>
			);
		}
	};

	return (
		<Layout title="Received Order" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
			{renderContent()}
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.receiveOrders.loading,
		error: state.receiveOrders.error,
		success: state.receiveOrders.success,
		receiveOrdersList: state.receiveOrders.receiveOrdersList,
		singleReceiveOrder: state.receiveOrders.singleReceiveOrder,
		userList: state.users.userList,
		materialsList: state.materials.processedMaterialsList,
		purchaseOrdersList: state.purchaseOrders.purchaseOrdersList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserList: (page, search, isProcess) => dispatch(fetchUserList(page, search, isProcess)),
		fetchMaterialsProcessList: () => dispatch(fetchMaterialsProcessList()),
		fetchPurchaseOrdersList: (page, search, isProcess) => dispatch(fetchPurchaseOrdersList(page, search, isProcess)),
		fetchReceiveOrdersList: (page, search) => dispatch(fetchReceiveOrdersList(page, search)),
		createReceiveOrder: (data) => dispatch(createReceiveOrder(data)),
		fetchReceiveOrderSingle: (id) => dispatch(fetchReceiveOrderSingle(id)),
		updateReceiveOrder: (id, data) => dispatch(updateReceiveOrder(id, data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveOrder);
