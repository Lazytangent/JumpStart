import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import csc from "country-state-city";

import styles from "./SignUpForm.module.css";
import { signUp } from "../../../store/session";
import { Modal, useModalContext } from "../../../context/Modal";

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
  const [profileImage, setProfileImage] = useState();

  const listOfStates = csc.getStatesOfCountry("US");
  const listOfCities = csc.getCitiesOfState("US", stateCode);

  const onSignUp = async (e) => {
    e.preventDefault();
    const user = await dispatch(
      signUp(username, email, password, city, state, profileImage)
    );
    if (password === repeatPassword) {
      if (!user.errors) {
        setAuthenticated(true);
        setShowSignUpModal(false);
      } else {
        setErrors(user.errors);
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
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
    setState(e.target.value);
    const stateName = e.target.value;
    let result = "";
    listOfStates.forEach((state) => {
      if (state.name === stateName) {
        result = state.isoCode;
      }
    });
    setStateCode(result);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const chooseImage = () => {
    document.getElementById('file').click();
  };

  const updateProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(file);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {showSignUpModal && (
        <Modal onClose={() => setShowSignUpModal(false)}>
          <form className={styles.form} onSubmit={onSignUp} encType="multipart/form-data">
            <div className={styles.closeBtnContainer}>
              <button className={styles.closeBtn} id="close-button" onClick={() => setShowSignUpModal(false)}>
                <i id="close-icon" className="far fa-window-close"></i>
              </button>
            </div>
            <div className={styles.title}>
              <h2 className={styles.header}>Sign Up</h2>
            </div>
            <div className={styles.errorsDiv}>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </div>
            <div className={styles.formFieldContainer}>
              <input
                placeholder="Username"
                className={styles.formField}
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className={styles.formFieldContainer}>
              <input
                placeholder="Email"
                className={styles.formField}
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className={styles.formFieldContainer}>
              <select className={`${styles.formField} ${styles.selectField}`} name="state" onChange={updateState} value={state}>
                <option value="" disabled selected>
                  State
                </option>
                {listOfStates.map((state) => (
                  <option key={state.name}>{state.name}</option>
                ))}
              </select>
              <select className={styles.formField} name="city" onChange={updateCity} value={city}>
                <option value="" disabled selected>
                  City
                </option>
                {stateCode !== "" &&
                  listOfCities.map((city) => (
                    <option key={city.name}>{city.name}</option>
                  ))}
              </select>
            </div>
            <div className={styles.formFieldContainer}>
              <input
                placeholder="Password"
                className={styles.formField}
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className={styles.formFieldContainer}>
              <input
                placeholder="Repeat Password"
                className={styles.formField}
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <div className={styles.formFieldContainer}>
              <input type="button" className={styles.imageBtn} id="loadFile" value="Pick an Image" onClick={chooseImage}/>
              <input placeholder="Choose a Profile Image" id="file" className={`${styles.formField} ${styles.fileInput}`} type="file" name="image" onChange={updateProfileImage} />
            </div>
            <div className={styles.btnContainer}>
              <button className={styles.submitBtn} type="submit">Sign Up</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default SignUpForm;
