import React, { useState } from 'react';
import { attemptLogin } from '../store';
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

  const onChange = ev => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = ev => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate('/');
  };
  return (
    <div>
      <Typography variant='h3'>Login</Typography>
      <form onSubmit={login}>
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
        <Button type='submit'>Login</Button>
      </form>
    </div>
  );
};

export default Login;
