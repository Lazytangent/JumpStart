import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import LogoutButton from '../auth/LogoutButton';
import { useModalContext } from '../../context/Modal';
import './NavBar.css';

const NavBar = ({ setAuthenticated, setShowModal }) => {
  const { showLoginModal, setShowLoginModal, showSignUpModal, setShowSignUpModal } = useModalContext();
  const user = useSelector(state => state.session.user)

  console.log(user)

  return (
    <nav className="navBar">
      <ul className="navBar-items">
        <div>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div>

          {!user && <button onClick={() => {
            setShowSignUpModal(false)
            setShowLoginModal((prev) => !prev)
          }}>Login</button>}
          {showLoginModal && <LoginForm />}
        </div>
        <div>

          {!user && <button onClick={() => {
            setShowLoginModal(false)
            setShowSignUpModal((prev) => !prev)
          }}>Sign Up</button>}
          {showSignUpModal && <SignUpForm />}
        </div>
        <div>
          {/* <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink> */}
        </div>
        <div>
          {user && <LogoutButton setAuthenticated={setAuthenticated} />}
        </div>
      </ul>
    </nav >
  );
}

export default NavBar;
