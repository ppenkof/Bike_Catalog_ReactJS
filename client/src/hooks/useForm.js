import { useState } from "react";

export default function useForm(callback, initialValues) {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const formAction = (formData) => {
        callback(values, formData);
    }

    const register = (fieldName) => {
       if(!fieldName){
            throw new Error('You must provide a field name to the register function');
       }
        return {
            value: values[fieldName ?? ''],
            onChange: changeHandler,
            name: fieldName
        }
    }

    return {
        values,
        changeHandler,
        formAction,
        register,
        setValues,
        reset: () => setValues(initialValues)
    };

}