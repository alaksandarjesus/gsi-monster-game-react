import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  verify,
  isLoggedIn,
  loginError
} from './userSlice';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';



export function LoginForm() {
  const isUserLoggedIn = useSelector(isLoggedIn);
  const err = useSelector(loginError);
  const history = useHistory();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ username: 'alaksandarjesus@yahoo.co.in', password: 'Password@123' });

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
  };

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(verify(credentials))
  }

  return (
    <div className="card">
      <div className="card-header">
        <h4>Login</h4>
      </div>
      <div className="card-body">
        <div className="text-danger"> {err ? err : ''}</div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="text" value={credentials.username} name="username" className="form-control" onChange={handleChange} autoComplete="username" placeholder="Enter email address"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={credentials.password} name="password" className="form-control" onChange={handleChange} autoComplete="current-password" placeholder="Enter password"/>
          </div>
          <button className="btn btn-primary float-right" type="submit">Login</button>
          <div className="clearfix mt-2"></div>
          <Link to="/register">Don't have an account? Register</Link>
        </form>
      </div>
    </div>
  );
}
