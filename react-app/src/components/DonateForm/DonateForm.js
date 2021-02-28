import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./DonateForm.css"
import { Modal, useModalContext } from "../../context/Modal";
import { createDonation, getProjectById } from '../../store/project'

const DonateForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id)
  const projectId = useSelector(state => state.project.currentProject.id)

  const { setShowDonateModal } = useModalContext();
  const [errors, setErrors] = useState([])
  const [donationAmount, setDonationAmount] = useState()
  const [comment, setComment] = useState("")
  const [anonymous, setAnonymous] = useState(false)

  const makeDonation = async (e) => {
    e.preventDefault();
    const donation = await dispatch(
      createDonation(userId, projectId, donationAmount, comment, anonymous)
    );
    if (!donation.errors) {
      setShowDonateModal(false);
      dispatch(getProjectById(projectId));
    } else {
      setErrors(donation.errors);
    }
  };

  const updateDonation = (e) => {
    setDonationAmount(e.target.value);
  };

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  const updateAnonymous = (e) => {
    setAnonymous(!anonymous);
  };

  return (
    <>
      <Modal onClose={() => setShowDonateModal(false)}>
        <div className="donate-form-container">
          <form onSubmit={makeDonation} className="donate-form">
            <div>
              {errors.map((error, idx) => (
                <ul className="donate-errors" key={idx}>
                  {error}
                </ul>
              ))}
            </div>
            <div>
              <input
                type="number"
                className="donation-number"
                name="donation"
                placeholder="Make a Donation"
                onChange={updateDonation}
                required
              ></input>
            </div>
            <div>
              <textarea
                type="text"
                className="donation-comment"
                rows="10"
                name="comment"
                placeholder="Add an optional comment"
                onChange={updateComment}
              ></textarea>
            </div>
            <div className="anonymous-container">
              <input
                type="checkbox"
                className="private-check"
                name="anonymous"
                checked={anonymous}
                onClick={updateAnonymous}
              ></input>
              <label
                for="anonymous"
                className="anonymousLabel"
                id="anonymousLabel"
              >
                Do you wish to make this donation anonymous?
              </label>
            </div>
            <button className="submit-button-donate" type="submit">
              Donate
            </button>
            <button
              className="cancel-button-donate"
              type="submit"
              onClick={() => setShowDonateModal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default DonateForm;
