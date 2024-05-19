// import { object } from 'prop-types';
import * as yup from 'yup';


const CheckListSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	type: yup.string().required('Type is required'),
	status: yup.string().required('Status is required'),
});

export default CheckListSchema;
