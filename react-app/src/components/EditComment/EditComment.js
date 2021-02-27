import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, useModalContext } from "../../context/Modal";
import { createDonation, getProjectById } from "../../store/project";
import "./EditComment.css";

const EditComment = ({ idx }) => {
  const userId = useSelector((state) => state.session.user.id);
  const donationComment = useSelector(
    (state) => state.project.currentProject.donations[idx].comment
  );
  const { showEditCommentModal, setShowEditCommentModal } = useModalContext();
  const dispatch = useDispatch();
  const [comment, setComment] = useState({});

  const editComment = async (e) => {
    e.preventDefault();
    // const donationComment = ''
  };

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <Modal onClose={() => setShowEditCommentModal(false)}>
        <div className="editCommentForm-container">
          <form onSubmit={editComment} className="editComment-form">
            <div>
              <textarea
                type="text"
                className="editComment-textarea"
                rows="10"
                name="comment"
                placeholder="Add an optional comment"
                onChange={updateComment}
              >
                {donationComment}
              </textarea>
            </div>
            <button className="editComment-submitButton" type="submit">
              Confirm
            </button>
            <button
              className="editComment-cancelButton"
              type="submit"
              onClick={() => setShowEditCommentModal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditComment;
