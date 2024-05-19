import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';
import MaterialsForm from './MaterialsForm';
import MaterialsTable from '../../../components/admin/Table/Table';
import { fetchMaterialsList, createMaterial, fetchMaterial, updateMaterial, fetchUnitsList, fetchMaterialTypesList } from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import { storageTypeOptions, activeStatusOptions } from '../../../constants';
import { buildQueryString } from '../../../helper/buildQueryString';

import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';


const Materials = (props) => {
	const { loading, error, success, materialsList, fetchMaterialsList, createMaterial, fetchMaterial, singleMaterial, updateMaterial, fetchUnitsList, unitsList, fetchMaterialTypesList, materialTypesList } = props;

	const [showTable, setShowTable] = useState(false);
	const [buttonLabel, setButtonLabel] = useState('Add');
	const [editingId, setEditingId] = useState(null);
	const [isDisable, setIsDisable] = useState(false)
	const [page, setPage] = useState(1)


	let queryParam = { name: '', status: '' }
	const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchMaterialsList, page, queryParam);
	useToastMessages(success, error, fetchMaterialsList, page, setShowTable, setButtonLabel);


	const fetchData = async () => {
		let unitParam = buildQueryString({ status: 1 });
		let materialTypeParam = buildQueryString({ status: 1 });

		await Promise.all([
			fetchUnitsList('', unitParam, true),
			fetchMaterialTypesList('', materialTypeParam, true),
			fetchMaterialsList(page),
		]);
	};

	useEffect(() => {
		setShowTable(true)
	}, [materialsList])

	useEffect(() => {
		fetchData()
	}, [fetchMaterialsList, page]);


	const handleEditDelete = (id, action) => {
		if (action === 'edit') {
			setIsDisable(false)
			setEditingId(id)
			setShowTable(false)
			setButtonLabel('List')
			fetchMaterial(id)
		} else if (action === 'view') {
			setIsDisable(true)
			setEditingId(id)
			setShowTable(false)
			setButtonLabel('List')
			fetchMaterial(id)
		}
	};

	const handleButtonClick = () => {
		setShowTable(!showTable);
		setButtonLabel(showTable ? 'List' : 'Add');
		setEditingId(null)
	};

	const onPageChange = (page) => setPage(page);

	const onSubmit = (values) => editingId ? updateMaterial(editingId, values) : createMaterial(values);

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
			name: 'Storage Type',
			selector: row => {
				const option = storageTypeOptions.find(option => option.value === row.storage_type);
				return option ? option.label : '';
			},
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
			return <Loader />
		}

		if (showTable && !loading) {
			return <MaterialsTable
				defaultPage={page}
				columns={columns}
				data={materialsList.data === undefined ? [] : materialsList.data}
				totalCount={materialsList?.pagination?.count}
				handlePageChange={onPageChange}
				searchFields={searchFields}
				handleFieldSearch={handleFieldSearch}
				handleFilterClick={handleFilterClick}
				handleClearSearch={handleClearSearch}
				searchParam={searchParam}
			/>
		}

		if (editingId && !loading) {
			return <MaterialsForm
				onSubmit={onSubmit}
				initialValues={singleMaterial}
				onCancel={handleButtonClick}
				disableCheck={isDisable}
				unitsList={unitsList}
				materialTypesList={materialTypesList} />;
		}

		if (!loading) {
			return <MaterialsForm
				onSubmit={onSubmit}
				onCancel={handleButtonClick}
				unitsList={unitsList}
				materialTypesList={materialTypesList} />;
		}

	};

	return (
		<Layout title="Material" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
			{renderContent()}
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.materials.loading,
		error: state.materials.error,
		success: state.materials.success,
		unitsList: state.units.unitsList,
		materialsList: state.materials.materialsList,
		singleMaterial: state.materials.singleMaterial,
		materialTypesList: state.materialType.materialTypesList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchMaterialTypesList: (page, search, isProcess) => dispatch(fetchMaterialTypesList(page, search, isProcess)),
		fetchUnitsList: (page, search, isProcess) => dispatch(fetchUnitsList(page, search, isProcess)),
		fetchMaterialsList: (page, search) => dispatch(fetchMaterialsList(page, search)),
		createMaterial: (data) => dispatch(createMaterial(data)),
		// deleteBrand: (id) => dispatch(deleteBrand(id)),
		fetchMaterial: (id) => dispatch(fetchMaterial(id)),
		updateMaterial: (id, data) => dispatch(updateMaterial(id, data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Materials);
