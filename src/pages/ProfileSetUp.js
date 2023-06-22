import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import APIclient from '../APIclient';

const InputField = ({ label, type, value, onChange, placeholder, name }) => {
    return (
        <div className='setup-input-item'>
            <label className='setup-input-label'>{label}:
            </label>
            <input type={type} value={value} onChange={onChange} required className='login-input-field' placeholder={placeholder} name={name} />
        </div>
    );
};

const RadioField = ({ label, value, checked, onChange }) => {
    return (
        <div >
            <label className='setup-radio-item'>
                <input type="radio" value={value} checked={checked} onChange={onChange} />
                {label}
            </label>
        </div>
    );
};

function ProfileSetUp() {

    const { t } = useTranslation()
    const [token, setToken] = useState(localStorage.getItem('access_token'))

    const [values, setValues] = useState({
        name: '',
        email: '',
        avatar: '',
        address: '',
        latitude: 50,
        longtitude: 27,
        phone_number: '',
        gender: 1,
        birthday: ''
    })

    const onChangeText = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const response = await APIclient.post('/update-profile', values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }
        catch {
            console.error('Setup error:', error.response);
        }
    }

    return (
        <div className='res_detail_outer_container' >
            <div className='setup-container'>
                <h1>{t("setup.header_text")}</h1>
                <form onSubmit={onSubmit}>
                    <InputField name='name' onChange={onChangeText} label={t('setup.name')} />
                    <button type='submit' className='setup-submit-btn'>Luu</button>
                </form>
            </div>
        </div>
    )
}

export default ProfileSetUp