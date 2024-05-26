import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';
import WastageForm from './WastageForm';
import CreateWastageForm from './CreateWastageForm';
import WastageTable from '../../../components/admin/Table/Table';
import { 
    fetchWastagesList, 
    createWastage, 
    fetchWastageSingle, 
    updateWastage, 
    fetchUserList, 
    fetchUnitsList, 
    fetchProductsList 
} from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import { activeStatusOptions } from '../../../constants';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';

const Wastage = (props) => {
    const { 
        loading, 
        error, 
        success, 
        wastagesList, 
        fetchWastagesList, 
        createWastage, 
        fetchWastageSingle, 
        singleWastage, 
        updateWastage, 
        fetchUserList, 
        userList, 
        fetchUnitsList, 
        unitsList, 
        fetchProductsList, 
        productsList 
    } = props;

    const [showTable, setShowTable] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Add');
    const [editingId, setEditingId] = useState(null);
    const [isDisable, setIsDisable] = useState(false);
    const [page, setPage] = useState(1);

    let queryParam = { item_name: '', wastage_type: '' };
    const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchWastagesList, page, queryParam);
    useToastMessages(success, error, fetchWastagesList, page, setShowTable, setButtonLabel);

    const fetchData = async () => {
        await Promise.all([
            fetchUserList('', '', true),
            fetchUnitsList('', '', true),
            fetchProductsList('', '', true),
            fetchWastagesList(page)
        ]);
    };

    useEffect(() => {
        setShowTable(true);
    }, [wastagesList]);

    useEffect(() => {
        fetchData();
    }, [fetchWastagesList, page]);

    const handleEditDelete = (id, action) => {
        setEditingId(id);
        setShowTable(false);
        setButtonLabel('List');
        fetchWastageSingle(id);

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

    const onSubmit = (values) => editingId ? updateWastage(editingId, values) : createWastage(values);

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
            name: 'Item Name',
            selector: row => row.item_name,
            sortable: true
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true
        },
        {
            name: 'Wastage From',
            selector: row => row.wastage_from,
            sortable: true
        },
        {
            name: 'Wastage Type',
            selector: row => (
                <span className={`inline-flex rounded py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 ${row.wastage_type === 'actual' ? 'bg-[#F7CB73]' : 'bg-[#13C296]'}`}>
                    {row.wastage_type === 'actual' ? 'Actual' : 'Overflow'}
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
        { name: 'item_name', label: 'Item Name', type: 'text' },
        { name: 'wastage_type', label: 'Wastage Type', type: 'select', options: activeStatusOptions },
    ];

    const renderContent = () => {
        if (loading) {
            return <Loader />;
        }

        if (showTable && !loading) {
            return (
                <WastageTable
                    defaultPage={page}
                    columns={columns}
                    data={wastagesList?.data === undefined ? [] : wastagesList.data}
                    totalCount={wastagesList?.pagination?.count}
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
                <WastageForm
                    onSubmit={onSubmit}
                    initialValues={singleWastage}
                    onCancel={handleButtonClick}
                    disableCheck={isDisable}
                    userList={userList}
                    unitsList={unitsList}
                    productsList={productsList}
                />
            );
        }

        if (!loading) {
            return (
                <CreateWastageForm
                    onSubmit={onSubmit}
                    onCancel={handleButtonClick}
                    userList={userList}
                    unitsList={unitsList}
                    productsList={productsList}
                />
            );
        }
    };

    return (
        <Layout title="Wastage" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
            {renderContent()}
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.wastage.loading,
        error: state.wastage.error,
        success: state.wastage.success,
        wastagesList: state.wastage.wastagesList,
        singleWastage: state.wastage.singleWastage,
        userList: state.users.userList,
        unitsList: state.units.unitsList,
        productsList: state.products.productsList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserList: (page, search, isProcess) => dispatch(fetchUserList(page, search, isProcess)),
        fetchUnitsList: (page, search, isProcess) => dispatch(fetchUnitsList(page, search, isProcess)),
        fetchProductsList: (page, search, isProcess) => dispatch(fetchProductsList(page, search, isProcess)),
        fetchWastagesList: (page, search) => dispatch(fetchWastagesList(page, search)),
        createWastage: (data) => dispatch(createWastage(data)),
        fetchWastageSingle: (id) => dispatch(fetchWastageSingle(id)),
        updateWastage: (id, data) => dispatch(updateWastage(id, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wastage);
