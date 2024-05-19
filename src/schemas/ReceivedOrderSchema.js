import * as yup from 'yup';

const ReceivedOrderSchema = yup.object().shape({
    batch_no: yup.string().required('Batch number is required'),
    purchase_order: yup.string().required('Purchase order is required'),
    received_date: yup.date().required('Received date is required'),
    remarks: yup.string(),
    status: yup.string().required('Status is required'),
    received_order_items: yup.array().of(
        yup.object().shape({
            purchase_order_item: yup.string().required('Purchase order item is required'),
            storage_condition: yup.string().required('Storage condition is required'),
            quantity: yup.number().required('Quantity is required').positive('Quantity must be a positive number')
        })
    ).min(1, 'At least one item is required in received order items')
});

export default ReceivedOrderSchema;
