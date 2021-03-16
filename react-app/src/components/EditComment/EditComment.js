import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, useModalContext } from "../../context/Modal";
import { updateDonation } from "../../store/project";
import "./EditComment.css";

const EditComment = ({ id }) => {

  const donation = useSelector(
    (state) => state.project.currentProject.donations.find(donation => {
      return donation.id === id
    })
  );
  const { setShowEditCommentModal } = useModalContext();
  const dispatch = useDispatch();
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
    const updatedDonation = await dispatch(
      updateDonation(donation.id, donation.donationAmount, comment, donation.anonymous)
    );
    if (!updatedDonation.errors) {
      setShowEditCommentModal(false);
    } else {
      setErrors(updatedDonation.errors);
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

            <button className="editComment-submitButton" type="submit" onClick={() => console.log(id)}>
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
