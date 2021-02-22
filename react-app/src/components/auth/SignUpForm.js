import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { Modal } from '../../context/Modal';

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showModal, setShowModal] = useState(true);

  const onSignUp = async (e) => {
    e.preventDefault();
    setShowModal(false);
    if (password === repeatPassword) {
      const user = await dispatch(signUp(username, email, password));
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {showModal &&
      <Modal onClose={() => setShowModal(false)}>
        <form onSubmit={onSignUp}>
        <button id="close-button" onClick={(event) => setShowModal(false)}><i id="close-icon" className="far fa-window-close"></i></button>
          <div>
            <label>User Name</label>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </Modal>
      }
    </>
  );
};

export default SignUpForm;
