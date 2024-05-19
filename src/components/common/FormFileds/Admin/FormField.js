import React from 'react';
import TextAreaField from './Fields/TextAreaField';
import CheckboxField from './Fields/CheckboxField';
import SelectField from './Fields/SelectField';
import InputField from './Fields/InputField';
import RadioField from './Fields/RadioField';
import DateField from './Fields/DateField';

const FormField = ({ type, rows, label, id, name, radioData, placeholder, options, formik, ...props }) => {
	switch (type) {
		case 'textarea':
			return <TextAreaField rows={rows} label={label} id={id} placeholder={placeholder} formik={formik} {...props} />;
		case 'radiobutton':
			return <RadioField formik={formik} data={radioData} name={name} {...props} />;
		case 'checkbox':
			return <CheckboxField label={label} id={id} formik={formik} {...props} />;
		case 'select':
			return <SelectField label={label} id={id} placeholder={placeholder} options={options} formik={formik} {...props} />;
		case 'date':
			return <DateField label={label} id={id} formik={formik} {...props} />;
		default:
			return <InputField type={type} label={label} id={id} placeholder={placeholder} formik={formik} {...props} />;
	}
};

export default FormField;
