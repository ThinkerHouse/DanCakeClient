import * as yup from 'yup';

const RequisitionSchema = yup.object().shape({
	expected_delivery_date: yup.date().required('Expected delivery date is required'),
	department: yup.string().required('Department is required'),
	production: yup.string().required('Required'),
	remarks: yup.string(),
	status: yup.string().required('Status is required'),
	requisition_items: yup.array().of(
        yup.object().shape({
            material: yup.string().required('Product is required'),
            unit: yup.string().required('Unit is required'),
            quantity: yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
        })
    ).min(1, 'At least one item is required in purchase order items')
});

export default RequisitionSchema;
