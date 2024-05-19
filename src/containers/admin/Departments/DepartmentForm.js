import React from 'react';
import { useFormik } from 'formik';

import AdminForm from '../../../components/admin/AdminForm/AdminForm';
import FormField from '../../../components/common/FormFileds/Admin/FormField';
import DepartmentSchema from '../../../schemas/DepartmentSchema';
import { activeStatusOptions } from '../../../constants';



const DepartmentForm = (props) => {
	const { initialValues, onSubmit, disableCheck, userList } = props;

	let initVal = {
		name: '',
		user: '',
		status: ''
	}
	const formik = useFormik({
		initialValues: initialValues || initVal,
		validationSchema: DepartmentSchema,
		onSubmit,
	});


	return (
		<AdminForm formik={formik} onBtnCancelClick={props.onCancel} hideSave={disableCheck}>
			<div className="p-6.5">
				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-full">
						<FormField type="text" label={"Name"} id={"name"} formik={formik} disabled={disableCheck ? true : false} />
					</div>
				</div>

				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-full">
						<FormField type="select" label="User" id="user" options={userList} formik={formik} disabled={disableCheck} />
					</div>

					<div className="w-full xl:w-full">
						<FormField type="select" label="Status" id="status" options={activeStatusOptions} formik={formik} disabled={disableCheck} />
					</div>
				</div>
			</div>

		</AdminForm>
	);
};

export default DepartmentForm;
