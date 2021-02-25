import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { createProject } from '../../store/project'

const CreateProject = () => {

  const userId = useSelector(state => state.session.user.id)
  const history = useHistory()
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [goalAmount, setGoalAmount] = useState()
  const [minPledge, setMinPledge] = useState()
  const [thumbnailImage, setThumbnailImage] = useState();
  const [errors, setErrors] = useState([]);

  const postProject = async (e) => {
    e.preventDefault()
    const newProject = await dispatch(
      createProject(name, description, goalAmount, minPledge, thumbnailImage, userId)
    )
    if (newProject.errors) {
      setErrors(newProject.errors)
    } else {
      history.push(`/${newProject.id}`)
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

  // const chooseImage = () => {
  //   document.getElementById('file').click();
  // };

  const updateThumbnailImage = (e) => {
    const file = e.target.files[0];
    if (file) setThumbnailImage(file);
  };

  return (
    <>
      <h1>Tell Your Story</h1>
      <form onSubmit={postProject}>
        <div>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
        <div>
          <input
            type='text'
            name='name'
            placeholder="Name of Project"
            onChange={updateName}
            required
          ></input>
        </div>
        <div>
          <textarea
            type='text'
            name='description'
            placeholder="Description of Project"
            onChange={updateDescription}
            required
          ></textarea>
        </div>
        <div>
          {/* <input type="button" id="loadFile" value="Choose a Profile Image" onClick={chooseImage} /> */}
          <input placeholder="Choose a Thumbnail Image" id="file" type="file" name="image" onChange={updateThumbnailImage} />
        </div>
        <div>
          <input
            type='number'
            name='goal'
            placeholder="Goal Amount"
            onChange={updateGoalAmount}
          ></input>
        </div>
        <div>
          <input
            type='number'
            name='minimum'
            placeholder="Minimum Pledge Amount"
            onChange={updateMinPledge}
          ></input>
        </div>
        <button type="submit" onClick={postProject}>Create</button>
        <button type="submit" onClick={() => history.push("/")}>Cancel</button>
      </form>
    </>
  )
}

export default CreateProject;
