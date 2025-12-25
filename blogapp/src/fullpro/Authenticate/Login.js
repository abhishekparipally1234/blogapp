import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Authenticate.css';
import '../../Styles.css';

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (data) => {
    try {
      const res = await axios.post('http://localhost:4000/login', data);

      // 🔑 STORE TOKEN & USER
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // 🔐 SET DEFAULT AUTH HEADER
      axios.defaults.headers.common['Authorization'] = res.data.token;

      navigate(`/user-dashboard/${res.data.user.name}`);
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(handleLogin)}>
        <h1>Login</h1>

        {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="form-control"
          />
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
            className="form-control"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="btn btn-primary">Login</button>

        <p className="text-center mt-2">
          New user? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
