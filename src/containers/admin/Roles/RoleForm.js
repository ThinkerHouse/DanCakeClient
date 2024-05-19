import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import AdminForm from '../../../components/admin/AdminForm/AdminForm';
import FormField from '../../../components/common/FormFileds/Admin/FormField';
import RoleSchema from '../../../schemas/RoleSchema';
import { MultiSelect } from '../../../components/admin/MultiSelect/MultiSelect';



const RoleForm = (props) => {
	const { initialValues, onSubmit, disableCheck, permissions, setSelectedOptions, selectedOptions } = props;

	let initVal = {
		name: '',
		permissions: []
	}
	const formik = useFormik({
		initialValues: initialValues || initVal,
		validationSchema: RoleSchema,
		onSubmit,
	});

	useEffect(() => {
		if (initialValues?.permissions) {
			let initiaPermissions = [];
			for (const permissionId of initialValues?.permissions) {
				let findPermissions = permissions?.find((item) => item?.value === permissionId)
				initiaPermissions?.push(findPermissions)
			}
			setSelectedOptions(initiaPermissions)
		}else{
			setSelectedOptions([])
		}
	}, [initialValues?.permissions]);

	return (
		<AdminForm formik={formik} onBtnCancelClick={props.onCancel} hideSave={disableCheck}>
			<div className="p-6.5">
				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-full">
						<FormField type="text" label={"Name"} id={"name"} formik={formik} disabled={disableCheck ? true : false} />
					</div>
				</div>
			</div>

			<div className="p-6.5">
				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-full">
						<MultiSelect
							required={false}
							optionsData={permissions || []}
							selectedOptions={selectedOptions}
							setSelectedOptions={setSelectedOptions}
							label="Permissions"
							placeholder="Select Permissions"
							isDisabled={disableCheck}
						/>
					</div>
				</div>
			</div>
		</AdminForm>
	);
};

export default RoleForm;
