import React from 'react';

const SearchField = ({ field, handleFieldSearch, searchParam }) => {
    // console.log(searchParam);
    const inputClass = `w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`;

    const renderInput = () => {
        if (field.type === 'text') {
            return (
                <input type="text" id={field.name} name={field.name} className={inputClass}
                    value={searchParam[field.name]} onChange={(event) => handleFieldSearch(field.name, event.target.value)}
                />
            );
        } else if (field.type === 'select') {
            return (
                <select
                    className={inputClass} id={field.name} name={field.name}
                    value={searchParam[field.name]} onChange={(event) => handleFieldSearch(field.name, event.target.value)}
                >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            );
        }
    };

    return (
        <div className="p-3.5">
            <div className="mb-4 flex flex-col gap-6 xl:flex-row relative">
                <div className="w-full">
                    <label className={`absolute text-gray-700 text-sm font-semibold -top-3 left-4 bg-white px-1`}>
                        {field.label}
                    </label>
                    {renderInput()}
                </div>
            </div>
        </div>
    );
};

export default SearchField;
