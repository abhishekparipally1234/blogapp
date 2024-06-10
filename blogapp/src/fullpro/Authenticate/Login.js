import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './Authenticate.css';
import axios from 'axios';
import '../../Styles.css';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (data) => {
    try {
      const response = await axios.get(`http://localhost:4000/users?email=${data.email}`);
      const user = response.data[0];
      if (!user) {
        alert("Invalid Email");
      } else if (data.password === user.password) {
        // Save user session (e.g., in localStorage, context, etc.)
        localStorage.setItem('user', JSON.stringify(user));
        navigate(`/user-dashboard/${user.name}`, { state: user });
      } else {
        setErrorMessage('Incorrect Password');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(handleLogin)}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className="form-control" {...register('email', { required: true })} />
          {errors.email && <p className="error-message">Email is required</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="form-control" {...register('password', { required: true })} />
          {errors.password && <p className="error-message">Password is required</p>}
          {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <p>Want to register? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}

export default Login;
