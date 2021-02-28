import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"

import "./CreateProject.css"
import { createProject } from '../../store/project'
import Navigation from '../Navigation/navigation'
import DeleteIcon from "@material-ui/icons/Delete"

const CreateProject = ({ setAuthenticated }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const userId = useSelector(state => state.session.user.id)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [goalAmount, setGoalAmount] = useState()
  const [minPledge, setMinPledge] = useState()
  const [thumbnailImage, setThumbnailImage] = useState({ name: "" });
  const [additionalImages, setAdditionalImages] = useState();
  const [errors, setErrors] = useState([]);

  const postProject = async (e) => {
    e.preventDefault()
    const newProject = await dispatch(
      createProject(name, description, goalAmount, minPledge, thumbnailImage, userId, additionalImages)
    )
    if (newProject.errors) {
      setErrors(newProject.errors)
    } else {
      history.push(`/${newProject.id}`)
    }
  };

  const updateName = (e) => {
    setName(e.target.value)
  };

  const updateDescription = (e) => {
    setDescription(e.target.value)
  };

  const updateGoalAmount = (e) => {
    setGoalAmount(e.target.value)
  };

  const updateMinPledge = (e) => {
    setMinPledge(e.target.value)
  };

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
    if (file) setAdditionalImages(file);
  };

  return (
    <>
      <Navigation setAuthenticated={setAuthenticated} />
      <div className="project-form-container">
        <h1>Tell Your Story</h1>
        <form onSubmit={postProject} className="create-form">
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
              placeholder="Name of Project"
              onChange={updateName}
              required
            ></input>
          </div>
          <div>
            <input className="choose-image" type="button" id="loadFile" value="Choose a Thumbnail Image" onClick={chooseImage} />
            <label for="image">   {thumbnailImage.name}</label>
            <input className="hide-this-button" placeholder="Choose a Thumbnail Image" id="file" type="file" name="image" onChange={updateThumbnailImage} />
          </div>
          <div>
            <textarea
              type='text'
              className="input-text"
              rows="10"
              name='description'
              placeholder="Description of Project"
              onChange={updateDescription}
              required
            ></textarea>
          </div>
          <div>
            <input className="choose-image" type="button" id="loadFile" value="Choose a Additional Images" onClick={chooseAdditionalImage} />
            {/* <label for="image">   {additionalImages}</label> */}
            <input className="hide-this-button" placeholder="Choose a Thumbnail Image" multiple="true" id="additionalFile" type="file" name="image" onChange={updateAdditionalImages} />
          </div>
          <div>
            <input
              type='number'
              className="input-text"
              name='goal'
              placeholder="Goal Amount"
              onChange={updateGoalAmount}
            ></input>
          </div>
          <div>
            <input
              type='number'
              className="input-number"
              name='minimum'
              placeholder="Minimum Pledge Amount"
              onChange={updateMinPledge}
            ></input>
          </div>
          <div className="submit-cancel-container">

            <button className="submit-button" type="submit" onClick={postProject}>Create</button>
            <button className="cancel-button" type="submit" onClick={() => history.push("/")}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
