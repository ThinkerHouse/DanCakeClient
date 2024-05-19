import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';
import RequisitionForm from './RequisitionForm';
import CreateRequisitionForm from './CreateRequisitionForm';
import RequisitionTable from '../../../components/admin/Table/Table';
import { fetchRequisitionsList, createRequisition, fetchRequisitionSingle, updateRequisition, fetchUserList, fetchUnitsList, fetchMaterialsProcessList, fetchDepartmentsList, fetchProductionsList } from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import { activeStatusOptions } from '../../../constants';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';

const Requisitions = (props) => {
    const { loading, error, success, requisitionsList, fetchRequisitionsList, createRequisition, fetchRequisitionSingle, singleRequisition, updateRequisition, fetchUserList, userList, fetchUnitsList, unitsList, fetchMaterialsProcessList, materialsList, fetchDepartmentsList, departmentsList, fetchProductionsList, productionsList } = props;

    const [showTable, setShowTable] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Add');
    const [editingId, setEditingId] = useState(null);
    const [isDisable, setIsDisable] = useState(false);
    const [page, setPage] = useState(1);

    let queryParam = { name: '', status: '' };
    const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchRequisitionsList, page, queryParam);
    useToastMessages(success, error, fetchRequisitionsList, page, setShowTable, setButtonLabel);

    const fetchData = async () => {
        await Promise.all([
            fetchUserList('', '', true),
            fetchUnitsList('', '', true),
            fetchMaterialsProcessList(),
            fetchDepartmentsList('', '', true),
            fetchProductionsList('', '', true),
            fetchRequisitionsList(page)
        ]);
    };

    useEffect(() => {
        setShowTable(true);
    }, [requisitionsList]);

    useEffect(() => {
        fetchData();
    }, [fetchRequisitionsList, page]);

    const handleEditDelete = (id, action) => {
        setEditingId(id);
        setShowTable(false);
        setButtonLabel('List');
        fetchRequisitionSingle(id);

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

    const onSubmit = (values) => editingId ? updateRequisition(editingId, values) : createRequisition(values);

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
            name: 'Department',
            selector: row => row?.department_info?.name,
            sortable: true
        },
        {
            name: 'Expected Delivery Date',
            selector: row => row.expected_delivery_date,
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
                <RequisitionTable
                    defaultPage={page}
                    columns={columns}
                    data={requisitionsList?.data === undefined ? [] : requisitionsList.data}
                    totalCount={requisitionsList?.pagination?.count}
                    handlePageChange={onPageChange}
                    searchFields={searchFields}
                    handleFieldSearch={handleFieldSearch}
                    handleFilterClick={handleFilterClick}
                    handleClearSearch={handleClearSearch}
                    searchParam={searchParam}
                />
            );
        }
console.log(materialsList);
        if (editingId && !loading) {
            return (
                <RequisitionForm
                    onSubmit={onSubmit}
                    initialValues={singleRequisition}
                    onCancel={handleButtonClick}
                    disableCheck={isDisable}
                    userList={userList}
                    unitsList={unitsList}
                    materialsList={materialsList}
                    departmentsList={departmentsList}
                    productionsList={productionsList}
                />
            );
        }

        if (!loading) {
            return (
                <CreateRequisitionForm
                    onSubmit={onSubmit}
                    onCancel={handleButtonClick}
                    userList={userList}
                    unitsList={unitsList}
                    materialsList={materialsList}
                    departmentsList={departmentsList}
                    productionsList={productionsList}
                />
            );
        }
    };

    return (
        <Layout title="Requisitions" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
            {renderContent()}
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.requisition.loading,
        error: state.requisition.error,
        success: state.requisition.success,
        requisitionsList: state.requisition.requisitionsList,
        singleRequisition: state.requisition.singleRequisition,
        userList: state.users.userList,
        unitsList: state.units.unitsList,
        materialsList: state.materials.processedMaterialsList,
        departmentsList: state.departments.departmentsList,
		productionsList: state.production.productionsList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserList: (page, search, isProcess) => dispatch(fetchUserList(page, search, isProcess)),
        fetchUnitsList: (page, search, isProcess) => dispatch(fetchUnitsList(page, search, isProcess)),
        fetchMaterialsProcessList: () => dispatch(fetchMaterialsProcessList()),
		fetchProductionsList: (page, search, isProcess) => dispatch(fetchProductionsList(page, search, isProcess)),
        fetchRequisitionsList: (page, search) => dispatch(fetchRequisitionsList(page, search)),
        createRequisition: (data) => dispatch(createRequisition(data)),
        fetchRequisitionSingle: (id) => dispatch(fetchRequisitionSingle(id)),
        fetchDepartmentsList: (page, search, isProcess) => dispatch(fetchDepartmentsList(page, search, isProcess)),
        updateRequisition: (id, data) => dispatch(updateRequisition(id, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Requisitions);
