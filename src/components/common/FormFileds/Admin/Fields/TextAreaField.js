import React from 'react';

const TextAreaField = ({ label, id, rows, placeholder, formik, ...props }) => {
  return (
    <>
      <label className="mb-2.5 block text-black dark:text-white">{label}</label>
      <textarea
        id={id}
        name={id}
				rows={rows}
        value={formik.values[id]}
        onChange={formik.handleChange}
        placeholder={placeholder || `Type your ${label.toLowerCase()}`}
        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition`}
        {...props}
      ></textarea>
      {formik.touched[id] && formik.errors[id] && (
        <p className="text-sm text-[#F87171] mt-1">{formik.errors[id]}</p>
      )}
    </>
  );
};

export default TextAreaField;
