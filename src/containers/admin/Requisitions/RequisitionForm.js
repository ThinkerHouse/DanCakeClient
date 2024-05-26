import React from 'react';
import { useFormik } from 'formik';

import AdminForm from '../../../components/admin/AdminForm/AdminForm';
import FormField from '../../../components/common/FormFileds/Admin/FormField';
import RequisitionSchema from '../../../schemas/RequisitionSchema';
import { statusOptions } from '../../../constants';

const RequisitionForm = (props) => {
    const { initialValues, onSubmit, disableCheck, userList, unitsList, materialsList, departmentsList, productionsList } = props;

    const formik = useFormik({
        initialValues: initialValues || {
            expected_delivery_date: '',
            department: '',
            remarks: '',
            status: '',
            requisition_items: [
                {
                    material: '',
                    quantity: '',
                    // unit: ''
                }
            ]
        },
        validationSchema: RequisitionSchema,
        onSubmit,
    });

    const handleRowAdd = () => {
        formik.setFieldValue('requisition_items', [
            ...formik.values.requisition_items,
            { material: '', quantity: '', unit: '' }
        ]);
    };

    const handleRowRemove = (indexToRemove) => {
        formik.setFieldValue(
            'requisition_items',
            formik.values.requisition_items.filter((item, index) => index !== indexToRemove)
        );
    };

    return (
        <AdminForm formik={formik} onBtnCancelClick={props.onCancel} hideSave={disableCheck}>
            <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full">
                        <FormField type="text" label={"Batch No"} id={"batch_no"} formik={formik} disabled={disableCheck ? true : false} />
                    </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-full">
                        <FormField type="select" label="Department" id="department" options={departmentsList} formik={formik} disabled={disableCheck} />
                    </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <FormField type="date" label={"Delivery date"} id={"delivery_at"} formik={formik} disabled={disableCheck ? true : false} />
                    </div>

                    <div className="w-full xl:w-1/2">
                        <FormField type="date" label={"Expected delivery date"} id={"expected_delivery_date"} formik={formik} disabled={disableCheck ? true : false} />
                    </div>
                </div>

                {disableCheck && (
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-full">
                            <FormField type="select" label="Approved" id="approved_by" options={userList} formik={formik} disabled={disableCheck} />
                        </div>
                        <div className="w-full xl:w-full">
                            <FormField type="select" label="Author" id="created_by" options={userList} formik={formik} disabled={disableCheck} />
                        </div>
                        <div className="w-full xl:w-full">
                            <FormField type="select" label="Updated By" id="updated_by" options={userList} formik={formik} disabled={disableCheck} />
                        </div>
                    </div>
                )}

                <div className="mb-4.5 flex flex-col gap-1 xl:flex-row">
                    <div className="w-full">
                        <FormField type="text" label="Remarks" id="remarks" formik={formik} disabled={disableCheck} />
                    </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-full">
                        <FormField type="select" label="Status" id="status" options={statusOptions} formik={formik} disabled={disableCheck} />
                    </div>
                </div>

                <div className="mt-15">
                    <div className="flex justify-between items-center py-4 px-6.5">
                        <h4 className="text-title-md2 font-semibold text-black dark:text-white">Requisition Items</h4>

                        <button
                            className="border-primary text-primary py-2 px-8 rounded-md border text-gray font-medium rounded"
                            onClick={handleRowAdd}
                            type='button'
                        >
                            Add Item
                        </button>
                    </div>

                    {formik?.values?.requisition_items?.map((item, index) => (
                        <div key={index} className="flex flex-col gap-6 xl:flex-row mb-6 mt-10">
                            <div className="w-full xl:w-1/4">
                                <label className="mb-2.5 block text-black dark:text-white">material</label>
                                <select
                                    id={`requisition_items[${index}].material`}
                                    name={`requisition_items[${index}].material`}
                                    value={formik.values.requisition_items[index]['material']}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={disableCheck}
                                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                >
                                    <option value="">Select material</option>
                                    {materialsList.map((material, materialIndex) => {
                                        const materialAlreadySelected = formik.values.requisition_items.some((item) => item.material === material.value);
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
                                {formik.errors.requisition_items && formik.errors.requisition_items[index] && formik.errors.requisition_items[index].material && (
                                    <p className="text-sm text-[#F87171] mt-1">{formik.errors.requisition_items[index].material}</p>
                                )}
                            </div>

                            {/* <div className="w-full xl:w-1/4">
                                <label className="mb-2.5 block text-black dark:text-white">Units</label>
                                <select
                                    id={`requisition_items[${index}].unit`}
                                    name={`requisition_items[${index}].unit`}
                                    value={formik.values.requisition_items[index]['unit']}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={disableCheck}
                                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                >
                                    <option value="">Select material</option>
                                    {unitsList.map((unit, unitIndex) => {
                                        const unitAlreadySelected = formik.values.requisition_items.some((item) => item.unit === unit.value);
                                        return (
                                            <option
                                                key={unitIndex}
                                                value={unit.value}
                                                disabled={unitAlreadySelected}
                                            >
                                                {unit.label}
                                            </option>
                                        );
                                    })}
                                </select>
                                {formik.errors.requisition_items && formik.errors.requisition_items[index] && formik.errors.requisition_items[index].material && (
                                    <p className="text-sm text-[#F87171] mt-1">{formik.errors.requisition_items[index].material}</p>
                                )}
                            </div> */}

                            <div className="w-full xl:w-1/4">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Quantity
                                </label>
                                <input
                                    type="text"
                                    id={`requisition_items[${index}].quantity`}
                                    name={`requisition_items[${index}].quantity`}
                                    value={formik.values.requisition_items[index]['quantity']}
                                    onChange={formik.handleChange}
                                    onBlur={() => {
                                        formik.handleBlur(`requisition_items[${index}].quantity`);
                                    }}
                                    placeholder=""
                                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                    disabled={disableCheck}
                                />
                                {formik.errors.requisition_items && formik.errors.requisition_items[index] && formik.errors.requisition_items[index].quantity && (
                                    <p className="text-sm text-[#F87171] mt-1">{formik.errors.requisition_items[index].quantity}</p>
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

export default RequisitionForm;
