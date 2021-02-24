import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";

import styles from './LoginForm.module.css';
import { login } from '../../../store/session';
import { Modal, useModalContext } from '../../../context/Modal';

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const { showLoginModal, setShowLoginModal } = useModalContext();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await dispatch(login(email, password))
    if (!user.errors) {
      setShowLoginModal(false);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {showLoginModal &&
        <Modal onClose={() => setShowLoginModal(false)}>
          <form className={styles.form} onSubmit={onLogin}>
            <button id="close-button" className={styles.closeBtn} onClick={() => setShowLoginModal((prev) => !prev)}><i id="close-icon" className="far fa-window-close"></i></button>
            <div>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </div>
            <div>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
                className={styles.formField}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
                className={styles.formField}
              />
            </div>
            <div className={styles.btnContainer}>
              <button id="submit-button" className={styles.submitBtn}>Login</button>
            </div>
          </form>
        </Modal>
      }
    </>
  );
};

export default LoginForm;
