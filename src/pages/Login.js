import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import AuthApi from '../services/AuthApi'
import { useTranslation } from 'react-i18next';

const InputField = ({ label, type, value, onChange }) => {
  return (
    <div>
      <label>{label}:</label>
      <input type={type} value={value} onChange={onChange} required />
    </div>
  );
};

const RadioField = ({ label, value, checked, onChange }) => {
  return (
    <div>
      <label>
        <input type="radio" value={value} checked={checked} onChange={onChange} />
        {label}
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
      console.error('Login errorasa:', error.response);
    }
  };

  const handleForgotPassword = () => {
    // Logic to handle forgot password
    console.log('Forgot password clicked');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Role:</p>
          <RadioField label={t('login.role.store')} value="1" checked={role === '1'} onChange={handleRoleChange} />
          <RadioField label={t('login.role.user')} value="2" checked={role === '2'} onChange={handleRoleChange} />
        </div>
        <InputField label="Username" type="username" value={username} onChange={handleUsernameChange} />
        <InputField label="Password" type="password" value={password} onChange={handlePasswordChange} />
        <CheckboxField label="Remember Password" checked={rememberPassword} onChange={handleRememberPasswordChange} />
        <Link to='/forgot_pass'>Forgot password</Link>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <div>
      </div>
      <div>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
