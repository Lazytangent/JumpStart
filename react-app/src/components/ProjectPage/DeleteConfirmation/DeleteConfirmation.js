import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './DeleteConfirmation.module.css';
import

const DeleteConfirmation = () => {
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <label>Are you sure that you want to delete this project?</label>
      </form>
    </>
  );
};

export default DeleteConfirmation;
