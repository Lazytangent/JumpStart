import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { logout } from '../../../store/session';

const LogoutButton = ({setAuthenticated}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    history.push("/");
    await dispatch(logout());
    setAuthenticated(false);
  };

  return (
    <div id="navigation-button-container">
      <button id="navigation-buttons" className="navigation-buttons-login" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
