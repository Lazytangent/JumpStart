import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import { login } from '../../store/session';
import { Modal } from '../../context/Modal';

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(true);

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await dispatch(login(email, password))
    if (!user.errors) {
      setAuthenticated(true);
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
    {showModal &&
    <Modal onClose={() => setShowModal(false)}>
      <form onSubmit={onLogin}>
      <button id="close-button" onClick={(e) => setShowModal(false)}><i id="close-icon" className="far fa-window-close"></i></button>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
            <button id="submit-button" onClick={(event) =>
                        setShowModal(false)}>Login</button>
        </div>
      </form>
    </Modal>
    }
    </>
  );
};

export default LoginForm;
