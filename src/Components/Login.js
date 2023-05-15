import React, { useState } from 'react';
import { attemptLogin, register } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [changeForm, setChangeForm] = useState(true);

  const onChange = ev => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = ev => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate('/');
  };

  const create = ev => {
    ev.preventDefault();
    dispatch(register(credentials));
    navigate('/');
  };

  return (
    <div>
      <Typography variant='h3'>
        {changeForm ? 'Login' : 'Create Account'}
      </Typography>
      <Button
        onClick={
          changeForm ? () => setChangeForm(false) : () => setChangeForm(true)
        }
      >
        {changeForm ? 'Create Account' : 'Login'}
      </Button>
      <form onSubmit={changeForm ? login : create}>
        <TextField
          required
          label='Username'
          value={credentials.username}
          name='username'
          onChange={onChange}
        />
        <TextField
          required
          label='Password'
          name='password'
          value={credentials.password}
          onChange={onChange}
        />
        <Button type='submit'>{changeForm ? 'Login' : 'Create Account'}</Button>
      </form>
    </div>
  );
};

export default Login;
