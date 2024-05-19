import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';
import UnitForm from './UnitForm';
import UnitTable from '../../../components/admin/Table/Table';
import { fetchUnitsList, createUnit, fetchUnitSingle, updateUnit } from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import { activeStatusOptions } from '../../../constants';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';

const Unit = (props) => {
    const { loading, error, success, unitsList, fetchUnitsList, createUnit, fetchUnitSingle, singleUnit, updateUnit } = props;

    const [showTable, setShowTable] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Add');
    const [editingId, setEditingId] = useState(null);
    const [isDisable, setIsDisable] = useState(false);
    const [page, setPage] = useState(1);

    let queryParam = { name: '', status: '' }
    const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchUnitsList, page, queryParam);
    useToastMessages(success, error, fetchUnitsList, page, setShowTable, setButtonLabel);

    const fetchData = async () => {
        await Promise.all([
            fetchUnitsList(page)
        ]);
    };

    useEffect(() => {
        setShowTable(true);
    }, [unitsList]);

    useEffect(() => {
        fetchData();
    }, [fetchUnitsList, page]);

    const handleEditDelete = (id, action) => {
        setEditingId(id);
        setShowTable(false);
        setButtonLabel('List');
        fetchUnitSingle(id);
    };

    const handleButtonClick = () => {
        setShowTable(!showTable);
        setButtonLabel(showTable ? 'List' : 'Add');
        setEditingId(null);
    };

    const onPageChange = (page) => setPage(page);

    const onSubmit = (values) => (editingId ? updateUnit(editingId, values) : createUnit(values));

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
            name: 'Short Name',
            selector: row => row.short_name,
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
            return <Loader />;
        }

        if (showTable && !loading) {
            return (
                <UnitTable
                    defaultPage={page}
                    columns={columns}
                    data={unitsList.data === undefined ? [] : unitsList.data}
                    totalCount={unitsList?.pagination?.count}
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
                <UnitForm
                    onSubmit={onSubmit}
                    initialValues={singleUnit}
                    onCancel={handleButtonClick}
                    disableCheck={isDisable}
                />
            );
        }

        if (!loading) {
            return (
                <UnitForm
                    onSubmit={onSubmit}
                    onCancel={handleButtonClick}
                />
            );
        }
    };

    return (
        <Layout title="Unit" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
            {renderContent()}
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.units.loading,
        error: state.units.error,
        success: state.units.success,
        unitsList: state.units.unitsList,
        singleUnit: state.units.singleUnit
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUnitsList: (page, search) => dispatch(fetchUnitsList(page, search)),
        createUnit: (data) => dispatch(createUnit(data)),
        fetchUnitSingle: (id) => dispatch(fetchUnitSingle(id)),
        updateUnit: (id, data) => dispatch(updateUnit(id, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Unit);
