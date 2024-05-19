import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import AdminForm from '../../../components/admin/AdminForm/AdminForm';
import FormField from '../../../components/common/FormFileds/Admin/FormField';
import UserSchema from '../../../schemas/UserSchema';
import { activeStatusOptions, userTypeOptions } from '../../../constants';
import FileUpload from '../../../components/common/FormFileds/Admin/FileUpload';
import { MultiSelect } from '../../../components/admin/MultiSelect/MultiSelect';



const UserForm = (props) => {
	const { initialValues, onSubmit, roles, setSelectedOptions, selectedOptions, disableCheck } = props;

	let initVal = {
		username: '',
		email: '',
		phone: '',
		first_name: "",
		last_name: "",
		dob: "",
		address: '',
		is_active: '',
		user_type: 'administrator',
		image: '',
		isImageRequired: true
	}

	const formik = useFormik({
		initialValues: initialValues || initVal,
		validationSchema: UserSchema,
		onSubmit,
	});

	useEffect(() => {
		if (initialValues?.groups) {
			let initiaGroups = [];
			for (const groupsId of initialValues?.groups) {
				let findGroup = roles?.find((item) => item?.value === groupsId.id)
				initiaGroups?.push(findGroup)
			}

			setSelectedOptions(initiaGroups)
		} else {
			setSelectedOptions([])
		}
	}, [initialValues?.groups]);

	return (
		<AdminForm formik={formik} onBtnCancelClick={props.onCancel} hideSave={disableCheck}>
			<FileUpload formik={formik} id={"image"} />

			<div className="p-6.5">
				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-1/2">
						<FormField type="text" label="Username" id="username" formik={formik} disabled={disableCheck} />
					</div>

					<div className="w-full xl:w-1/2">
						<FormField type="text" label="Email" id="email" formik={formik} disabled={disableCheck} />
					</div>
				</div>

				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-1/2">
						<FormField type="text" label="First Name" id="first_name" formik={formik} disabled={disableCheck} />
					</div>

					<div className="w-full xl:w-1/2">
						<FormField type="text" label="Last Name" id="last_name" formik={formik} disabled={disableCheck} />
					</div>

				</div>

				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-1/2">
						<FormField type="text" label="Phone No" id="phone" formik={formik} disabled={disableCheck} />
					</div>

					<div className="w-full xl:w-1/2">
						<FormField type="date" label="Date Of Birth" id="dob" formik={formik} disabled={disableCheck} />
					</div>
				</div>

				<div className="mb-4.5 flex flex-col gap-1 xl:flex-row">
					<div className="w-full">
						<FormField type="text" label="Address" id="address" formik={formik} disabled={disableCheck} />
					</div>
				</div>

				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-1/2">
						<MultiSelect
							required={false}
							optionsData={roles || []}
							selectedOptions={selectedOptions}
							setSelectedOptions={setSelectedOptions}
							label="Roles"
							placeholder="Select Roles"
							isDisabled={disableCheck}
						/>
					</div>

					<div className="w-full xl:w-1/2">
						<FormField type="select" label="Status" id="is_active" options={activeStatusOptions} formik={formik} disabled={disableCheck} />
					</div>
				</div>
			</div>
		</AdminForm>
	);
};

export default UserForm;
