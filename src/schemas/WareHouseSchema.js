// import { object } from 'prop-types';
import * as yup from 'yup';


const WareHouseSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	capacity: yup.string().required('Capacity is required'),
	address: yup.string().required('Address is required'),
	user: yup.string().required('User is required'),
	status: yup.string().required('Status is required'),
});

export default WareHouseSchema;
