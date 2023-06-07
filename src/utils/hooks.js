import { useState } from "react";


export const useForm = (callback, initValue = {}) => {
    const [values, setValues] = useState(initValue);
    const onChangeText = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }
    const onChangeCheckbox = (event) => {
        const { name, checked, value } = event.target
        if (checked) {

        } else {
            setValues(pre => [...values, pre[name] = [...pre[name], value]])
        }
    }
    const onSubmit = event => {
        event.preventDefault();
        callback();
    }
    return {
        onChangeCheckbox,
        onChangeText,
        onSubmit,
        values
    }
}