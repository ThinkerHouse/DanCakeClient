import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';
import ProductionPlantForm from './ProductionPlantForm';
import ProductionPlantTable from '../../../components/admin/Table/Table';
import { fetchProductionPlantsList, createProductionPlant, fetchProductionPlant, updateProductionPlant, fetchUserList } from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import { activeStatusOptions } from '../../../constants';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';

const ProductionPlant = (props) => {
    const { loading, error, success, productionPlantsList, fetchProductionPlantsList, createProductionPlant, fetchProductionPlant, singleProductionPlant, updateProductionPlant, fetchUserList, userList } = props;

    const [showTable, setShowTable] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Add');
    const [editingId, setEditingId] = useState(null);
    const [isDisable, setIsDisable] = useState(false);
    const [page, setPage] = useState(1);

    let queryParam = { name: '', status: '' }
    const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchProductionPlantsList, page, queryParam);
    useToastMessages(success, error, fetchProductionPlantsList, page, setShowTable, setButtonLabel);

    const fetchData = async () => {
        await Promise.all([
            fetchUserList('', '', true),
            fetchProductionPlantsList(page)
        ]);
    };

    useEffect(() => {
        setShowTable(true);
    }, [productionPlantsList]);

    useEffect(() => {
        fetchData();
    }, [fetchProductionPlantsList, page]);

    const handleEditDelete = (id, action) => {
        setEditingId(id);
        setShowTable(false);
        setButtonLabel('List');
        fetchProductionPlant(id);
        
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

    const onSubmit = (values) => editingId ? updateProductionPlant(editingId, values) : createProductionPlant(values);

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
                <ProductionPlantTable
                    defaultPage={page}
                    columns={columns}
                    data={productionPlantsList.data === undefined ? [] : productionPlantsList.data}
                    totalCount={productionPlantsList?.pagination?.count}
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
                <ProductionPlantForm
                    onSubmit={onSubmit}
                    initialValues={singleProductionPlant}
                    onCancel={handleButtonClick}
                    disableCheck={isDisable}
                    userList={userList}
                />
            );
        }

        if (!loading) {
            return (
                <ProductionPlantForm
                    onSubmit={onSubmit}
                    onCancel={handleButtonClick}
                    userList={userList}
                />
            );
        }
    };

    return (
        <Layout title="Production Plant" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
            {renderContent()}
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.productionPlant.loading,
        error: state.productionPlant.error,
        success: state.productionPlant.success,
        productionPlantsList: state.productionPlant.productionPlantsList,
        singleProductionPlant: state.productionPlant.singleProductionPlant,
        userList: state.users.userList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserList: (page, search, isProcess) => dispatch(fetchUserList(page, search, isProcess)),
        fetchProductionPlantsList: (page, search) => dispatch(fetchProductionPlantsList(page, search)),
        createProductionPlant: (data) => dispatch(createProductionPlant(data)),
        fetchProductionPlant: (id) => dispatch(fetchProductionPlant(id)),
        updateProductionPlant: (id, data) => dispatch(updateProductionPlant(id, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductionPlant);
