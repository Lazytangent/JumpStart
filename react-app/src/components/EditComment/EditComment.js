import React, { useState } from "react";
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

  const editComment = async (e) => {
    e.preventDefault();
    const donation = await dispatch(
      updateDonation(donationId, donationAmount, comment, anonymous)
    );
    // if(!donation.errors) {
    //   setShowEditCommentModal(false);

    // }
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
                {comment}
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
