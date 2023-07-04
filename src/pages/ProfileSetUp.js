import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import APIclient from '../APIclient';

const InputField = ({ label, type, value, onChange, placeholder, name }) => {
    return (
        <div className='setup-input-item'>
            <label className='setup-input-label'>{label}:
            </label>
            <input type={type} value={value} onChange={onChange} required className='setup-input-field' placeholder={placeholder} name={name} />
        </div>
    );
};

const RadioField = ({ label, value, checked, onChange, name }) => {
    return (
        <div >
            <label className='setup-radio-item'>
                <input type="radio" value={value} checked={checked} onChange={onChange} name={name} />
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
    const onChangeGender = (event) => {
        const { checked, value } = event.target
        if (checked) {
            values.gender = value;
            setValues({ ...values })
        }
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
        catch (error) {
            console.error('Setup error:', error.response);
        }
    }

    return (
        <div className='res_detail_outer_container' >
            <div className='setup-container'>
                <h1>{t("setup.header_text")}</h1>
                <form onSubmit={onSubmit} style={{ width: '800px' }}>
                    <InputField name='name' onChange={onChangeText} label={t('setup.name')} />
                    <InputField name='email' onChange={onChangeText} label={t('setup.email')} />
                    <InputField name='address' onChange={onChangeText} label={t('setup.address')} />
                    <InputField name='phone_number' onChange={onChangeText} label={t('setup.phone_number')} />
                    <div className='setup-gender-container'>
                        <span>{t('setup.gender')}</span>
                        <RadioField label='Nam' onChange={onChangeGender} value={1} name='gender' />
                        <RadioField label='Nữ' onChange={onChangeGender} value={2} name='gender' />
                    </div>
                    <InputField name='birthday' onChange={onChangeText} label={t('setup.birthday')} placeholder='DD-MM-YYYY' />
                    <button type='submit' className='setup-submit-btn'>Lưu</button>
                </form>
            </div>
        </div>
    )
}

export default ProfileSetUp