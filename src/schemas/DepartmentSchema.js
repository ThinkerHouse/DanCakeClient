// import { object } from 'prop-types';
import * as yup from 'yup';


const DepartmentSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	user: yup.string().required('User is required'),
	status: yup.string().required('Status is required'),
});

export default DepartmentSchema;
