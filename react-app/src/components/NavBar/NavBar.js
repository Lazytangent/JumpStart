import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import LogoutButton from "../auth/LogoutButton";
import SearchBar from "../SearchBar/SearchBar";
import { useModalContext } from "../../context/Modal";
import CreateProject from "../CreateProject";
import "./NavBar.css";

const NavBar = ({ setAuthenticated, setShowModal }) => {
  const {
    showLoginModal,
    setShowLoginModal,
    showSignUpModal,
    setShowSignUpModal,
    showSearchBarModal,
    setShowSearchBarModal,
  } = useModalContext();
  const user = useSelector((state) => state.session.user);

  console.log(user);

  return (
    <div>
      <ul className="navBar">
        <div className="navBar-first-fraction">
          <div>
            {!user && (
              <button
                onClick={() => {
                  setShowSignUpModal(false);
                  setShowLoginModal((prev) => !prev);
                }}
              >
                Login
              </button>
            )}
            {showLoginModal && <LoginForm />}
          </div>
          <div>
            {!user && (
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignUpModal((prev) => !prev);
                }}
              >
                Sign Up
              </button>
            )}
            {showSignUpModal && <SignUpForm />}
          </div>
        </div>
        <div className="navBar-second-fraction">
          <NavLink
            className="navBar-home"
            to="/"
            exact={true}
            activeClassName="active"
            onClick={() => {
              setShowSignUpModal(false);
              setShowLoginModal(false);
            }}
          >
            JumpStart<img className="navBar-logo" src="logo.png" alt=""></img>
          </NavLink>
        </div>
        <div className="navBar-third-fraction">
          <div>
            <button>Create a project</button>
          </div>
        </div>
        <div>
          {
            <button
              onClick={() => {
                setShowSignUpModal(false);
                setShowLoginModal(false);
                setShowSearchBarModal((prev) => !prev);
              }}
            >
              Search
            </button>
          }
          {showSearchBarModal && <SearchBar />}
        </div>

        <div>
          {user && <LogoutButton setAuthenticated={setAuthenticated} />}
        </div>
      </ul>
    </div>
  );
};

export default NavBar;
