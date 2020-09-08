import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { isLoggedIn, logout } from "../features/user/userSlice";



export function Nav() {
  const isUserLoggedIn = useSelector(isLoggedIn);
  const dispatch = useDispatch();

  const onLogoutClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(logout());
  };


  let navItems = (
    <>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Register
        </Link>
      </li>
    </>
  );
  if (isUserLoggedIn) {
    navItems = (
      <>
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/play" className="nav-link">
            Play
          </Link>
        </li>
        <li className="nav-item">
          
          <Link to="/" className="nav-link" onClick={(ev) => onLogoutClick(ev)}>
            Logout
          </Link>
        </li>
      </>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav  ml-auto">{navItems}</ul>
      </div>
    </nav>
  );
}
