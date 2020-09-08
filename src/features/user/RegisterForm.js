import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  isLoggedIn,
  register,
  registerError
} from './userSlice';
import { useHistory } from 'react-router-dom';
import { isValidEmail, isValidName, isValidPassword } from '../../app/validators';
import {isEmpty, isEqual} from 'lodash';


export function RegisterForm() {
  const isUserLoggedIn = useSelector(isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const err = useSelector(registerError);

  const [credentials, setCredentials] = useState({ name: 'Alaksandar Jesus', password: 'Password@123', email:'alaksandarjesus@yahoo.co.in', cpassword:'Password@123' });
  const [errors, setErrors] = useState({ name: '', password: '', email:'', cpassword:'' });

  if(isUserLoggedIn){
    setTimeout(()=>{
      history.push('/dashboard');
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors((prevState) => ({ ...prevState, [name]:''}))
  };

  const validateForm = ()=>{
    let isValid = true;
    if(isEmpty(credentials.name)){
      isValid = false;
      setErrors((prevState) => ({ ...prevState, name:'Name is required'}))
    }
    if(isEmpty(credentials.email)){
      isValid = false;
      setErrors((prevState) => ({ ...prevState, email:'Email is required'}))
    }
    if(isEmpty(credentials.password)){
      isValid = false;
      setErrors((prevState) => ({ ...prevState, password:'Password is required'}))
    }
    if(credentials.name && !isValidName(credentials.name)){
      isValid = false;
      setErrors((prevState) => ({ ...prevState, name:'Name should contain only alphabets and between 2 to 30 characters'}))
    }
    if(credentials.email && !isValidEmail(credentials.email)){
      isValid = false;
      setErrors((prevState) => ({ ...prevState, email:'Entered value is not a valid email'}))
    }
    if(credentials.password && !isValidPassword(credentials.password)){
      isValid = false;
      setErrors((prevState) => ({ ...prevState, password:'Password must contain minimum eight characters and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character '}))
    }
    if(credentials.password && credentials.cpassword && !isEqual(credentials.password, credentials.cpassword)){
      isValid = false;
      setErrors((prevState) => ({ ...prevState, cpassword:'Confirm Password does not match with entered password'}))
    }

    return isValid;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if(!validateForm()){
      return;
    }
    dispatch(register(credentials))
  }

  return (
    <div className="card">
      <div className="card-header">
        <h4>Register</h4>
      </div>
      <div className="card-body">
      <div className="text-danger"> {err ? err : ''}</div>
        <form onSubmit={onSubmit}>
        <div className="form-group">
            <label>Name</label>
            <input type="text" value={credentials.name} name="name" className={`form-control ${errors.name?'is-invalid':''}`} onChange={handleChange} autoComplete="username" placeholder="Enter name"/>
            <div className="form-text"><small className="text-danger">{errors.name}</small></div>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="text" value={credentials.email} name="email" className={`form-control ${errors.email?'is-invalid':''}`}  onChange={handleChange} autoComplete="username" placeholder="Enter email address"/>
            <div className="form-text"><small className="text-danger">{errors.email}</small></div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={credentials.password} name="password" className={`form-control ${errors.password?'is-invalid':''}`}  onChange={handleChange} autoComplete="current-password" placeholder="Enter password"/>
            <div className="form-text"><small className="text-danger">{errors.password}</small></div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" value={credentials.cpassword} name="cpassword" className={`form-control ${errors.cpassword?'is-invalid':''}`}  onChange={handleChange} autoComplete="current-password" placeholder="Reenter password"/>
            <div className="form-text"><small className="text-danger">{errors.cpassword}</small></div>
          </div>
          <button className="btn btn-primary float-right" type="submit">Register</button>
          <div className="clearfix mt-2"></div>
          <Link to="/">Have an account? Login</Link>
        </form>
      </div>
    </div>
  );
}
