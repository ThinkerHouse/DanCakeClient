import React from 'react';
import { FaFilter, FaTimesCircle } from 'react-icons/fa';
import SearchField from './SearchField';

const SearchForm = ({ searchFields, handleFieldSearch, handleFilterClick, handleClearSearch, searchParam }) => {
    return (
        <div className="flex flex-wrap items-center justify-end">
            {searchFields.map((field, index) => (
                <SearchField field={field} handleFieldSearch={handleFieldSearch} key={index} searchParam={searchParam} />
            ))}
            <div className="py-6.5">
                <button 
                    className={`p-3 mx-2 mb-5 font-medium rounded border border-stroke`}
                    onClick={handleFilterClick}
                >
                    <FaFilter />
                </button>
                <button
                    className={`p-3 mx-2 mb-5 font-medium rounded border border-stroke`}
                    onClick={handleClearSearch}
                >
                    <FaTimesCircle />
                </button>
            </div>
        </div>
    );
};

export default SearchForm;
