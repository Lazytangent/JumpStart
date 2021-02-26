import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import styles from './DeleteConfirmation.module.css';
import { deleteProject } from '../../../store/project';

const DeleteConfirmation = ({ setShowDeleteModal }) => {
  const { projectId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const confirmation = (e) => {
    e.preventDefault();
    dispatch(deleteProject(projectId));
    setShowDeleteModal(false);
    history.push('/');
  };

  return (
    <div>
      <label>Are you sure that you want to delete this project?</label>
      <button onClick={confirmation}>Yes</button>
      <button onClick={() => setShowDeleteModal(false)}>No</button>
    </div>
  );
};

export default DeleteConfirmation;
