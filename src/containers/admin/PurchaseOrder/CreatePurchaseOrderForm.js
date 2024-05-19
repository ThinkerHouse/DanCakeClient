import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import AdminForm from '../../../components/admin/AdminForm/AdminForm';
import FormField from '../../../components/common/FormFileds/Admin/FormField';
import PurchaseOrderSchema from '../../../schemas/PurchaseOrderSchema';
import { statusOptions } from '../../../constants';

const CreatePurchaseOrderForm = (props) => {
	const { onSubmit, disableCheck, userList, materialsList } = props;

	let initVal = {
		tracking_id: "",
		order_date: '',
		expected_delivery_date: '',
		remarks: '',
		total_amount: '',
		vendor: '',
		status: '',
		purchase_order_items: [
			{
				material: '',
				quantity: '',
				unit_price: '',
				total: ''
			}
		]
	}

	const formik = useFormik({
		initialValues: initVal,
		validationSchema: PurchaseOrderSchema,
		onSubmit,
	});

	let handleRowAdd = () => {
		const newItem = {
			material: '',
			quantity: '',
			unit_price: '',
			total: ''
		};

		const newItemsArray = [...formik.values.purchase_order_items, newItem];

		formik.setValues({
			...formik.values,
			purchase_order_items: newItemsArray
		});
	}

	const handleRowRemove = (indexToRemove) => {
		// Create a copy of the purchase_order_items array
		const updatedItems = [...formik.values.purchase_order_items];

		// Remove the item at the specified index
		updatedItems.splice(indexToRemove, 1);

		// Update the formik values with the modified array
		formik.setFieldValue('purchase_order_items', updatedItems);
	};


	const calculateTotalPrice = (quantity, unitPrice) => {
		return quantity * unitPrice;
	};

	const handlePriceChange = (index) => {
		const quantity = formik.values.purchase_order_items[index]['quantity'];
		const unitPrice = formik.values.purchase_order_items[index]['unit_price'];
		const totalPrice = calculateTotalPrice(quantity, unitPrice);

		formik.setFieldValue(`purchase_order_items[${index}].total`, totalPrice);
	};


	useEffect(() => {
		let totalAmount = 0;
		formik.values.purchase_order_items.forEach((item) => {
			if (item.total) {
				totalAmount += item.total;
			}
		});
		formik.setFieldValue('total_amount', totalAmount);
	}, [formik.values])

	return (
		<AdminForm formik={formik} onBtnCancelClick={props.onCancel} hideSave={disableCheck}>
			<div className="p-6.5">
				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full">
						<FormField type="text" label={"Tracking Id"} id={"tracking_id"} formik={formik} disabled={disableCheck ? true : false} />
					</div>
				</div>

				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-1/2">
						<FormField type="date" label={"Order Date"} id={"order_date"} formik={formik} disabled={disableCheck ? true : false} />
					</div>

					<div className="w-full xl:w-1/2">
						<FormField type="date" label={"Expected delivery date"} id={"expected_delivery_date"} formik={formik} disabled={disableCheck ? true : false} />
					</div>
				</div>

				<div className="mb-4.5 flex flex-col gap-1 xl:flex-row">
					<div className="w-full">
						<FormField type="text" label="Remarks" id="remarks" formik={formik} disabled={disableCheck} />
					</div>
				</div>

				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-full">
						<FormField type="select" label="Vendor" id="vendor" options={userList} formik={formik} disabled={disableCheck} />
					</div>

					<div className="w-full xl:w-full">
						<FormField type="select" label="Status" id="status" options={statusOptions} formik={formik} disabled={disableCheck} />
					</div>
				</div>

				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full">
						<FormField type="text" label={"Total amount"} id={"total_amount"} formik={formik} disabled={true} />
					</div>
				</div>

				<div className="mt-15">
					<div className="flex justify-between items-center py-4 px-6.5">
						<h4 className="text-title-md2 font-semibold text-black dark:text-white">Purchase Order Items</h4>

						<button
							className="border-primary text-primary py-2 px-8 rounded-md border text-gray font-medium rounded"
							onClick={handleRowAdd}
							type='button'
						>
							Add Item
						</button>

					</div>
					{formik?.values?.purchase_order_items?.map((item, index) => (
						<div key={index} className="flex flex-col gap-6 xl:flex-row mb-6 mt-10">
							<div className="w-full xl:w-1/4">
								<label className="mb-2.5 block text-black dark:text-white">Material</label>
								<select
									id={`purchase_order_items[${index}].material`}
									name={`purchase_order_items[${index}].material`}
									value={formik.values.purchase_order_items[index]['material']}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									disabled={disableCheck}
									className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
								>
									<option value="">Select Material</option>
									{materialsList.map((material, materialIndex) => {
										const materialAlreadySelected = formik.values.purchase_order_items.some((item) => item.material === material.value);
										return (
											<option
												key={materialIndex}
												value={material.value}
												disabled={materialAlreadySelected}
											>
												{material.label}
											</option>
										);
									})}
								</select>
								{formik.errors.purchase_order_items && formik.errors.purchase_order_items[index] && formik.errors.purchase_order_items[index].material && (
									<p className="text-sm text-[#F87171] mt-1">{formik.errors.purchase_order_items[index].material}</p>
								)}
							</div>
							<div className="w-full xl:w-1/4">
								<label className="mb-2.5 block text-black dark:text-white">
									Quantity
								</label>
								<input
									type="text"
									id={`purchase_order_items[${index}].quantity`}
									name={`purchase_order_items[${index}].quantity`}
									value={formik.values.purchase_order_items[index]['quantity']}
									onChange={formik.handleChange}
									onBlur={() => {
										formik.handleBlur(`purchase_order_items[${index}].quantity`);
										handlePriceChange(index);
									}}
									placeholder=""
									className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
									disabled={disableCheck}
								/>
								{formik.errors.purchase_order_items && formik.errors.purchase_order_items[index] && formik.errors.purchase_order_items[index].quantity && (
									<p className="text-sm text-[#F87171] mt-1">{formik.errors.purchase_order_items[index].quantity}</p>
								)}
							</div>

							<div className="w-full xl:w-1/4">
								<label className="mb-2.5 block text-black dark:text-white">
									Unit Price
								</label>
								<input
									type="text"
									id={`purchase_order_items[${index}].unit_price`}
									name={`purchase_order_items[${index}].unit_price`}
									value={formik.values.purchase_order_items[index]['unit_price']}
									onChange={formik.handleChange}
									onBlur={() => {
										formik.handleBlur(`purchase_order_items[${index}].unit_price`);
										handlePriceChange(index);
									}}
									placeholder=""
									className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
									disabled={disableCheck}
								/>

								{formik.errors.purchase_order_items && formik.errors.purchase_order_items[index] && formik.errors.purchase_order_items[index].unit_price && (
									<p className="text-sm text-[#F87171] mt-1">{formik.errors.purchase_order_items[index].unit_price}</p>
								)}
							</div>
							<div className="w-full xl:w-1/4">
								<label className="mb-2.5 block text-black dark:text-white">
									Total Price
								</label>
								<input
									type="text"
									id={`purchase_order_items[${index}].total`}
									name={`purchase_order_items[${index}].total`}
									value={formik.values.purchase_order_items[index]['total']}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder=""
									className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
									disabled="True"
								/>
							</div>

							<div className="w-full xl:w-1/12">
								<label className="mb-10 block text-black dark:text-white"></label>
								<button
									type="button"
									className="flex justify-center rounded bg-danger py-2 px-4 font-medium text-gray hover:bg-opacity-70"
									onClick={() => handleRowRemove(index)}
								>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
									</svg>
								</button>
							</div>
						</div>





					))}
				</div>
			</div>

		</AdminForm>
	);
};

export default CreatePurchaseOrderForm;
