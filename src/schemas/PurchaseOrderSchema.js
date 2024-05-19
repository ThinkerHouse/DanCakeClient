import * as yup from 'yup';

const PurchaseOrderSchema = yup.object().shape({
	tracking_id: yup.string().required('Tracking id is required'),
	order_date: yup.date().required('Order date is required'),
	expected_delivery_date: yup.date().required('Expected delivery date is required'),
	remarks: yup.string(),
	total_amount: yup.number().required('Total amount is required').positive('Total amount must be a positive number'),
	vendor: yup.string().required('Vendor is required'),
	status: yup.string().required('Status is required'),
	purchase_order_items: yup.array().of(
        yup.object().shape({
            material: yup.string().required('Material is required'),
            quantity: yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
            unit_price: yup.number().required('Unit price is required').positive('Unit price must be a positive number'),
            total: yup.number().required('Total price is required').positive('Total price must be a positive number')
        })
    ).min(1, 'At least one item is required in purchase order items')
});

export default PurchaseOrderSchema;
