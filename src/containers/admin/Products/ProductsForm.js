import React from 'react';
import { useFormik } from 'formik';

import AdminForm from '../../../components/admin/AdminForm/AdminForm';
import FormField from '../../../components/common/FormFileds/Admin/FormField';
import ProductSchema from '../../../schemas/ProductSchema';
import { activeStatusOptions } from '../../../constants';

const ProductForm = (props) => {
	const { initialValues, onSubmit, onCancel, disableCheck } = props;

	const formik = useFormik({
		initialValues: initialValues || { name: '', sku: '', description: '', status: '' },
		validationSchema: ProductSchema,
		onSubmit,
	});

	return (
		<AdminForm formik={formik} onBtnCancelClick={onCancel}>
			<div className="p-6.5">
				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-1/2">
						<FormField type="text" label="Name" id="name" formik={formik} />
					</div>

					<div className="w-full xl:w-1/2">
						<FormField type="text" label="SKU" id="sku" formik={formik} />
					</div>
				</div>

				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-full">
						<FormField type="text" label="Descrption" id="description" formik={formik} disabled={disableCheck} />
					</div>
				</div>

				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-full">
						<FormField type="select" label="Status" id="status" options={activeStatusOptions} formik={formik} />
					</div>
				</div>
			</div>
		</AdminForm>
	);
};

export default ProductForm;
