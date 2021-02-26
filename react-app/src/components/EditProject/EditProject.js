import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { Modal, useModalContext } from "../../context/Modal";
import { updateProject, getProjectById } from '../../store/project'
import "./EditProject"


const EditProjectForm = () => {

  const userId = useSelector(state => state.session.user.id)
  const projectId = useSelector(state => state.project.currentProject.id)
  const project = useSelector((state) => state.project.currentProject);
  const currentProject = useSelector(state => state.project.currentProject)
  const { showEditProjectModal, setShowEditProjectModal } = useModalContext();
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState(currentProject.name)
  const [description, setDescription] = useState(currentProject.description)
  const [goalAmount, setGoalAmount] = useState(currentProject.goalAmount)
  const [minPledge, setMinPledge] = useState(currentProject.minPledge)
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [images, setAdditionalImages] = useState();

  const [errors, setErrors] = useState([]);

  console.log(images)

  const editDonation = async (e) => {
    e.preventDefault();
    const donation = await dispatch(updateProject(projectId, name, description, goalAmount, minPledge, thumbnailImage, images))
    if (!donation.errors) {
      setShowEditProjectModal(false);
      dispatch(getProjectById(projectId))
    } else {
      setErrors(donation.errors)
    }
  }

  const updateName = (e) => {
    setName(e.target.value)
  }

  const updateDescription = (e) => {
    setDescription(e.target.value)
  }
  const updateGoalAmount = (e) => {
    setGoalAmount(e.target.value)
  }
  const updateMinPledge = (e) => {
    setMinPledge(e.target.value)
  }

  const chooseImage = () => {
    document.getElementById('file').click();
  };
  const chooseAdditionalImage = () => {
    document.getElementById('additionalFile').click();
  };

  const updateThumbnailImage = (e) => {
    const file = e.target.files[0];

    if (file) setThumbnailImage(file);
  };

  const updateAdditionalImages = (e) => {
    const file = e.target.files;
    console.log(file)
    if (file) setAdditionalImages(file);
  };


  return (
    <>

      <Modal onClose={() => setShowEditProjectModal(false)}>
        {/* <div className="project-form-container"> */}
        <h1>Update Your Story</h1>
        <form onSubmit={editDonation} className="update-form">
          <div>
            {errors.map((error, idx) => (
              <ul className="errors" key={idx}>{error}</ul>
            ))}
          </div>
          <div>
            <input
              type='text'
              className="input-text"
              name='name'
              value={name}
              onChange={updateName}
              required
            ></input>
          </div>
          <div>
            <input className="choose-image" type="button" id="loadFile" value="New Thumbnail Image" onClick={chooseImage} />
            <label for="image">   {thumbnailImage.name}</label>
            <input className="hide-this-button" placeholder="Choose a Thumbnail Image" id="file" type="file" name="image" onChange={updateThumbnailImage} />
          </div>
          <div>
            <textarea
              type='text'
              className="input-text"
              rows="10"
              name='description'
              value={description}
              onChange={updateDescription}
              required
            ></textarea>
          </div>
          <div>
            {project.images.map((img, idx) => (

              <div>{img.imageUrl.split(".s3.amazonaws.com/")[1]}</div>
            ))}
            <input className="choose-image" type="button" id="loadFile" value="Choose a Additional Images" onClick={chooseAdditionalImage} />
            {/* {project.images.map((img, idx) => (

              <div>{img.imageUrl.split(".s3.amazonaws.com/")[1]}</div>
            ))} */}
            <input className="hide-this-button" placeholder="Choose a Thumbnail Image" multiple="true" id="additionalFile" type="file" name="image" onChange={updateAdditionalImages} />
          </div>
          <div>
            <input
              type='number'
              className="input-text"
              name='goal'
              value={goalAmount}
              onChange={updateGoalAmount}
            ></input>
          </div>
          <div>
            <input
              type='number'
              className="input-number"
              name='minimum'
              value={minPledge}
              onChange={updateMinPledge}
            ></input>
          </div>
          <button className="submit-button" type="submit" onClick={editDonation}>Update</button>
          <button className="cancel-button" type="submit" onClick={() => history.push("/")}>Cancel</button>
        </form>
        {/* </div> */}
      </Modal>

    </>
  )

}

export default EditProjectForm;
