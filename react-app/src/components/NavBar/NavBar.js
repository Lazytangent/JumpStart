import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import LogoutButton from "../auth/LogoutButton";
import SearchBar from "../SearchBar/SearchBar";
import { useModalContext } from "../../context/Modal";
import CreateProject from "../CreateProject";
import { useHistory } from "react-router-dom";
import "./NavBar.css";
import "../HomePage/homePage.css";

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
  const history = useHistory();

  return (
    <nav>
      <ul className="navBar">
        <div className="navBar-first-fraction">
          <div>
            {!user && (
              <button
              id="navBar-buttons"
              className="navBar-buttons-login"
                onClick={() => {
                  setShowSignUpModal(false);
                  setShowLoginModal((prev) => !prev);
                }}
              >
                Login
              </button>
            )}
            {showLoginModal && (
              <LoginForm setAuthenticated={setAuthenticated} />
            )}
          </div>
          <div>
            {!user && (
              <button
              id="navBar-buttons"
              className="navBar-buttons-signup"
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignUpModal((prev) => !prev);
                }}
              >
                Sign Up
              </button>
            )}
            {showSignUpModal && (
              <SignUpForm setAuthenticated={setAuthenticated} />
            )}
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
            <button
              id="navBar-buttons"
              className="navBar-buttons-create"
              onClick={() => {
                if (user) {
                  setShowLoginModal(false);
                  setShowSignUpModal(false);
                  history.push("/new-project");
                } else {
                  setShowLoginModal((prev) => !prev);
                  setShowSignUpModal(false);
                }
              }}
            >
              Create a project
            </button>
          </div>
          <div>
            {
              <button
              id="navBar-buttons"
              className="navBar-buttons-search"
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
        </div>

        <div>
          {user && <LogoutButton setAuthenticated={setAuthenticated} />}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
