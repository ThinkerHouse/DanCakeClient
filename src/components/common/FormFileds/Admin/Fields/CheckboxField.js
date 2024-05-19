import React, { useState, useEffect } from 'react';
import CheckmarkIcon from '../../../../admin/Icon/CheckmarkIcon';

const CheckboxField = ({ label, id, formik, ...props }) => {
	const [isChecked, setIsChecked] = useState(!!formik.values[id]);

	useEffect(() => {
		// Update isChecked state when the form value changes
		setIsChecked(!!formik.values[id]);
	}, [formik.values[id]]);

	return (
		<>
			<div className="my-5 flex items-center justify-between">
				<label htmlFor={id} className="flex cursor-pointer">
					<div className="relative  pt-0.5">
						<input
							id={id}
							name={id}
							value={formik.values[id]}
							onBlur={formik.handleBlur}
							type="checkbox"
							className="sr-only"
							onChange={() => {
								const newValue = isChecked ? 0 : 1;
								setIsChecked(!isChecked);
								formik.setFieldValue(id, newValue);
							}}
							checked={isChecked}
							{...props}
						/>
						<div
							className={`mr-4 flex h-5 w-5 items-center justify-center rounded border border-stroke ${isChecked ? 'border-primary bg-gray dark:bg-transparent' : ''
								} ${formik.touched[id] && formik.errors[id] ? 'border-[#F87171]' : ''
								}`}
						>
							<span className={`opacity-0 ${isChecked && '!opacity-100'}`}>
								<CheckmarkIcon/>
							</span>
						</div>
					</div>
					{label}
				</label>
			</div>
			{formik.touched[id] && formik.errors[id] && (
				<p className="text-sm text-[#F87171] mt-1">{formik.errors[id]}</p>
			)}
		</>
	);
};

export default CheckboxField;
