import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/admin/Layout/Base/Layout';
import ProductForm from './ProductsForm';
import ProductTable from '../../../components/admin/Table/Table';
import { fetchProductsList, createProduct, fetchProductSingle, updateProduct } from '../../../store/actions';
import Loader from '../../../components/common/Loader/Loader';
import ActionButton from '../../../components/admin/ActionButton/ActionButton';
import useSearch from '../../../hooks/useSearch';
import useToastMessages from '../../../hooks/useToastMessages';
import { activeStatusOptions } from '../../../constants';


const Products = (props) => {
    const { loading, error, success, productsList, fetchProductsList, createProduct, fetchProductSingle, singleProduct, updateProduct } = props;

    const [showTable, setShowTable] = useState(true);
    const [buttonLabel, setButtonLabel] = useState('Add');
    const [editingId, setEditingId] = useState(null);
    const [page, setPage] = useState(1);

    const queryParam = { name: '', status: '' };
    const { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick } = useSearch(fetchProductsList, page, queryParam);
    useToastMessages(success, error, fetchProductsList, page, setShowTable, setButtonLabel);

    const fetchData = async () => {
        await fetchProductsList(page);
    };

    useEffect(() => {
        fetchData();
    }, [fetchProductsList, page]);

    const handleEditDelete = (id, action) => {
		setEditingId(id);
		setShowTable(false);
		setButtonLabel('List');
		fetchProductSingle(id);
    };

    const handleButtonClick = () => {
        setShowTable(!showTable);
        setButtonLabel(showTable ? 'List' : 'Add');
        setEditingId(null);
    };

    const onPageChange = (page) => setPage(page);

    const onSubmit = (values) => editingId ? updateProduct(editingId, values) : createProduct(values);

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
            name: 'SKU',
            selector: row => row.sku,
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
            return <ProductTable
                defaultPage={page}
                columns={columns}
                data={productsList.data === undefined ? [] : productsList.data}
                totalCount={productsList?.pagination?.count}
                handlePageChange={onPageChange}
                searchFields={searchFields}
                handleFieldSearch={handleFieldSearch}
                handleFilterClick={handleFilterClick}
                handleClearSearch={handleClearSearch}
                searchParam={searchParam}
            />
        }

        if (editingId && !loading) {
            return <ProductForm
                onSubmit={onSubmit}
                initialValues={singleProduct}
                onCancel={handleButtonClick}
            />;
        }

        if (!loading) {
            return <ProductForm
                onSubmit={onSubmit}
                onCancel={handleButtonClick}
            />;
        }
    };

    return (
        <Layout title="Products" buttonText={buttonLabel} onButtonClick={handleButtonClick}>
            {renderContent()}
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.products.loading,
        error: state.products.error,
        success: state.products.success,
        productsList: state.products.productsList,
        singleProduct: state.products.singleProduct,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProductsList: (page, search) => dispatch(fetchProductsList(page, search)),
        createProduct: (data) => dispatch(createProduct(data)),
        fetchProductSingle: (id) => dispatch(fetchProductSingle(id)),
        updateProduct: (id, data) => dispatch(updateProduct(id, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
