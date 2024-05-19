// import { object } from 'prop-types';
import * as yup from 'yup';


const MaterialSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	storage_type: yup.string().required('Storage type is required'),
	unit: yup.string().required('Unit is required'),
	material_type: yup.string().required('Material type is required'),
	status: yup.string().required('Status is required'),
});

export default MaterialSchema;
