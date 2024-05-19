import { useState } from 'react';
import { toast } from 'react-toastify';
import { buildQueryString } from '../helper/buildQueryString';

const useSearch = (fetchListMethod, page, initialQueryParam) => {
    const [searchParam, setSearchParam] = useState(initialQueryParam);

    const handleFieldSearch = (fieldName, value) => {
        setSearchParam(prevSearchParam => ({
            ...prevSearchParam,
            [fieldName]: value
        }));
    };

    const handleFilterClick = () => {
        const filteredSearchParam = Object.fromEntries(
            Object.entries(searchParam).filter(([key, value]) => value !== '')
        );

        if (Object.keys(filteredSearchParam).length > 0) {
            const itemSearchParam = buildQueryString(filteredSearchParam);
            fetchListMethod(page, itemSearchParam);
        } else {
            toast.error('Please select at least one value', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const handleClearSearch = () => {
        const newSearchParam = Object.fromEntries(
            Object.keys(searchParam).map(key => {
                if (key === 'user_type') {
                    return [key, searchParam[key]];
                } else {
                    return [key, ''];
                }
            })
        );
    
        setSearchParam(newSearchParam);
        const queryString = buildQueryString(newSearchParam);
        fetchListMethod(page, queryString);
    };
    


    return { searchParam, handleFieldSearch, handleClearSearch, handleFilterClick };
};

export default useSearch;
