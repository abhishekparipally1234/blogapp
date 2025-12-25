import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Authenticate.css';
import '../../Styles.css';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:4000/register', {
        name: data.name,
        email: data.email,
        password: data.password
      });

      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Email already exists');
      } else {
        setError('Registration failed');
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>User Registration</h1>

        {/* NAME */}
        <div className="form-group">
          <label>Name</label>
          <input
            {...register('name', { required: true, minLength: 3 })}
            className="form-control"
          />
          {errors.name && <p className="error-message">Minimum 3 characters</p>}
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="form-control"
          />
          {errors.email && <p className="error-message">Email required</p>}
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 4 })}
            className="form-control"
          />
          {errors.password && (
            <p className="error-message">Minimum 4 characters</p>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn btn-success">
          Register
        </button>

        <p className="text-center mt-2">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
