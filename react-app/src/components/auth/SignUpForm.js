import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { Modal, useModalContext } from '../../context/Modal';
import csc from 'country-state-city';

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const { showSignUpModal, setShowSignUpModal } = useModalContext();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [state, setState] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");

  const listOfStates = csc.getStatesOfCountry("US")
  const listOfCities = csc.getCitiesOfState("US", stateCode)

  const onSignUp = async (e) => {
    e.preventDefault();
    const user = await dispatch(signUp(username, email, password, city, state));
    if (password === repeatPassword) {
      if (!user.errors) {
        setAuthenticated(true);
        setShowSignUpModal(false);
      } else {
        setErrors(user.errors)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field'])
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

  const updateState = (e) => {
    setState(e.target.value)
    const stateName = e.target.value
    let result = ""
    listOfStates.forEach((state) => {
      if (state.name === stateName) {
        result = state.isoCode
      }
    })
    setStateCode(result)
  }

  const updateCity = (e) => {
    setCity(e.target.value)
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {showSignUpModal &&
        <Modal onClose={() => setShowSignUpModal(false)}>
          <form onSubmit={onSignUp}>
            <button id="close-button" onClick={() => setShowSignUpModal(false)}><i id="close-icon" className="far fa-window-close"></i></button>
            <div>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </div>
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
              <label>State</label>
              <select name="state" onChange={updateState} value={state} >
                <option value="" disabled selected>Select your state</option>
                {
                  listOfStates.map((state) => (
                    <option key={state.name}>{state.name}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <label>City</label>
              <select name="city" onChange={updateCity} value={city} >
                <option value="" disabled selected>Select your city</option>
                {stateCode !== "" &&
                  listOfCities.map((city) => (
                    <option key={city.name}>{city.name}</option>
                  ))
                }
              </select>
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
