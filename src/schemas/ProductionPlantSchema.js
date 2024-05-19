// import { object } from 'prop-types';
import * as yup from 'yup';


const ProductionPlantSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	capacity: yup.string().required('Capacity is required'),
	description: yup.string().required('Description is required'),
	location: yup.string().required('Location is required'),
	user: yup.string().required('User is required'),
	status: yup.string().required('Status is required'),
});

export default ProductionPlantSchema;
