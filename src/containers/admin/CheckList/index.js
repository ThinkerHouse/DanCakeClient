import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';
import CheckListForm from './CheckListForm';
import CheckListTable from '../../../components/admin/Table/Table';
import { fetchChecklistList, createChecklist, fetchChecklistSingle, updateChecklist } from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import { activeStatusOptions } from '../../../constants';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';

const CheckList = (props) => {
    const { loading, error, success, checkLists, fetchChecklistList, createChecklist, fetchChecklistSingle, singleChecklist, updateChecklist } = props;

    const [showTable, setShowTable] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Add');
    const [editingId, setEditingId] = useState(null);
    const [isDisable, setIsDisable] = useState(false);
    const [page, setPage] = useState(1);

    let queryParam = { name: '', status: '' }
    const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchChecklistList, page, queryParam);
    useToastMessages(success, error, fetchChecklistList, page, setShowTable, setButtonLabel);

    const fetchData = async () => {
        await Promise.all([
            fetchChecklistList(page)
        ]);
    };

    useEffect(() => {
        setShowTable(true);
    }, [checkLists]);

    useEffect(() => {
        fetchData();
    }, [fetchChecklistList, page]);

    const handleEditDelete = (id, action) => {
        setEditingId(id);
        setShowTable(false);
        setButtonLabel('List');
        fetchChecklistSingle(id);
    };

    const handleButtonClick = () => {
        setShowTable(!showTable);
        setButtonLabel(showTable ? 'List' : 'Add');
        setEditingId(null);
    };

    const onPageChange = (page) => setPage(page);

    const onSubmit = (values) => (editingId ? updateChecklist(editingId, values) : createChecklist(values));

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
            name: 'Type',
            selector: row => row.type.toUpperCase(),
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
                <CheckListTable
                    defaultPage={page}
                    columns={columns}
                    data={checkLists.data === undefined ? [] : checkLists.data}
                    totalCount={checkLists?.pagination?.count}
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
                <CheckListForm
                    onSubmit={onSubmit}
                    initialValues={singleChecklist}
                    onCancel={handleButtonClick}
                    disableCheck={isDisable}
                />
            );
        }

        if (!loading) {
            return (
                <CheckListForm
                    onSubmit={onSubmit}
                    onCancel={handleButtonClick}
                />
            );
        }
    };

    return (
        <Layout title="Check List" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
            {renderContent()}
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.checklists.loading,
        error: state.checklists.error,
        success: state.checklists.success,
        checkLists: state.checklists.checklistsList,
        singleChecklist: state.checklists.singleChecklist
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchChecklistList: (page, search) => dispatch(fetchChecklistList(page, search)),
        createChecklist: (data) => dispatch(createChecklist(data)),
        fetchChecklistSingle: (id) => dispatch(fetchChecklistSingle(id)),
        updateChecklist: (id, data) => dispatch(updateChecklist(id, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);
