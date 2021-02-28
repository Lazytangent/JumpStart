import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, useModalContext } from "../../context/Modal";
import { updateDonation } from "../../store/project";
import "./EditComment.css";

const EditComment = ({ idx }) => {
  const donation = useSelector(
    (state) => state.project.currentProject.donations[idx]
  );
  const { setShowEditCommentModal } = useModalContext();
  const dispatch = useDispatch();
  const [donationId, setDonationId] = useState(donation.id);
  const [donationAmount, setDonationAmount] = useState(donation.donationAmount);
  const [anonymous, setAnonymous] = useState(donation.anonymous);
  const [comment, setComment] = useState(donation.comment);

  const [errors, setErrors] = useState([]);

  const textAreaRef = useRef(null);

  function focusCommentTextArea() {
    let commentLength = comment.length;
    textAreaRef.current.focus();
    textAreaRef.current.setSelectionRange(commentLength, commentLength);
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
            <textarea
              type="text"
              id="commentModal-textarea"
              className="editComment-textarea"
              ref={textAreaRef}
              value={comment}
              rows="10"
              name="comment"
              placeholder="Add an optional comment"
              onChange={updateComment}
            >

            </textarea>

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
