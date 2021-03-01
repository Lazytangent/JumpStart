import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import styles from './DeleteConfirmation.module.css';
import { deleteProject, getHomePageProjects } from '../../../store/project';

const DeleteConfirmation = ({ setShowDeleteModal }) => {
  const { projectId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const confirmation = (e) => {
    e.preventDefault();
    dispatch(deleteProject(projectId));
    setShowDeleteModal(false);
    dispatch(getHomePageProjects("popular"));
    dispatch(getHomePageProjects("recent"));
    dispatch(getHomePageProjects("trending"));
    setTimeout(history.push('/'), 1000);
  };

  return (
    <div className={styles.modalContainer}>
      <h3>Are you sure that you want to delete this project?</h3>
      <div className={styles.btnContainer}>
        <button className={styles.yesBtn} onClick={confirmation}>Yes</button>
        <button className={styles.noBtn} onClick={() => setShowDeleteModal(false)}>No</button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
