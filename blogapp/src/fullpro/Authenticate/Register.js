import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './Authenticate.css';
import axios from 'axios';
import '../../Styles.css';
function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`http://localhost:4000/users`, data);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      console.error("Error in Signup: ", err);
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>User Registration</h1>
        <p>All fields are mandatory</p>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" className="form-control" {...register('name', { required: true, minLength: 4 })} />
          {errors.name && <p className="error-message">Minimum 4 characters</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className="form-control" {...register('email', { required: true })} />
          {errors.email && <p className="error-message">Email is required</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="form-control" {...register('password', { required: true, minLength: 4 })} />
          {errors.password && <p className="error-message">Minimum 4 characters</p>}
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;
