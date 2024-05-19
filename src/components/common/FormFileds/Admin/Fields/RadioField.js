import React from 'react';

const RadioField = ({ formik, data, name, ...props }) => {
    const radioButtons = data.map(({ id, label, value }) => (
        <div key={id} className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label htmlFor={id} className="flex cursor-pointer select-none items-center">
                <div className="relative">
                    <input type="radio" id={id} name={name} value={value} className="sr-only" onChange={formik.handleChange}/>
                    <div className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${formik.values[name] === id ? 'border-primary' : ''}`}>
                        <span className={`h-2.5 w-2.5 rounded-full bg-transparent ${formik.values[name] == value ? '!bg-primary' : 'bg-primary'}`}></span>
                    </div>
                </div>
                {label}
            </label>

        </div>
    ));

    return (
        <>
            {radioButtons}
            <div>
                {(formik.touched[name] && formik.errors[name]) && (
                    <p className="text-sm text-[#F87171] mt-1">{formik.errors[name]}</p>
                )}
            </div>
        </>
    );
};

export default RadioField;
