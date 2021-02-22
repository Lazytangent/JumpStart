import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = ({ setAuthenticated, setShowModal }) => {
  return (
    <nav className="navBar">
      <ul className="navBar-items">
        <div>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div>
        <div>
          <NavLink className='navBar-home' to="/" exact={true} activeClassName="active">
          JumpStart<img className="navBar-logo" src="logo.png" alt=""></img>
          </NavLink>
        </div>
        <div>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </div>
        <div>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
