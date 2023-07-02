import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import AuthApi from '../services/AuthApi'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const InputField = ({ label, type, value, onChange }) => {
  return (
    <div className='login-input-item'>
      <label className='login-input-label'>{label}:
      </label>
      <input type={type} value={value} onChange={onChange} required className='login-input-field' />
    </div>
  );
};

const RadioField = ({ label, value, checked, onChange }) => {
  return (
    <div >
      <label className='login-role-item'>
        <input type="radio" value={value} checked={checked} onChange={onChange} className='login-role-radio' />
        {label}
        <span className='login-checkmark'></span>
      </label>
    </div>
  );
};

const CheckboxField = ({ label, checked, onChange }) => {
  return (
    <div>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [role, setRole] = useState('1');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  })

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberPasswordChange = (event) => {
    setRememberPassword(event.target.checked);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user, access_token } = await AuthApi.login({
        username,
        password,
        role,
      });

      // Handle successful login response
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('access_token', access_token);
      navigate('/');
    } catch (error) {
      // Handle login error
      toast(error.response.data.message);
      console.error('Login errorasa:', error.response);
    }
  };

  return (
    <div>
      <h2 className='login-header'>{t('login_btn')}</h2>
      <form onSubmit={handleSubmit} className='login-container'>
        <div className='login-role-container'>
          <RadioField label={t('login.role.store')} value="1" checked={role === '1'} onChange={handleRoleChange} />
          <RadioField label={t('login.role.user')} value="2" checked={role === '2'} onChange={handleRoleChange} />
        </div>
        <InputField label={t("login.username")} type="username" value={username} onChange={handleUsernameChange} />
        <div className="login-line"></div>
        <InputField label={t("login.password")} type="password" value={password} onChange={handlePasswordChange} />
        <div style={{ display: 'flex', width: '100%', justifyContent: "space-around", fontSize: "18px" }}>
          <CheckboxField label={t('login.remember_pass')} checked={rememberPassword} onChange={handleRememberPasswordChange} />
          <Link to='/forgot_pass'>{t('login.forgot_pass')}</Link>
        </div>
        <button type="submit" className='login-submit'>{t('login_btn')}</button>
        <div style={{ fontSize: '20px' }}>
          <p>{t('login.no_acc_msg')} <Link to="/register">{t('login.sign_up_msg')}</Link></p>
        </div>
      </form>
      <div>
      </div>
    </div>
  );
};

export default Login;
