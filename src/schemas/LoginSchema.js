// loginSchema.js
import * as yup from 'yup';

const LoginSchema = yup.object({
	email: yup.string().email('Invalid email address').required('Email is required'),
	password: yup.string().required('Password is required').min(6, 'Password length must be at least 6 characters long'),
});

export default LoginSchema;
