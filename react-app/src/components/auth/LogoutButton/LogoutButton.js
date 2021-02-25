import React from "react";
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/session';

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    setAuthenticated(false);
  };

  return (
    <div id="navBar-button-container">
      <button id="navBar-buttons" className="navBar-buttons-login" onClick={onLogout}>Logout</button>
    </div>
  )
};

export default LogoutButton;
