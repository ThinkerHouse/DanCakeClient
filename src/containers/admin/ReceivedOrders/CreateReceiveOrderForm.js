import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import AdminForm from '../../../components/admin/AdminForm/AdminForm';
import FormField from '../../../components/common/FormFileds/Admin/FormField';
import ReceivedOrderSchema from '../../../schemas/ReceivedOrderSchema';
import { receivedOrderStatusOptions, storageTypeOptions } from '../../../constants';

const CreateReceiveOrderForm = (props) => {
	const { onSubmit, disableCheck, userList, materialsList, purchaseOrdersList } = props;

	let initVal = {
		batch_no: "",
		purchase_order: '',
		received_date: '',
		remarks: '',
		status: '',
		received_order_items: [
			{
				purchase_order_item: '',
				storage_condition: '',
				quantity: '',
			}
		]
	}

	const formik = useFormik({
		initialValues: initVal,
		validationSchema: ReceivedOrderSchema,
		onSubmit,
	});

	

	let handleRowAdd = () => {
		const newItem = {
			purchase_order_item: '',
			storage_condition: '',
			quantity: '',
		};

		const newItemsArray = [...formik.values.received_order_items, newItem];

		formik.setValues({
			...formik.values,
			received_order_items: newItemsArray
		});
	}

	const handleRowRemove = (indexToRemove) => {
		const updatedItems = [...formik.values.received_order_items];
		updatedItems.splice(indexToRemove, 1);
		formik.setFieldValue('received_order_items', updatedItems);
	};

	return (
		<AdminForm formik={formik} onBtnCancelClick={props.onCancel} hideSave={disableCheck}>
			<div className="p-6.5">
				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-1/2">
						<FormField type="text" label={"Batch No"} id={"batch_no"} formik={formik} disabled={disableCheck ? true : false} />
					</div>

					<div className="w-full xl:w-1/2">
						<FormField type="select" label="Purchase Order" id="purchase_order" options={purchaseOrdersList} formik={formik} disabled={disableCheck} />
					</div>
				</div>

				<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
					<div className="w-full xl:w-1/2">
						<FormField type="date" label={"Delivery date"} id={"received_date"} formik={formik} disabled={disableCheck ? true : false} />
					</div>

					<div className="w-full xl:w-1/2">
						<FormField type="select" label="Status" id="status" options={receivedOrderStatusOptions} formik={formik} disabled={disableCheck} />
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
					{formik?.values?.received_order_items?.map((item, index) => (
						<div key={index} className="flex flex-col gap-6 xl:flex-row mb-6 mt-10">
							<div className="w-full xl:w-1/4">
								<label className="mb-2.5 block text-black dark:text-white">Purchase Order Item</label>
								<select
									id={`received_order_items[${index}].purchase_order_item`}
									name={`received_order_items[${index}].purchase_order_item`}
									value={formik.values.received_order_items[index]['purchase_order_item']}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									disabled={disableCheck}
									className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
								>
									<option value="">Select Item</option>
									{materialsList.map((purchaseOrderItem, purchaseOrderItemIndex) => {
										const materialAlreadySelected = formik.values.received_order_items.some((item) => item.purchase_order_item === purchaseOrderItem.value);
										return (
											<option
												key={purchaseOrderItemIndex}
												value={purchaseOrderItem.value}
												disabled={materialAlreadySelected}
											>
												{purchaseOrderItem.label}
											</option>
										);
									})}
								</select>
								{formik.errors.received_order_items && formik.errors.received_order_items[index] && formik.errors.received_order_items[index].purchase_order_item && (
									<p className="text-sm text-[#F87171] mt-1">{formik.errors.received_order_items[index].purchase_order_item}</p>
								)}
							</div>

							<div className="w-full xl:w-1/4">
								<label className="mb-2.5 block text-black dark:text-white">Storage Condition</label>
								<select
									id={`received_order_items[${index}].storage_condition`}
									name={`received_order_items[${index}].storage_condition`}
									value={formik.values.received_order_items[index]['storage_condition']}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									disabled={disableCheck}
									className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
								>
									<option value="">Select</option>
									{storageTypeOptions.map((storageCondition, storageConditionIndex) => {
										return (
											<option
												key={storageConditionIndex}
												value={storageCondition.value}
											>
												{storageCondition.label}
											</option>
										);
									})}
								</select>
								{formik.errors.received_order_items && formik.errors.received_order_items[index] && formik.errors.received_order_items[index].storage_condition && (
									<p className="text-sm text-[#F87171] mt-1">{formik.errors.received_order_items[index].storage_condition}</p>
								)}
							</div>


							<div className="w-full xl:w-1/4">
								<label className="mb-2.5 block text-black dark:text-white">
									Quantity
								</label>
								<input
									type="text"
									id={`received_order_items[${index}].quantity`}
									name={`received_order_items[${index}].quantity`}
									value={formik.values.received_order_items[index]['quantity']}
									onChange={formik.handleChange}
									onBlur={() => {
										formik.handleBlur(`received_order_items[${index}].quantity`)
									}}
									placeholder=""
									className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
									disabled={disableCheck}
								/>
								{formik.errors.received_order_items && formik.errors.received_order_items[index] && formik.errors.received_order_items[index].quantity && (
									<p className="text-sm text-[#F87171] mt-1">{formik.errors.received_order_items[index].quantity}</p>
								)}
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

export default CreateReceiveOrderForm;
