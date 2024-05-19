import * as yup from 'yup';
const userTypeOptions = ['vendor', 'administrator'];


const allowedExtensions = ['jpg', 'jpeg', 'png', 'svg'];


const UserSchema = yup.object().shape({
	username: yup.string().required('Name is required'),
	email: yup.string().email('Invalid email address').required('Email is required'),
	phone: yup.string().required('Phone number is required').min(11, 'Phone number must be at least 11 characters'),
	first_name: yup.string(),
	last_name: yup.string(),
	dob: yup.string().nullable(),
	address: yup.string(),
	is_active: yup.string().required('Status is required'),
	user_type: yup.string().oneOf(userTypeOptions, 'Invalid user type').required('User type is required'),
	isImageRequired: yup.boolean().default(false),
	image: yup
		.mixed()
		.test('required', 'Image is required', function (value) {
			const isImageRequired = this.resolve(yup.ref('isImageRequired'));
			if (isImageRequired && (!value || !value.length)) {
				return this.createError({ message: 'Image is required' });
			}
			return true;
		})
		.test(
			'fileType',
			'Invalid file type. Please select a valid image (JPEG, JPG, PNG).',
			(value) => {
				if (!value) {
					return true;
				}
				let fileExtension;
				if (typeof value === 'object') {
					fileExtension = value[0]?.name?.split('.')?.pop()?.toLowerCase();
				} else if (typeof value === 'string') {
					fileExtension = value?.split('.')?.pop()?.toLowerCase();
				}

				return allowedExtensions.includes(fileExtension);
			}
		)
});

export default UserSchema;