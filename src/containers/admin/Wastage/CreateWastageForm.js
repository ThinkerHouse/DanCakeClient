import React from 'react';
import { useFormik } from 'formik';

import AdminForm from '../../../components/admin/AdminForm/AdminForm';
import FormField from '../../../components/common/FormFileds/Admin/FormField';
import WastageSchema from '../../../schemas/WastageSchema';
import { wastageFromOptions, wastageTypeOptions } from '../../../constants';

const CreateWastageForm = (props) => {
    const { onSubmit, disableCheck, productsList, unitsList } = props;

    const initVal = {
        item_id: '',
        item_name: '',
        reference_id: '',
        quantity: '',
        batch_no: '',
        unit_id: '',
        remarks: '',
        wastage_from: '',
        wastage_type: '',
    };

    const formik = useFormik({
        initialValues: initVal,
        validationSchema: WastageSchema,
        onSubmit,
    });

    const handleRowAdd = () => {
        const newItem = {
            product: '',
            quantity: '',
        };

        const newItemsArray = [...formik.values.production_items, newItem];

        formik.setValues({
            ...formik.values,
            production_items: newItemsArray,
        });
    };

    const handleRowRemove = (indexToRemove) => {
        const updatedItems = [...formik.values.production_items];
        updatedItems.splice(indexToRemove, 1);
        formik.setFieldValue('production_items', updatedItems);
    };

    return (
        <AdminForm formik={formik} onBtnCancelClick={props.onCancel} hideSave={disableCheck}>
            <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full">
                        <FormField type="select" label="Item" id="item_id" options={productsList} formik={formik} disabled={disableCheck} />
                    </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <FormField type="text" label="Reference ID" id="reference_id" formik={formik} disabled={disableCheck} />
                    </div>

                    <div className="w-full xl:w-1/2">
                        <FormField type="text" label="Batch No" id="batch_no" formik={formik} disabled={disableCheck} />
                    </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <FormField type="number" label="Quantity" id="quantity" formik={formik} disabled={disableCheck} />
                    </div>

                    <div className="w-full xl:w-1/2">
                        <FormField type="select" label="Unit" id="unit_id" options={unitsList} formik={formik} disabled={disableCheck} />
                    </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-full">
                        <FormField type="select" label="Wastage From" id="wastage_from" options={wastageFromOptions} formik={formik} disabled={disableCheck} />
                    </div>

                    <div className="w-full xl:w-full">
                        <FormField type="select" label="Wastage Type" id="wastage_type" options={wastageTypeOptions} formik={formik} disabled={disableCheck} />
                    </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-1 xl:flex-row">
                    <div className="w-full">
                        <FormField type="text" label="Remarks" id="remarks" formik={formik} disabled={disableCheck} />
                    </div>
                </div>
            </div>
        </AdminForm>
    );
};

export default CreateWastageForm;
