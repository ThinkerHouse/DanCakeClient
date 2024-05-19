import React from 'react';

const AdminForm = ({children, formik,onBtnCancelClick,hideSave, buttonViewShow = true}) => {
  return (
    <form onSubmit={formik?.handleSubmit}>
      <div className="p-6.5">
        {children}
        {
          buttonViewShow && <div className="mt-15 flex justify-end gap-4.5">
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black dark:border-strokedark dark:text-white"
            type="submit"
            onClick={onBtnCancelClick}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70 visible ${
              hideSave && 'hidden'
            }`}
          >
            Save
          </button>
        </div>
        }
        
      </div>
    </form>
  );
};

export default AdminForm;