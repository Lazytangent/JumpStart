import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, useModalContext } from "../../context/Modal";
import { updateDonation, getProjectById } from "../../store/project";
import "./EditComment.css";

const EditComment = ({ idx }) => {
  const userId = useSelector((state) => state.session.user.id);
  const donation = useSelector(
    (state) => state.project.currentProject.donations[idx]
  );
  const { showEditCommentModal, setShowEditCommentModal } = useModalContext();
  const dispatch = useDispatch();
  const [donationId, setDonationId] = useState(donation.id);
  const [donationAmount, setDonationAmount] = useState(donation.donationAmount);
  const [anonymous, setAnonymous] = useState(donation.anonymous);
  const [comment, setComment] = useState(donation.comment);

  const [errors, setErrors] = useState([]);

  function focusCommentTextArea() {
    const textArea = document.getElementById("commentModal-textarea");
    setTimeout(() => {
      textArea.focus();
    }, 300);
  }

  const editComment = async (e) => {
    e.preventDefault();
    const donation = await dispatch(
      updateDonation(donationId, donationAmount, comment, anonymous)
    );
    if (!donation.errors) {
      setShowEditCommentModal(false);
    } else {
      setErrors(donation.errors);
    }
  };

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    focusCommentTextArea();
  });

  return (
    <>
      <Modal onClose={() => setShowEditCommentModal(false)}>
        <div className="editCommentForm-container">
          {errors.map((error, idx) => (
            <ul className="errors" key={idx}>
              {error}
            </ul>
          ))}
          <form onSubmit={editComment} className="editComment-form">
            <div>
              <textarea
                type="text"
                id="commentModal-textarea"
                className="editComment-textarea"
                rows="10"
                name="comment"
                placeholder="Add an optional comment"
                onChange={updateComment}
              >
                {comment}
              </textarea>
            </div>
            <div className="editCommentButtons-container">
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
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditComment;
