import {useState} from 'react';
import {validateNric} from "../../utils/dataProcessingUtils";

const useForm = (initialValues, fields, t) => {
    const [formData, setFormData] = useState(initialValues);
    const [selectedFormData, setSelectedFormData] = useState(initialValues);
    const [formError, setFormError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevUser) => ({ ...prevUser, [name]: value }));
        setSelectedFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'nric' && value) {
            setFormError(validateNric(value) ? '' : t('error.nricFormat'));
        }
    };

    const clearForm = () => {
        setFormData(initialValues);
        setFormError('');
    };

    return { formData, formError, handleInputChange, clearForm, setFormError };
};

export default useForm;