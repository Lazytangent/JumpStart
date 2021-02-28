import React, { useState } from 'react';

import styles from './DeleteButton.module.css';
import { Modal } from '../../../context/Modal';
import DeleteConfirmation from '../DeleteConfirmation';

const DeleteButton = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <button className={styles.deleteButton} onClick={() => setShowDeleteModal((prev) => !prev)}>Delete</button>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} />
        </Modal>
      )}
    </>
  );
};

export default DeleteButton;
