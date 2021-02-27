import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "./navigation.css";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import LogoutButton from "../auth/LogoutButton";
import SearchBar from "../SearchBar/SearchBar";
import { useModalContext } from "../../context/Modal";
import "../HomePage/homePage.css";

const Navigation = ({ setAuthenticated }) => {
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
      <ul className="navigation">
        <div className="navigation-first-fraction">
          <NavLink
            className="navigation-home"
            to="/"
            exact={true}
            onClick={() => {
              setShowSignUpModal(false);
              setShowLoginModal(false);
            }}
          >
            JumpStart
            <img className="navigation-logo" src="logo.png" alt=""></img>
          </NavLink>
        </div>
        <div className="navigation-second-fraction">
          <div id="navigation-button-container">
            <button
              className="navigation-buttons-create"
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
          {!user && (
            <div id="navigation-button-container">
              {!user && (
                <button
                  id="navigation-buttons"
                  className="navigation-buttons-signup"
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowSignUpModal((prev) => !prev);
                  }}
                >
                  Sign up
                </button>
              )}
              {showSignUpModal && (
                <SignUpForm setAuthenticated={setAuthenticated} />
              )}
            </div>
          )}
          {!user && (
            <div id="navigation-button-container">
              {!user && (
                <button
                  id="navigation-buttons"
                  className="navigation-buttons-login"
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
          )}
          {user && (
            <div>
              <LogoutButton setAuthenticated={setAuthenticated} />
            </div>
          )}
          <div id="navigation-button-container">
            {
              <button
                id="navigation-buttons"
                className="navigation-buttons-search"
                onClick={() => {
                  setShowSignUpModal(false);
                  setShowLoginModal(false);
                  setShowSearchBarModal((prev) => !prev);
                }}
              >
                <i className="far fa-search"></i>Search
              </button>
            }
            {showSearchBarModal && <SearchBar />}
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;
