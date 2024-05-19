import React from 'react';
import moment from 'moment';


const DateField = ({ label, id, formik, ...props }) => {
    const formattedDate = moment(formik.values[id]).format('YYYY-MM-DD');

    return (
        <>
            <label className="mb-2.5 block text-black dark:text-white">
                {label}
            </label>
            <input
                type="date"
                id={id}
                name={id}
                value={formattedDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  ${formik.touched[id] && formik.errors[id] ? 'border-[#F87171]' : ''
                    }`}
                {...props}
            />
            {formik.touched[id] && formik.errors[id] && (
                <p className="text-sm text-[#F87171] mt-1">{formik.errors[id]}</p>
            )}
        </>
    );
};

export default DateField;
