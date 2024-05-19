import React from 'react';
import { useFormik } from 'formik';

import AdminForm from '../../../components/admin/AdminForm/AdminForm';
import FormField from '../../../components/common/FormFileds/Admin/FormField';
import WareHouseSchema from '../../../schemas/WareHouseSchema';
import { activeStatusOptions } from '../../../constants';



const WarehouseForm = (props) => {
	const { initialValues, onSubmit, disableCheck, userList } = props;

	let initVal = {
		name: '',
		address: '',
		capacity: '',
		user: '',
		status: ''
	}
	const formik = useFormik({
		initialValues: initialValues || initVal,
		validationSchema: WareHouseSchema,
		onSubmit,
	});


	return (
		<AdminForm formik={formik} onBtnCancelClick={props.onCancel} hideSave={disableCheck}>
			<div className="p-6.5">
				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-1/2">
						<FormField type="text" label={"Name"} id={"name"} formik={formik} disabled={disableCheck ? true : false} />
					</div>

					<div className="w-full xl:w-1/2">
						<FormField type="text" label={"Capacity"} id={"capacity"} formik={formik} disabled={disableCheck ? true : false} />
					</div>
				</div>

				<div className="mb-4.5 flex flex-col gap-1 xl:flex-row">
					<div className="w-full">
						<FormField type="text" label="Address" id="address" formik={formik} disabled={disableCheck} />
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

export default WarehouseForm;
