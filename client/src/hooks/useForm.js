import { useState } from "react";

export default function useForm(callback, initialValues) {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    // if (values.name.length <= 4 ) {
    //     return alert('Name is too short!');
    // }

    // if (values.type.length <= 3 ) {
    //     return alert('Type is too short!');
    // }

    // if (values.description.length <= 25 ) {
    //     return alert('Description should 25 symbols at least!');
    // }

    // if (values.imageUrl.length <= 4) {
    //     return alert('Image adress is too short!');
    // }

    // if (values.price <= 0 ) {
    //     return alert('Price must be more than 0!');
    // }

    const formAction =  (formData) => {
         callback(values, formData);
    }

    const register = (fieldName)=>{
        return {
            value: values[fieldName],
            onChange: changeHandler,
            name: fieldName
        }
    }

    return {
        values,
        changeHandler,
        formAction,
        register,
        setValues
    };

}