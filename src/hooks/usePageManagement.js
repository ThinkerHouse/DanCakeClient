import { useState } from 'react';

const usePageManagement = (initialPage = 1) => {
    const [page, setPage] = useState(initialPage);

    const onPageChange = (newPage) => setPage(newPage);

    const handleButtonClick = (showTable, setShowTable, setButtonLabel, setEditingId) => {
        setShowTable(!showTable);
        setButtonLabel(showTable ? 'List' : 'Add');
        setEditingId(null);
    };

    return { page, onPageChange, handleButtonClick };
};

export default usePageManagement;
