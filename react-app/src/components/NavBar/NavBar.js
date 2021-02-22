import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = ({ setAuthenticated, setShowModal }) => {

  const [showLoginForm, setLoginForm] = useState(false)
  const [showSignUpForm, setSignUpForm] = useState(false)


  return (
    <nav className="navBar">
      <ul className="navBar-items">
        <div>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div>
          {/* <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink> */}
          <button onClick={() => setLoginForm((prev) => !prev)}>Login</button>
          {showLoginForm && <LoginForm />}
        </div>
        <div>
          {/* <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink> */}
          <button onClick={() => setSignUpForm(!showSignUpForm)}>Sign Up</button>
          {showSignUpForm && <SignUpForm />}
        </div>
        <div>
          {/* <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink> */}
        </div>
        <div>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div>
      </ul>
    </nav >
  );
}

export default NavBar;
