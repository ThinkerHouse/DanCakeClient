// import { object } from 'prop-types';
import * as yup from 'yup';


const RoleSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
});

export default RoleSchema;
