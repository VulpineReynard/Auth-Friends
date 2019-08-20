import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const LoginForm = (props) => {
  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChanges = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value
    })
    console.log(loginCredentials)
  }

  const login = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', loginCredentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/protected')
      })
      .catch(err => {
        console.log(err);
        localStorage.clear();
      })
  }

  return (
    <form onSubmit={(e) => login(e)} className="login-form">
      <input 
      onChange={(e) => handleChanges(e)} 
      placeholder="Username" 
      name="username"
      value={loginCredentials.username}
      required
      />

      <input 
      onChange={(e) => handleChanges(e)} 
      placeholder="Password" 
      name="password"
      value={loginCredentials.password}
      required
      />

      <button>Submit</button>
    </form>
  );
}

export default LoginForm;