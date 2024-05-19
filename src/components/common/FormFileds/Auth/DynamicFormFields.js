import React from 'react';

const DynamicFormFields = ({ formik, fields }) => {
	return (
		<>
			{fields.map((field) => (
				<div key={field?.name} className="mb-4 relative">
					{/* <label
						htmlFor={field?.name}
						className={`absolute text-gray-700 text-sm font-semibold -top-3 left-4 bg-white px-1`}
					>
						{field?.label}
					</label> */}

					<label className="mb-2.5 block font-medium text-black dark:text-white">
						{field?.label}
					</label>
					<input
						type={field?.type}
						id={field?.name}
						name={field?.name}
						value={formik.values[field?.name]}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${formik.touched[field?.name] && formik.errors[field?.name]
							? 'border-[#F87171]'
							: ''
							}`}
					/>
					{formik.touched[field?.name] && formik.errors[field?.name] && (
						<p className="text-sm text-[#F87171] mt-1">
							{formik.errors[field?.name]}
						</p>
					)}
				</div>
			))}
		</>
	);
};

export default DynamicFormFields;
