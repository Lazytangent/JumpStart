
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, useModalContext } from "../../context/Modal";
import { createDonation } from '../../store/project'

const DonateForm = () => {

  const userId = useSelector(state => state.session.user.id)
  // const projectId = useSelector(state => state.project.currentProject.id)
  const { showDonateModal, setShowDonateModal } = useModalContext();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([])
  const [donationAmount, setDonationAmount] = useState()
  const [comment, setComment] = useState("")
  const [anonymous, setAnonymous] = useState(false)



  return (
    <>
      {/* {showDonateModal && ( */}
      <Modal onClose={() => setShowDonateModal(false)}>
        <h1>Hello</h1>
      </Modal>
      {/* )} */}
    </>
  )

}

export default DonateForm;
