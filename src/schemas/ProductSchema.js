import * as yup from 'yup';

const ProductSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    sku: yup.string().required('SKU is required'),
    description: yup.string().nullable(),
    status: yup.string().required('Status is required'),
});

export default ProductSchema;
