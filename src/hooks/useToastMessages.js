import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useToastMessages = (success, error, fetchListMethod, page, setShowTable, setButtonLabel, queryParam='') => {
    useEffect(() => {
        if (success) {
            toast.success(success, {
                position: toast.POSITION.TOP_RIGHT,
                onOpen: () => {
                    fetchListMethod(page, queryParam);
                    setShowTable(true);
                    setButtonLabel('Add');
                },
                onClose: () => {}
            });
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, [success, error, fetchListMethod, page, setShowTable, setButtonLabel, queryParam]);
};

export default useToastMessages;
