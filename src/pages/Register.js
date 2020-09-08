import React from 'react';
import { RegisterForm } from '../features/user/RegisterForm';
import { isLoggedIn } from "../features/user/userSlice";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


export function Register() {
    const loggedIn = useSelector(isLoggedIn);
    const history = useHistory();

    if (loggedIn) {
        setTimeout(() => {
            history.push('/dashboard');
        })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-6 offset-lg-3 offset-md-2 mt-3">
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}