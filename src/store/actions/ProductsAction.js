// actions.js
import * as actionTypes from './actionTypes';
import ProductsController from '../../api/ProductsController';

export const productsInit = () => {
    return {
        type: actionTypes.PRODUCTS_INIT,
    };
};

export const fetchProductsListSuccess = (products) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
        payload: products,
    };
};

export const fetchProductsListFailure = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_LIST_FAILURE,
        payload: error,
    };
};

export const fetchProductSingleSuccess = (product) => {
    return {
        type: actionTypes.FETCH_PRODUCT_SINGLE_SUCCESS,
        payload: product,
    };
};

export const fetchProductSingleFailure = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCT_SINGLE_FAILURE,
        payload: error,
    };
};

export const createProductSuccess = (message) => {
    return {
        type: actionTypes.CREATE_PRODUCT_SUCCESS,
        payload: message,
    };
};

export const createProductFailure = (error) => {
    return {
        type: actionTypes.CREATE_PRODUCT_FAILURE,
        payload: error,
    };
};

export const updateProductSuccess = (product) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        payload: product,
    };
};

export const updateProductFailure = (error) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_FAILURE,
        payload: error,
    };
};

export const deleteProductSuccess = (productId) => {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        payload: productId,
    };
};

export const deleteProductFailure = (error) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FAILURE,
        payload: error,
    };
};


export const fetchProductsList = (page, searchParam = '', isProcess = false) => {
    return async (dispatch) => {
        try {
            dispatch(productsInit());
            const result = await ProductsController.list(page, searchParam)

            if (result.code !== undefined) {
                dispatch(fetchProductsListFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                if (isProcess) {
                    const processData = result.data.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    dispatch(fetchProductsListSuccess(processData));
                } else {
                    dispatch(fetchProductsListSuccess(result.data));
                }
            } else {
                dispatch(fetchProductsListFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchProductsListFailure('Something went wrong'));
        }
    };
};


export const fetchProductSingle = (productId) => {
    return async (dispatch) => {
        try {
            dispatch(productsInit());
            const result = await ProductsController.single(productId)

            if (result.code !== undefined) {
                dispatch(fetchProductSingleFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(fetchProductSingleSuccess(result.data.data));
            } else {
                dispatch(fetchProductSingleFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchProductSingleFailure('Something went wrong'));
        }
    };
};

export const createProduct = (productData) => {
    return async (dispatch) => {
        try {
            dispatch(productsInit());
            const result = await ProductsController.create(productData)

            if (result.code !== undefined) {
                dispatch(createProductFailure('Something went wrong'));
                return;
            }

            if (result.status === 201) {
                dispatch(createProductSuccess(result.data.message));
            } else {
                dispatch(createProductFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(createProductFailure('Something went wrong'));
        }
    };
};

export const updateProduct = (productId, updatedProductData) => {
    return async (dispatch) => {
        try {
            dispatch(productsInit());
            const result = await ProductsController.update(productId, updatedProductData)

            if (result.code !== undefined) {
                dispatch(updateProductFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(updateProductSuccess(result.data.message));
            } else {
                dispatch(updateProductFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(updateProductFailure('Something went wrong'));
        }
    };
};

export const deleteProduct = (productId) => {
    return async (dispatch) => {
        dispatch(productsInit());
        ProductsController.delete(productId)
            .then((result) => {
                if (result instanceof Error) {
                    let errorMsg = result.response
                        ? result.response.data
                            ? result.response.data.message
                            : 'Something went wrong'
                        : 'Something went wrong';
                    dispatch(deleteProductFailure(errorMsg));
                } else if (result.data.status !== 'Failed') {
                    dispatch(deleteProductSuccess(result.data.message));
                } else {
                    dispatch(deleteProductFailure('Something went wrong'));
                }
            })
            .catch((error) => {
                dispatch(deleteProductFailure('Something went wrong'));
            });
    };
};
