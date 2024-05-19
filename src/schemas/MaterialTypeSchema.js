// import { object } from 'prop-types';
import * as yup from 'yup';


const MaterialTypeSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	status: yup.string().required('Status is required'),
});

export default MaterialTypeSchema;
