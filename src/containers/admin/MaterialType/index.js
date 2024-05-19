import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';
import MaterialTypeForm from './MaterialTypeForm';
import MaterialTypeTable from '../../../components/admin/Table/Table';
import { fetchMaterialTypesList, createMaterialType, fetchMaterialTypeSingle, updateMaterialType } from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import { activeStatusOptions } from '../../../constants';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';




const MaterialType = (props) => {
    const { loading, error, success, materialTypesList, fetchMaterialTypesList, createMaterialType, fetchMaterialTypeSingle, singleMaterialType, updateMaterialType } = props;

    const [showTable, setShowTable] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Add');
    const [editingId, setEditingId] = useState(null);
    const [isDisable, setIsDisable] = useState(false)
    const [page, setPage] = useState(1)

    let queryParam = { name: '', status: '' }
    const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchMaterialTypesList, page, queryParam);
    useToastMessages(success, error, fetchMaterialTypesList, page, setShowTable, setButtonLabel);

    const fetchData = async () => {
        await Promise.all([
            fetchMaterialTypesList(page)
        ]);
    };

    useEffect(() => {
        setShowTable(true)
    }, [materialTypesList])

    useEffect(() => {
        fetchData()
    }, [fetchMaterialTypesList, page]);

    const handleEditDelete = (id, action) => {
        setEditingId(id)
        setShowTable(false)
        setButtonLabel('List')
        fetchMaterialTypeSingle(id)
    };

    const handleButtonClick = () => {
        setShowTable(!showTable);
        setButtonLabel(showTable ? 'List' : 'Add');
        setEditingId(null)
    };

    const onPageChange = (page) => setPage(page);

    const onSubmit = (values) => editingId ? updateMaterialType(editingId, values) : createMaterialType(values);


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
            return <MaterialTypeTable
                defaultPage={page}
                columns={columns}
                data={materialTypesList.data === undefined ? [] : materialTypesList.data}
                totalCount={materialTypesList?.pagination?.count}
                handlePageChange={onPageChange}
                searchFields={searchFields}
                handleFieldSearch={handleFieldSearch}
                handleFilterClick={handleFilterClick}
                handleClearSearch={handleClearSearch}
                searchParam={searchParam}
            />
        }

        if (editingId && !loading) {
            return <MaterialTypeForm
                onSubmit={onSubmit}
                initialValues={singleMaterialType}
                onCancel={handleButtonClick}
                disableCheck={isDisable}
            />;
        }

        if (!loading) {
            return <MaterialTypeForm
                onSubmit={onSubmit}
                onCancel={handleButtonClick}
            />;
        }

    };

    return (
        <Layout title="Material Type" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
            {renderContent()}
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.materialType.loading,
        error: state.materialType.error,
        success: state.materialType.success,
        materialTypesList: state.materialType.materialTypesList,
        singleMaterialType: state.materialType.singleMaterialType
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMaterialTypesList: (page, search) => dispatch(fetchMaterialTypesList(page, search)),
        createMaterialType: (data) => dispatch(createMaterialType(data)),
        // deleteBrand: (id) => dispatch(deleteBrand(id)),
        fetchMaterialTypeSingle: (id) => dispatch(fetchMaterialTypeSingle(id)),
        updateMaterialType: (id, data) => dispatch(updateMaterialType(id, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialType);
