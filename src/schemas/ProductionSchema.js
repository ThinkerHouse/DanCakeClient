import * as yup from 'yup';

const ProductionSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	expected_delivery_date: yup.date().required('Expected delivery date is required'),
	production_plant: yup.string().required('Vendor is required'),
	remarks: yup.string(),
	status: yup.string().required('Status is required'),
	production_items: yup.array().of(
        yup.object().shape({
            product: yup.string().required('Product is required'),
            // unit: yup.string().required('Unit is required'),
            quantity: yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
        })
    ).min(1, 'At least one item is required in purchase order items')
});

export default ProductionSchema;
